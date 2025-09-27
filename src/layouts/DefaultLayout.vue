<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
</script>

<style scoped></style>
