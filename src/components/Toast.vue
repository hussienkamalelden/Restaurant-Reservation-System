<template>
  <teleport to="body">
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-2"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-2"
    >
      <div
        v-if="isVisible && message"
        :class="toastClasses"
        class="fixed top-6 left-1/2 transform -translate-x-1/2 z-[60] px-5 py-4 rounded-xl shadow-2xl max-w-sm backdrop-blur-sm border border-white/20"
      >
        <div class="flex items-center gap-3">
          <p class="text-sm font-medium leading-relaxed">
            {{ message }}
          </p>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  message: {
    type: [String, Boolean],
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
    type: [Boolean, String],
    default: false,
  },
});

const emit = defineEmits(['hide']);

const isVisible = ref(false);
let hideTimeout = null;

const toastClasses = computed(() => {
  return (
    {
      success: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white',
      error: 'bg-gradient-to-r from-red-500 to-rose-500 text-white',
      warning: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
      info: 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white',
    }[props.type] || 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
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
