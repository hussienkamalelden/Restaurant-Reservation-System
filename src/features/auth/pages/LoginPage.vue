<template>
  <BackgroundAnimation>
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
            <label
              for="token"
              class="block text-base font-medium text-gray-700 mb-1"
            >
              Token: <span class="text-red-500">*</span>
            </label>
            <input
              v-model="tokenInput"
              type="text"
              placeholder="Please enter your token"
              id="token"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700"
              :class="{ 'border-red-500 focus:ring-red-500': errorMessage }"
            />
          </div>
          <p v-if="errorMessage" class="mt-2 text-sm text-red-600">
            {{ errorMessage }}
          </p>
        </div>

        <button
          type="submit"
          class="w-full bg-primary cursor-pointer text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="loading"
        >
          {{ loading ? 'Loading...' : 'Login' }}
        </button>
      </form>
    </div>
  </BackgroundAnimation>
</template>

<script setup>
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { loginService } from '../services/loginService';
import { ref } from 'vue';
import router from '@/router';
import BackgroundAnimation from '../components/BackgroundAnimation.vue';

const loading = ref(false);

// Form validation schema
const schema = yup.object({
  token: yup
    .string()
    .required('Token is required')
    .min(10, 'Please enter a valid token'),
});

const { handleSubmit, setFieldError } = useForm({
  validationSchema: schema,
});

const { value: tokenInput, errorMessage } = useField('token');

// Submit form
const onSubmit = handleSubmit(async (values) => {
  localStorage.setItem('token', values.token);
  try {
    loading.value = true;
    const response = await loginService.checkToken();
    router.push('/branches');
  } catch (error) {
    // Check status because it HEAD request, so it won't have a message in response
    if (error?.response?.status === 401) {
      setFieldError('token', 'Unauthorized / Wrong token');
    } else {
      setFieldError('token', 'Something went wrong');
    }
  } finally {
    loading.value = false;
  }
});
</script>
