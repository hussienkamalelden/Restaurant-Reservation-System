<template>
  <div
    class="flex items-center justify-between gap-3 px-3 py-1.5 text-text rounded-md border-2 border-primary bg-primary/10"
  >
    <span class="select-none text-sm font-medium">{{ name }}</span>
    <i
      class="icon-close cursor-pointer text-xs font-semibold text-white bg-primary rounded-full h-5 w-5 flex items-center justify-center leading-none"
      @click="emit('remove', id)"
    ></i>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: [String, Number],
    required: true,
  },
});
const emit = defineEmits(['remove']);
</script>
