<template>
  <CustomDialog
    :is-visible="isVisible"
    title="Disable Reservations"
    @close="closeDialog"
    @save="handleSave"
  >
    <div class="space-y-4">
      <div class="text-center">
        <p class="text-text text-lg">
          Are you sure you want to disable all reservations?
        </p>
      </div>
    </div>
  </CustomDialog>
  <Toast
    :visible="toastVisible"
    :message="toastMessage"
    type="info"
    :duration="5000"
    @hide="toastVisible = false"
  />
</template>

<script setup>
import CustomDialog from '@/components/CustomDialog.vue';
import Toast from '@/components/Toast.vue';
import { useBranchStore } from '../store/useBranchStore';
import { ref } from 'vue';
import { useBranchBatchProcessor } from '../composables/useBranchBatchProcessor';
import { storeToRefs } from 'pinia';
const branchStore = useBranchStore();
const { updateBranchesStatus, getBranches } = branchStore;
const { activeBranches } = storeToRefs(branchStore);
// Initialize the batch processor composable - arguments:(function, data, batch size)
const { processBranchesInBatches } = useBranchBatchProcessor(
  updateBranchesStatus,
  { accepts_reservations: false },
  3
);

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
  if (activeBranches.value.length > 0) {
    const { successCount, failureCount } = await processBranchesInBatches(
      activeBranches.value
    );

    // Update toast message based on results
    toastMessage.value =
      successCount > 0
        ? `${successCount} branches disabled successfully, and ${failureCount} failed`
        : `Failed to disable ${failureCount} branches`;
    toastVisible.value = true;

    // Refresh the branches and close the dialog
    await getBranches();
    closeDialog();
  }
};

const closeDialog = () => {
  emit('close');
};
</script>
