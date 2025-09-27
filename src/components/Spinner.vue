<template>
  <div
    class="rounded-full animate-spin"
    :style="{
      width: width + 'px',
      height: height + 'px',
      border: thickness + 'px solid ' + color,
      borderTopColor: 'transparent',
      animationDuration: '.5s',
    }"
  />
</template>

<script setup>
const props = defineProps({
  width: {
    type: Number,
    default: 32,
  },
  height: {
    type: Number,
    default: 32,
  },
  color: {
    type: String,
    default: '#5c2d91',
  },
  thickness: {
    type: Number,
    default: 4,
  },
});
</script>
