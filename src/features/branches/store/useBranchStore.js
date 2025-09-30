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
      error.value = err.response.data.message || err;
    } finally {
      loading.value = false;
    }
  };

  const updateBranchesInfo = async (id, data, tables = []) => {
    try {
      loading.value = true;
      // If no tables are provided, update the branch info
      if (!tables.length) {
        const response = await branchesService.updateInfo(id, data);
        return response;
      } else {
        // If tables are provided, update the tables and the branch info
        const tablesRequests = tables.map((table) =>
          branchesService.updateTables(table.id, { accepts_reservations: true })
        );
        const results = await Promise.all([
          branchesService.updateInfo(id, data),
          ...tablesRequests,
        ]);
        return results;
      }
    } catch (err) {
      error.value = err.response.data.message || err;
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
