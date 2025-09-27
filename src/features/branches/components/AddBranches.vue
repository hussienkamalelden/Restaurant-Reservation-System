<template>
  <CustomDialog
    :is-visible="isVisible"
    title="Add Branches"
    @close="$emit('close')"
    @save="handleSave"
  >
    <div class="space-y-4">
      <div>
        <label
          for="branch-select"
          class="block text-sm font-medium text-text mb-2"
        >
          Select Branches
        </label>
        <select
          id="branch-select"
          v-model="selectedBranch"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option disabled selected value="0">Choose a branch...</option>
          <option
            v-for="branch in branches?.data?.filter(
              (branch) => branch.accepts_reservations === false
            )"
            :key="branch.id"
            :value="branch.id"
          >
            {{ branch.name }}
          </option>
        </select>
        <span
          v-if="selectedBranch === 0 && saveClicked"
          class="text-red-500 text-sm"
        >
          Please select a branch
        </span>
      </div>
    </div>
  </CustomDialog>
</template>

<script setup>
import CustomDialog from '@/components/CustomDialog.vue';
import { useBranchStore } from '../store/useBranchStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const branchStore = useBranchStore();
const { branches } = storeToRefs(branchStore);
const selectedBranch = ref(0);
const saveClicked = ref(false);

defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['close', 'save']);

const handleSave = () => {
  saveClicked.value = true;
  if (selectedBranch.value) {
    console.log('Save clicked - Selected branch:', selectedBranch.value);
    // Add your save logic here
    // You can emit the selected branch data to parent component
    // $emit('save', { branchId: selectedBranch.value })
  }
};
</script>
