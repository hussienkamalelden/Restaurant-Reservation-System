<template>
  <teleport to="body">
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isVisible && message"
        :class="toastClasses"
        class="fixed top-4 left-1/2 text-white transform -translate-x-1/2 z-[60] px-4 py-2 rounded-lg shadow-lg max-w-sm text-center"
      >
        {{ message }}
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'info',
  },
  duration: {
    type: [Number, String],
    default: 2000,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['hide']);

const isVisible = ref(false);
let hideTimeout = null;

// Tailwind color classes based on type
const toastClasses = computed(() => {
  return (
    {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500',
    }[props.type] || 'bg-blue-500'
  );
});

// Watch visible prop and handle auto-hide with timeout clearing
watch(
  () => props.visible,
  (newValue) => {
    // Clear previous timeout if toast is triggered again
    clearTimeout(hideTimeout);

    if (newValue) {
      isVisible.value = true;

      // Auto-hide after duration
      hideTimeout = setTimeout(() => {
        isVisible.value = false;
        emit('hide');
      }, props.duration);
    } else {
      isVisible.value = false;
    }
  },
  { immediate: true }
);
</script>
