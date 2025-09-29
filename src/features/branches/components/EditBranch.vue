<template>
  <CustomDialog
    :is-visible="isVisible"
    :title="`Edit \'${branchData?.name}\' reservation settings`"
    @close="closeDialog"
    @save="handleSave"
  >
    <Form
      :validation-schema="schema"
      :initial-values="{
        reservationDuration: branchData?.reservation_duration || null,
      }"
      @submit="handleSave"
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
    </Form>
  </CustomDialog>
</template>

<script setup>
import CustomDialog from '@/components/CustomDialog.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

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

// Simple validation schema
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

const handleSave = (values) => {
  const data = {
    id: props.branchData?.id,
    reservationDuration: values.reservationDuration,
  };
  closeDialog();
};

const closeDialog = () => {
  emit('close');
};
</script>
