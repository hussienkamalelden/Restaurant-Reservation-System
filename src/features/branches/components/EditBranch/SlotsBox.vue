<template>
  <div class="flex flex-col">
    <!-- Title -->
    <div class="flex items-center justify-between mb-1">
      <label class="block text-md font-medium text-text">
        {{ title || 'Title' }}
      </label>
      <h4
        class="text-md font-medium text-primary cursor-pointer select-none"
        v-if="isApplyOnAllDays"
        @click="emit('applyOnAllDays')"
      >
        Apply on all days
      </h4>
    </div>

    <!-- Slots -->
    <div
      class="bg-white rounded-lg shadow-sm border border-gray-200 px-2 py-3 flex justify-between items-start"
    >
      <div class="flex flex-wrap gap-3 self-center">
        <div
          v-for="(slot, index) in slots"
          :key="slot.id"
          class="relative bg-white border border-primary rounded-lg px-2 py-1.5"
        >
          <!-- Time Range Inputs -->
          <div class="flex items-center">
            <!-- From Time -->
            <input
              type="number"
              v-model="slot.fromHour"
              @input="formatHour(slot, 'fromHour')"
              @change="updateSlot()"
              min="0"
              max="23"
              class="w-7 text-center outline-none text-text font-medium text-md bg-transparent border-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
            />
            <span class="text-text font-medium text-sm">:</span>
            <input
              type="number"
              v-model="slot.fromMinute"
              @input="formatMinute(slot, 'fromMinute')"
              @change="updateSlot()"
              min="0"
              max="59"
              class="w-7 text-center outline-none text-text font-medium text-md bg-transparent border-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
            />

            <!-- Separator -->
            <span class="text-text font-medium text-sm">-</span>

            <!-- To Time -->
            <input
              type="number"
              v-model="slot.toHour"
              @input="formatHour(slot, 'toHour')"
              @change="updateSlot()"
              min="0"
              max="23"
              class="w-7 text-center outline-none text-text font-medium text-md bg-transparent border-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
            />
            <span class="text-text font-medium text-sm">:</span>
            <input
              type="number"
              v-model="slot.toMinute"
              @input="formatMinute(slot, 'toMinute')"
              @change="updateSlot()"
              min="0"
              max="59"
              class="w-7 text-center outline-none text-text font-medium text-md bg-transparent border-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
            />
          </div>

          <!-- Delete Action -->
          <button
            @click="deleteSlot(index)"
            class="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs cursor-pointer"
            title="Remove slot"
          >
            <i class="icon-close"></i>
          </button>
        </div>

        <!-- Empty State -->
        <div v-if="slots.length === 0" class="text-center text-text">
          <span class="text-md text-primary"
            >Add available reservation times</span
          >
        </div>
      </div>
      <div class="flex items-center justify-between">
        <button
          @click="addSlot"
          :disabled="slots.length >= 3"
          class="flex items-center px-4 py-2 bg-primary text-white font-medium rounded-sm disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
        >
          <i class="icon-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBranchStore } from '../../store/useBranchStore';
import { storeToRefs } from 'pinia';
const branchStore = useBranchStore();
const { selectedSlots } = storeToRefs(branchStore);

const emit = defineEmits(['applyOnAllDays']);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isApplyOnAllDays: {
    type: Boolean,
    default: false,
  },
  slots: {
    type: Array,
    default: [],
  },
});

// Reactive data
const slots = ref(props.slots);

// Generate unique ID for each slot
let nextId = 1;

// Add new slot
const addSlot = () => {
  if (slots.value.length < 3) {
    slots.value.push({
      id: nextId++,
      fromHour: '00',
      fromMinute: '00',
      toHour: '00',
      toMinute: '00',
    });
  }
};

// Format hour input to ensure 2-digit format
const formatHour = (slot, field) => {
  let value = parseInt(slot[field]) || 0;
  if (value > 23) value = 23;
  if (value < 0) value = 0;
  slot[field] = String(value).padStart(2, '0');
};

// Format minute input to ensure 2-digit format
const formatMinute = (slot, field) => {
  let value = parseInt(slot[field]) || 0;
  if (value > 59) value = 59;
  if (value < 0) value = 0;
  slot[field] = String(value).padStart(2, '0');
};

// Delete slot
const deleteSlot = (index) => {
  slots.value.splice(index, 1);
  updateSlot();
};

// Convert slots to proper time format for parent component
const formattedSlots = computed(() => {
  return slots.value.map((slot) => ({
    day: props.title,
    id: slot.id,
    from: `${slot.fromHour}:${slot.fromMinute}`,
    to: `${slot.toHour}:${slot.toMinute}`,
  }));
});

// Update slot
const updateSlot = () => {
  selectedSlots.value = formattedSlots.value;
  console.log(selectedSlots.value);
};
</script>
