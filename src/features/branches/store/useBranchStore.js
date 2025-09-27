import { defineStore } from 'pinia';
import { branchesService } from '../services/branchesService';
import { ref } from 'vue';

export const useBranchStore = defineStore('branches', () => {
  const branches = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const selectedBranches = ref([]);

  const getBranches = async () => {
    try {
      loading.value = true;
      const { data } = await branchesService.getAll();
      branches.value = data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const activateBranches = async (id, data) => {
    try {
      loading.value = true;
      const response = await branchesService.add(id, data);
      await getBranches();
      return response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const disableAllReservations = async (id) => {
    try {
      const response = await branchesService.disableAll(id);
      await getBranches();
      return response;
    } catch (err) {
      error.value = err;
    }
  };

  return {
    branches,
    loading,
    error,
    selectedBranches,
    getBranches,
    activateBranches,
    disableAllReservations,
  };
});
