<template>
  <div class="mb-6 px-4 py-2 bg-primary/10 rounded-lg border border-primary">
    <div class="flex items-center justify-between gap-3">
      <div>
        <h3 class="text-lg font-semibold text-text">Working Hours</h3>
        <p class="text-sm text-text">
          Branch working hours are<br />
          <span class="font-mono font-medium text-primary">
            {{ branchData?.opening_from }} - {{ branchData?.opening_to }}
          </span>
        </p>
      </div>
      <!-- Disable Branch Button -->
      <button
        type="button"
        @click="emit('disableBranch')"
        class="px-4 py-2 bg-red-600 cursor-pointer text-white font-medium rounded-md shadow-sm whitespace-nowrap"
      >
        Disable Branch
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  branchData: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits(['disableBranch']);
</script>
