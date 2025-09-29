<template>
  <DefaultLayout>
    <Header />
    <section class="my-4">
      <Table
        :headers="headers"
        :data="customData"
        :loading="loading"
        @row-click="handleRowClick"
      />
    </section>
  </DefaultLayout>
  <Toast
    :visible="error"
    :message="error"
    type="error"
    :duration="5000"
    @hide="error = false"
  />
  <Loading v-if="loading" />
  <EditBranch
    :is-visible="showEditDialog"
    :branch-data="selectedBranch"
    @close="closeEditDialog"
  />
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useBranchStore } from '../store/useBranchStore';
import { storeToRefs } from 'pinia';
import { onMounted, computed, ref } from 'vue';
import Loading from '@/components/Loading.vue';
import Table from '../components/Table.vue';
import Header from '../components/Header.vue';
import EditBranch from '../components/EditBranch/index.vue';
import { minutesToHours } from '@/utils/time';
import Toast from '@/components/Toast.vue';

const branchStore = useBranchStore();
const { getBranches } = branchStore;
const { branches, loading, error } = storeToRefs(branchStore);

// Edit dialog state
const showEditDialog = ref(false);
const selectedBranch = ref(null);

onMounted(async () => {
  await getBranches();
});

// Handle row click from table
const handleRowClick = (branch) => {
  if (branch.accepts_reservations === 'Yes') {
    selectedBranch.value = branch;
    showEditDialog.value = true;
  } else {
    error.value =
      'This branch does not accept reservations, please activate it first';
  }
};

// Close edit dialog
const closeEditDialog = () => {
  showEditDialog.value = false;
  selectedBranch.value = null;
};

// Headers for the table
const headers = [
  { key: 'name', label: 'Branch' },
  { key: 'reference', label: 'Reference' },
  { key: 'number_of_tables', label: 'Number of Tables' },
  { key: 'reservation_duration_formatted', label: 'Reservation Duration' },
  { key: 'accepts_reservations', label: 'Accepts Reservations' },
];

// Custom data for the table
const customData = computed(() => {
  return branches.value?.data?.map((branch) => {
    return {
      ...branch,
      number_of_tables: branch.sections.reduce(
        (acc, section) => acc + section.tables.length,
        0
      ),
      reservation_duration_formatted: `${minutesToHours(
        branch.reservation_duration
      )}`,
      accepts_reservations: branch.accepts_reservations ? 'Yes' : 'No',
    };
  });
});
</script>
