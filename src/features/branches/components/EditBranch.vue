<template>
  <CustomDialog
    :is-visible="isVisible"
    :title="`Edit \'${branchData?.name}\' reservation settings`"
    @close="closeDialog"
    @save="handleSave"
  >
    <!-- Working Hours -->
    <div class="mb-6 px-4 py-2 bg-primary/10 rounded-lg border border-primary">
      <div class="flex items-center gap-3">
        <div>
          <h3 class="text-lg font-semibold text-text">Working Hours</h3>
          <p class="text-sm text-text">
            Branch working hours are
            <span class="font-mono font-medium text-primary">
              {{ branchData?.opening_from }} - {{ branchData?.opening_to }}
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Reservation Form  -->
    <div>
      <div class="space-y-4">
        <!-- Reservation Duration -->
        <div>
          <div class="flex gap-1">
            <label
              for="reservation-duration"
              class="block text-sm font-medium text-text mb-1"
            >
              Reservation Duration (minutes)
            </label>
            <span class="text-red-500 text-sm"> *</span>
          </div>
          <Field name="reservationDuration" v-slot="{ field, errorMessage }">
            <input
              v-bind="field"
              id="reservation-duration"
              type="number"
              :class="[
                'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary',
                errorMessage ? 'border-red-500' : 'border-gray-300',
              ]"
              placeholder="Enter duration in minutes"
            />
          </Field>
          <ErrorMessage
            name="reservationDuration"
            class="mt-1 text-sm text-red-600"
          />
        </div>

        <!-- Tables Select -->
        <div>
          <div class="flex gap-1">
            <label
              for="tables-select"
              class="block text-sm font-medium text-text mb-1"
            >
              Tables
            </label>
          </div>

          <select
            id="tables-select"
            ref="tableSelect"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            @change="
              addTable(
                $event.target.value,
                $event.target.options[$event.target.selectedIndex].text
              )
            "
          >
            <option disabled selected value="">
              {{
                !availableTables || availableTables.length === 0
                  ? 'No available tables'
                  : 'Select tables...'
              }}
            </option>
            <option
              v-for="table in availableTables"
              :key="table.id"
              :value="table.id"
              :disabled="
                selectedTables.some((selected) => selected.id === table.id)
              "
            >
              {{ table.section }} - {{ table.name }}
            </option>
          </select>

          <!-- Selected Branches -->
          <div class="flex flex-wrap gap-2 mt-2">
            <Tag
              v-for="table in selectedTables"
              :key="table.id"
              :name="table.name"
              :id="table.id"
              @remove="removeTable"
            />
          </div>
        </div>
      </div>
    </div>
  </CustomDialog>
</template>

<script setup>
import CustomDialog from '@/components/CustomDialog.vue';
import { Form, Field, ErrorMessage, useForm } from 'vee-validate';
import { ref, watch, computed } from 'vue';
import * as yup from 'yup';
import Tag from '@/components/Tag.vue';

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
const tableSelect = ref(null);

const availableTables = computed(() => {
  return props.branchData?.sections.flatMap((section) =>
    section.tables.map((table) => ({
      id: table.id,
      name: table.name,
      section: section.name,
    }))
  );
});

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
});

// Form setup with VeeValidate
const { setFieldValue, values, handleSubmit, validate } = useForm({
  validationSchema: schema,
});

// Add table to selected tables
const addTable = (tableId, tableName) => {
  const index = selectedTables.value.findIndex((table) => table.id === tableId);

  if (index === -1) {
    selectedTables.value.push({
      id: tableId,
      name: tableName,
    });
  }
  // Reset the select element back to the default option
  if (tableSelect.value) {
    tableSelect.value.value = '';
  }
};

// Remove table from selected tables
const removeTable = (id) => {
  selectedTables.value = selectedTables.value.filter((t) => t.id !== id);
};

// Handle save
const handleSave = handleSubmit(async (formValues) => {
  const data = {
    id: props.branchData?.id,
    reservationDuration: formValues.reservationDuration,
    tables: selectedTables.value,
  };
  // Here you would typically emit the save event or call an API
  console.log('Form data:', data);
  closeDialog();
});

// Close dialog
const closeDialog = () => {
  selectedTables.value = [];
  emit('close');
};

// Watch for prop changes to update form values
watch(
  () => props.branchData,
  (newBranchData) => {
    if (newBranchData?.reservation_duration) {
      setFieldValue('reservationDuration', newBranchData.reservation_duration);
    }
  },
  { deep: true, immediate: true }
);
</script>
