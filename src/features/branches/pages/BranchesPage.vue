<template>
  <DefaultLayout>
    <h1 class="text-2xl font-bold text-primary">Branches</h1>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useBranchStore } from '../store/useBranchStore';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const branchStore = useBranchStore();
const { getBranches } = branchStore;
const { branches, loading, error } = storeToRefs(branchStore);

onMounted(async () => {
  await getBranches();
  console.log(branches.value);
  if (error.value) {
    console.log(error.value);
  }
});
</script>
