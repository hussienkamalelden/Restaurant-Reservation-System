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
    message="Reservations disabled successfully"
    type="success"
    :duration="5000"
    @hide="toastVisible = false"
  />
</template>

<script setup>
import CustomDialog from '@/components/CustomDialog.vue';
import Toast from '@/components/Toast.vue';
import { useBranchStore } from '../store/useBranchStore';
import { ref } from 'vue';
const branchStore = useBranchStore();
const { disableAllReservations } = branchStore;

const toastVisible = ref(false);

defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'save']);

const handleSave = async () => {
  const response = await disableAllReservations(
    '97a57184-e3e5-4d0e-8556-09270dcd686c'
  );
  if (response.status === 200) {
    toastVisible.value = true;
  }
  closeDialog();
};

const closeDialog = () => {
  emit('close');
};
</script>
