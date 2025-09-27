<template>
  <CustomDialog
    :is-visible="isVisible"
    title="Add Branches"
    @close="closeDialog"
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
          ref="branchSelect"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          @change="
            addBranch(
              $event.target.value,
              $event.target.options[$event.target.selectedIndex].text
            )
          "
        >
          <option disabled selected value="0">Choose a branch...</option>
          <option
            v-for="branch in branches?.data?.filter(
              (branch) => branch.accepts_reservations === false
            )"
            :key="branch.id"
            :value="branch.id"
            :name="branch.name"
          >
            {{ branch.name }}
          </option>
        </select>
        <!-- Error Message -->
        <span
          v-if="selectedBranches.length === 0 && saveClicked"
          class="text-red-500 text-sm"
        >
          Please select a branch
        </span>
        <!-- Selected Branches -->
        <div class="flex flex-wrap gap-2 mt-2">
          <Tag
            v-for="branch in selectedBranches"
            :key="branch.id"
            :name="branch.name"
            :id="branch.id"
          />
        </div>
      </div>
    </div>
  </CustomDialog>
</template>

<script setup>
import CustomDialog from '@/components/CustomDialog.vue';
import { useBranchStore } from '../store/useBranchStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import Tag from '@/components/Tag.vue';
const branchStore = useBranchStore();
const { selectedBranches, branches } = storeToRefs(branchStore);

const saveClicked = ref(false);
const branchSelect = ref(null);

defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'save']);

const handleSave = () => {
  saveClicked.value = true;
  if (selectedBranches.value.length > 0) {
    closeDialog();
    emit('close');
  }
};

const closeDialog = () => {
  saveClicked.value = false;
  selectedBranches.value = [];
  emit('close');
};

const addBranch = (id, name) => {
  const index = selectedBranches.value.findIndex((branch) => branch.id === id);

  if (index === -1) {
    selectedBranches.value.push({
      id: id,
      name: name,
    });
  }
  // Reset the select element back to the default option
  branchSelect.value.value = '0';
};
</script>
