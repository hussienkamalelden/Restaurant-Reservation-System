<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <BackgroundAnimation>
      <router-view />
    </BackgroundAnimation>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import BackgroundAnimation from '@/components/BackgroundAnimation.vue';
</script>

<style scoped></style>
