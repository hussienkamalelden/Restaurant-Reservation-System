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
          class="block text-md font-medium text-text mb-1"
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
            v-for="branch in disabledBranches"
            :key="branch.id"
            :value="branch.id"
            :name="branch.name"
            :disabled="
              selectedBranches.some((selected) => selected.id === branch.id)
            "
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
            @remove="handleRemove"
          />
        </div>
      </div>
    </div>
  </CustomDialog>
  <Toast
    :visible="toastVisible"
    :message="toastMessage"
    type="info"
    duration="5000"
    @hide="toastVisible = false"
  />
</template>

<script setup>
import CustomDialog from '@/components/CustomDialog.vue';
import { useBranchStore } from '../store/useBranchStore';
import { useBranchBatchProcessor } from '../composables/useBranchBatchProcessor';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import Tag from '@/components/Tag.vue';
import Toast from '@/components/Toast.vue';
const branchStore = useBranchStore();
const { updateBranchesStatus, getBranches } = branchStore;
const { selectedBranches, disabledBranches } = storeToRefs(branchStore);
// Initialize the batch processor composable - arguments:(function, data, batch size)
const { processBranchesInBatches } = useBranchBatchProcessor(
  updateBranchesStatus,
  { accepts_reservations: true },
  3
);

const saveClicked = ref(false);
const branchSelect = ref(null);
const toastVisible = ref(false);
const toastMessage = ref('');

defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const handleSave = async () => {
  saveClicked.value = true;
  if (selectedBranches.value.length > 0) {
    const { successCount, failureCount } = await processBranchesInBatches(
      selectedBranches.value
    );

    // Update toast message based on results
    toastMessage.value =
      successCount > 0
        ? `${successCount} branches activated successfully, and ${failureCount} failed`
        : `Failed to activate ${failureCount} branches`;
    toastVisible.value = true;

    // Refresh the branches and close the dialog
    await getBranches();
    closeDialog();
  }
};

const closeDialog = () => {
  saveClicked.value = false;
  selectedBranches.value = [];
  branchSelect.value.value = '0';
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

// Check if the id is in selectedBranch array and remove it
const handleRemove = (id) => {
  selectedBranches.value = selectedBranches.value.filter((t) => t.id !== id);
};
</script>
