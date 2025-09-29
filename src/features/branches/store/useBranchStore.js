import { defineStore } from 'pinia';
import { branchesService } from '../services/branchesService';
import { ref } from 'vue';

export const useBranchStore = defineStore('branches', () => {
  const branches = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const selectedBranches = ref([]);
  const activeBranches = ref([]);
  const disabledBranches = ref([]);
  const selectedSlots = ref([]);

  const getBranches = async () => {
    try {
      loading.value = true;
      const { data } = await branchesService.getAll();
      branches.value = data;

      // Separate active and disabled branches
      activeBranches.value = [];
      disabledBranches.value = [];
      data?.data?.forEach((branch) => {
        if (branch.accepts_reservations) {
          activeBranches.value.push(branch);
        } else {
          disabledBranches.value.push(branch);
        }
      });
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const updateBranchesInfo = async (id, data) => {
    try {
      loading.value = true;
      const response = await branchesService.updateInfo(id, data);
      return response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    branches,
    loading,
    error,
    selectedBranches,
    activeBranches,
    disabledBranches,
    selectedSlots,
    getBranches,
    updateBranchesInfo,
  };
});
