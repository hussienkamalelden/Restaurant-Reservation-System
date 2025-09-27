<template>
  <div
    class="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-800 text-sm font-medium rounded-full border border-primary-200 hover:bg-primary-200 transition-colors duration-200"
  >
    <span class="select-none">{{ name }}</span>
    <button
      @click="handleRemove"
      class="flex items-center justify-center w-4 h-4 text-primary-600 hover:text-primary-800 hover:bg-primary-300 rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50"
    >
      <svg
        class="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { useBranchStore } from '@/features/branches/store/useBranchStore';
import { storeToRefs } from 'pinia';
const branchStore = useBranchStore();
const { selectedBranches } = storeToRefs(branchStore);

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: [String, Number],
    required: true,
  },
});

const handleRemove = () => {
  // Check if the id is in selectedBranch array and remove it
  const index = selectedBranches.value.findIndex(
    (branch) => branch.id === props.id
  );
  if (index !== -1) {
    selectedBranches.value.splice(index, 1);
  }
};
</script>
