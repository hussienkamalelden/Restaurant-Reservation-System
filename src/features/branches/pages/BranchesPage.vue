<template>
  <DefaultLayout>
    <Header />
    <section class="my-4">
      <Table :headers="headers" :data="customData" />
    </section>
  </DefaultLayout>
  <Toast :visible="error" :message="error" type="error" :duration="5000" />
  <Loading v-if="loading" />
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useBranchStore } from '../store/useBranchStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref, computed } from 'vue';
import Loading from '@/components/Loading.vue';
import Table from '../components/Table.vue';
import Header from '../components/Header.vue';
import { minutesToHours } from '@/utils/time';
import Toast from '@/components/Toast.vue';

const branchStore = useBranchStore();
const { getBranches } = branchStore;
const { branches, loading, error } = storeToRefs(branchStore);

onMounted(async () => {
  await getBranches();
});

// Headers for the table
const headers = [
  { key: 'name', label: 'Branch' },
  { key: 'reference', label: 'Reference' },
  { key: 'number_of_tables', label: 'Number of Tables' },
  { key: 'reservation_duration', label: 'Reservation Duration' },
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
      reservation_duration: `${minutesToHours(branch.reservation_duration)}`,
      accepts_reservations: branch.accepts_reservations ? 'Yes' : 'No',
    };
  });
});
</script>
