<template>
  <div
    class="min-h-screen bg-primary flex flex-col gap-4 items-center justify-center p-4 relative overflow-hidden"
  >
    <!-- Animated background -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-4 -left-4 w-72 h-72 bg-white opacity-10 rounded-full animate-pulse"
      ></div>
      <div
        class="absolute top-1/2 -right-8 w-96 h-96 bg-white opacity-5 rounded-full animate-bounce"
        style="animation-duration: 3s"
      ></div>
      <div
        class="absolute bottom-8 left-1/3 w-48 h-48 bg-white opacity-10 rounded-full animate-pulse"
        style="animation-delay: 1s"
      ></div>
    </div>
    <img src="@/assets/images/logo.png" alt="Foodics" class="h-8" />
    <slot />
  </div>
</template>
