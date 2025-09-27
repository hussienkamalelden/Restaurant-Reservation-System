<template>
  <div
    v-if="visible && message"
    :class="toastClasses"
    class="fixed top-4 left-1/2 transform -translate-x-1/2 z-[5] px-4 py-2 rounded-lg shadow-lg max-w-sm transition-all duration-300"
  >
    {{ message }}
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info',
  },
  duration: {
    type: Number,
    default: 2000,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const visible = ref(props.visible);

const toastClasses = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-500 text-white',
}[props.type];

onMounted(() => {
  visible.value = true;

  setTimeout(() => {
    visible.value = false;
  }, props.duration);
});
</script>
