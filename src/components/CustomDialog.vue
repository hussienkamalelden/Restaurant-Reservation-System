<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black/70 flex flex-col items-center justify-start pt-10 z-[3]"
    @click="$emit('close')"
  >
    <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4" @click.stop>
      <!-- Title -->
      <h2
        class="text-xl text-text font-semibold mb-6 border-b border-gray-200 pb-3"
      >
        {{ title }}
      </h2>

      <!-- Body Slot -->
      <div class="mb-8 max-h-[50vh] overflow-y-auto">
        <slot></slot>
      </div>

      <!-- Buttons -->
      <div class="flex gap-3 justify-space-between">
        <button
          @click="$emit('close')"
          class="px-4 py-2 border rounded hover:bg-gray-50 text-text w-full cursor-pointer"
        >
          Close
        </button>
        <button
          @click="$emit('save')"
          class="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 w-full cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
});

defineEmits(['close', 'save']);
</script>
