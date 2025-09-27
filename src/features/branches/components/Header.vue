<template>
  <header class="pt-4">
    <div class="flex items-center justify-between">
      <!-- Title -->
      <div class="flex items-center">
        <div class="w-1 h-8 bg-primary rounded-full mr-4"></div>
        <h1 class="text-3xl font-bold text-text tracking-tight">
          Reservations
        </h1>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3">
        <!-- Disable Reservations Button -->
        <button
          class="px-6 py-3 text-sm font-semibold rounded-xl text-white transition-all duration-200 bg-red-600 cursor-pointer hover:bg-red-500"
          @click="handleDisableReservations"
        >
          Disable Reservations
        </button>

        <!-- Add Branches Button -->
        <button
          class="px-6 py-3 text-sm font-semibold rounded-xl text-white bg-primary cursor-pointer hover:bg-primary/90"
          @click="handleAddBranches"
        >
          Add Branches
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const handleDisableReservations = () => {
  console.log('Disable Reservations');
};

const handleAddBranches = () => {
  console.log('Add Branches');
};
</script>
