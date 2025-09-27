<template>
  <div class="fixed bg-black/30 flex items-center justify-center z-[3] inset-0">
    <Spinner :width="48" :height="48" :thickness="5" color="#5c2d91" />
  </div>
</template>

<script setup>
import Spinner from './Spinner.vue';
</script>
