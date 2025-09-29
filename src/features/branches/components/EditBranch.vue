<template>
  <CustomDialog
    :is-visible="isVisible"
    :title="`Edit \'${branchData?.name}\' reservation settings`"
    @close="closeDialog"
    @save="handleSave"
  >
    <div class="space-y-4">
      <!-- Reservation Duration -->
      <div>
        <div class="flex gap-1">
          <label
            for="reservation-duration"
            class="block text-sm font-medium text-text mb-2"
          >
            Reservation Duration (minutes)
          </label>
          <span class="text-red-500 text-sm"> *</span>
        </div>
        <input
          id="reservation-duration"
          v-model="reservationDuration"
          type="number"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          placeholder="Enter duration in minutes"
        />
      </div>

      <!-- Tables Select -->
      <!-- <div>
        <label
          for="tables-select"
          class="block text-sm font-medium text-text mb-2"
        >
          Number of Tables
        </label>
        <select
          id="tables-select"
          v-model="selectedTables"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        >
          <option disabled value="">Choose number of tables...</option>
          <option v-for="table in tableOptions" :key="table" :value="table">
            {{ table }} {{ table === 1 ? 'table' : 'tables' }}
          </option>
        </select>
      </div> -->
    </div>
  </CustomDialog>
</template>

<script setup>
import CustomDialog from '@/components/CustomDialog.vue';
import { computed } from 'vue';

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

const reservationDuration = computed(
  () => props?.branchData?.reservation_duration || 0
);

const emit = defineEmits(['close']);

const handleSave = () => {
  //   if (reservationDuration.value && selectedTables.value) {
  //     const data = {
  //       id: props.branchData?.id,
  //       reservationDuration: reservationDuration.value,
  //       tables: selectedTables.value,
  //     };
  //     emit('save', data);
  //     closeDialog();
  //   }
};

const closeDialog = () => {
  emit('close');
};
</script>
