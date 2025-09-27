<template>
  <header
    class="bg-blue-600 text-white py-4 px-6 flex justify-between items-center"
  >
    <h1 class="text-xl font-bold">My App</h1>
    <img src="@/assets/logo.png" alt="Logo" class="w-10 h-10" />
    <nav class="space-x-4">
      <RouterLink to="/branches">Branches</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </nav>
  </header>
</template>
<script setup></script>
