<template>
  <nav class="bg-primary shadow-xl">
    <div class="container">
      <div class="flex justify-between items-center py-4">
        <img
          src="@/assets/images/logo.png"
          alt="Restaurant Logo"
          class="h-8 w-auto sm:h-10"
        />
        <div
          class="hidden md:flex items-center bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer select-none"
          @click="handleLogout"
        >
          Logout
        </div>
        <i
          class="icon-burger-menu text-3xl text-white md:hidden"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        ></i>
      </div>

      <!-- Mobile Menu -->
      <div
        :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
        class="md:hidden border-t border-white/10"
      >
        <div
          class="mt-2 mb-3 py-2 w-full bg-white/10 text-white border border-white/20 px-4 rounded-lg text-base font-medium transition-all duration-300 text-center cursor-pointer"
          @click="handleLogout"
        >
          Logout
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';

const isMobileMenuOpen = ref(false);

const handleLogout = async () => {
  localStorage.removeItem('token');
  await router.push('/login');
};
</script>
