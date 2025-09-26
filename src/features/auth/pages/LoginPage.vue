<script setup>
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

// Form validation schema
const schema = yup.object({
  token: yup
    .string()
    .required('Token is required')
    .min(1, 'Please enter your token'),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: token, errorMessage: tokenError } = useField('token');

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted:', values);
  // Handle form submission here
});
</script>

<template>
  <div
    class="min-h-screen bg-primary flex items-center justify-center p-4 relative overflow-hidden"
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

    <!-- Login card -->
    <div
      class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10 backdrop-blur-sm bg-opacity-95"
    >
      <!-- Title -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
        <p class="text-gray-600 text-lg">Foodics Reservation System</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div>
          <div class="relative">
            <input
              v-model="token"
              type="text"
              placeholder="Please enter your token"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
              :class="{ 'border-red-500 focus:ring-red-500': tokenError }"
            />
          </div>
          <p v-if="tokenError" class="mt-2 text-sm text-red-600">
            {{ tokenError }}
          </p>
        </div>

        <button
          type="submit"
          class="w-full bg-primary cursor-pointer text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 shadow-lg"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
