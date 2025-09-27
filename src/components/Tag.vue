<template>
  <div
    class="flex items-center justify-between gap-3 px-3 py-1.5 text-text rounded-md border-2 border-primary bg-primary/10"
  >
    <span class="select-none text-sm font-medium">{{ name }}</span>
    <i
      class="icon-close cursor-pointer text-xs font-semibold text-white bg-primary rounded-full h-5 w-5 flex items-center justify-center leading-none"
      @click="handleRemove"
    ></i>
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
