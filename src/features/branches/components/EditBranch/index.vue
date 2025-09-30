<template>
  <CustomDialog
    :is-visible="isVisible"
    :title="`Edit \'${branchData?.name}\' reservation settings`"
    @close="closeDialog"
    @save="handleSave"
  >
    <!-- Working Hours -->
    <WorkingHours
      :branch-data="branchData"
      @disable-branch="handleDisableBranch"
    />

    <!-- Reservation Form  -->
    <ReservationForm
      :branch-data="branchData"
      :selected-tables="selectedTables"
      :week-days="weekDays"
      :errors="errors"
      :set-field-value="setFieldValue"
      @apply-on-all-days="applyOnAllDays"
    />
  </CustomDialog>
  <Toast
    :visible="toastVisible"
    message="Branch updated successfully"
    type="success"
    :duration="5000"
    @hide="toastVisible = false"
  />
</template>

<script setup>
import CustomDialog from '@/components/CustomDialog.vue';
import { useForm } from 'vee-validate';
import { ref, watch, computed } from 'vue';
import * as yup from 'yup';
import WorkingHours from './WorkingHours.vue';
import ReservationForm from './ReservationForm.vue';
import { storeToRefs } from 'pinia';
import { useBranchStore } from '../../store/useBranchStore';
import { useSlots } from '../../composables/useSlots.js';
import Toast from '@/components/Toast.vue';
const branchStore = useBranchStore();
const { selectedSlots } = storeToRefs(branchStore);
const { updateBranchesInfo, getBranches } = branchStore;
const { apply, validateSlots } = useSlots();

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  branchData: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits(['close']);
const selectedTables = ref([]);
const errors = ref([]);
const weekDays = ref([]);
const toastVisible = ref(false);
const dayOrder = [
  'saturday',
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
];

// Schema
const schema = yup.object({
  reservationDuration: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value;
    })
    .required('Reservation duration is required')
    .max(480, 'Maximum duration is 8 hours')
    .positive('Duration must be positive'),
  tables: yup.array(),
});

// Form setup with VeeValidate
const { setFieldValue, values, handleSubmit, validate } = useForm({
  validationSchema: schema,
});

// Handle save
const handleSave = handleSubmit(async (formValues) => {
  // Validate each day individually
  errors.value = [];
  weekDays.value.forEach((day) => {
    const dayErrors = validateSlots(
      day.name,
      props.branchData.opening_from,
      props.branchData.opening_to
    );
    errors.value = [...errors.value, ...dayErrors];
  });

  if (errors.value.length > 0) {
    return;
  }
  try {
    await updateBranchesInfo(props.branchData?.id, {
      reservation_duration: formValues.reservationDuration,
    });
    await getBranches();
    toastVisible.value = true;
  } catch (error) {}
  closeDialog();
});

// Handle disable branch
const handleDisableBranch = async () => {
  try {
    await updateBranchesInfo(props.branchData?.id, {
      accepts_reservations: false,
    });
    await getBranches();
    toastVisible.value = true;
  } catch (error) {}
  closeDialog();
};

// Close dialog
const closeDialog = () => {
  selectedTables.value = [];
  selectedSlots.value = [];
  errors.value = [];
  weekDays.value = [];
  emit('close');
};

// Apply on all days
const applyOnAllDays = async () => {
  try {
    await apply(weekDays.value);
    errors.value = [];
  } catch (error) {
    errors.value = [...errors.value, error.message];
  }
};

// Create weekDays from reservation_times
const createWeekDays = (reservation_times) => {
  weekDays.value = dayOrder
    .filter((day) => reservation_times[day]) // Only include days that exist in the data
    .map((day) => ({
      name: day,
    }));

  // Convert API reservation_times to selectedSlots format
  const apiSlots = [];
  let slotId = Date.now();

  Object.entries(reservation_times).forEach(([day, timeRanges]) => {
    timeRanges.forEach((timeRange) => {
      apiSlots.push({
        id: slotId++,
        day: day,
        from: timeRange[0],
        to: timeRange[1],
      });
    });
  });

  selectedSlots.value = apiSlots;
  console.log(selectedSlots.value);
};

// Watch for prop changes to update form values
watch(
  () => props.branchData,
  (newBranchData) => {
    if (newBranchData?.reservation_duration) {
      setFieldValue('reservationDuration', newBranchData.reservation_duration);
    }
    if (newBranchData?.reservation_times) {
      createWeekDays(newBranchData.reservation_times);
    }
  },
  { deep: true, immediate: true }
);
</script>
