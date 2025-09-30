<template>
  <div>
    <div class="space-y-4">
      <!-- Reservation Duration -->
      <div>
        <div class="flex gap-1">
          <label
            for="reservation-duration"
            class="block text-md font-medium text-text mb-1"
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
            class="block text-md font-medium text-text mb-1"
          >
            Tables
          </label>
        </div>

        <Field name="tables" v-slot="{ errorMessage }">
          <select
            id="tables-select"
            ref="tableSelect"
            :class="[
              'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary',
              errorMessage ? 'border-red-500' : 'border-gray-300',
            ]"
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
        </Field>
        <ErrorMessage name="tables" class="mt-1 text-sm text-red-600" />

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

      <!-- Slots Box -->
      <div v-for="day in weekDays" :key="day.name" class="space-y-2">
        <SlotsBox
          :title="day.name"
          :isApplyOnAllDays="day.name === 'saturday'"
          @applyOnAllDays="$emit('applyOnAllDays')"
        />
        <!-- Day-specific errors -->
        <div
          v-if="getDayErrors(day.name).length > 0"
          class="flex flex-col gap-1"
        >
          <span
            class="text-red-600 text-sm capitalize"
            v-for="error in getDayErrors(day.name)"
            :key="error"
          >
            • {{ error }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate';
import { ref, computed } from 'vue';
import Tag from '@/components/Tag.vue';
import SlotsBox from './SlotsBox.vue';

const props = defineProps({
  branchData: {
    type: Object,
    default: () => ({}),
  },
  selectedTables: {
    type: Array,
    default: () => [],
  },
  weekDays: {
    type: Array,
    default: () => [],
  },
  errors: {
    type: Array,
    default: () => [],
  },
  setFieldValue: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(['applyOnAllDays']);

const tableSelect = ref(null);

// Available tables
const availableTables = computed(() => {
  return props.branchData?.sections?.flatMap((section) =>
    section.tables.map((table) => ({
      id: table.id,
      name: table.name,
      section: section.name,
    }))
  );
});

// Get errors for a specific day
const getDayErrors = (dayName) => {
  return props.errors.filter((error) =>
    error.toLowerCase().includes(dayName.toLowerCase())
  );
};

// Add table to selected tables
const addTable = (tableId, tableName) => {
  const index = props.selectedTables.findIndex((table) => table.id === tableId);

  if (index === -1) {
    props.selectedTables.push({
      id: tableId,
      name: tableName,
    });
    props.setFieldValue('tables', props.selectedTables);
  }
  // Reset the select element back to the default option
  if (tableSelect.value) {
    tableSelect.value.value = '';
  }
};

// Remove table from selected tables
const removeTable = (id) => {
  const updatedTables = props.selectedTables.filter((t) => t.id !== id);
  props.selectedTables.splice(0, props.selectedTables.length, ...updatedTables);
  props.setFieldValue('tables', [...props.selectedTables]);
};
</script>
