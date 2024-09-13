<template>
  <div class="py-12 font-raleway">
    <div class="bg-gray-100 w-1/2 py-16 px-24 mx-auto text-gray-800 shadow-md rounded-lg">
      <img src="@/assets/images/logo/devangwa-logo.svg" alt="Devangwa Logo">
      <h2 class="text-center py-8">
        Log in to continue your journey with Devangwa Coaching. Don't have an account yet?
        <router-link :to="{ name: 'register' }" class="text-sky-600">Sign up</router-link>
      </h2>
      <form @submit.prevent="loginUser">
        <div class="flex flex-col gap-2">
          <label for="email">Enter email</label>
          <input id="email" v-model="email" type="email" class="border px-2 py-1 rounded" placeholder="mwajuma@gmail.com" required>
          <small class="text-red-600" v-if="submitted && !email">Email is required.</small>
        </div>
        <div class="flex flex-col gap-2 my-2">
          <label for="password">Enter password</label>
          <input id="password" v-model="password" type="password" class="border px-2 py-1 rounded" placeholder="********" required>
          <small class="text-red-600" v-if="submitted && !password">Password is required.</small>
        </div>
        <div class="flex justify-between items-center">
          <input id="rememberMe" v-model="rememberMe" type="checkbox" class="form-checkbox h-4 w-4 text-devanga-primary">
          <label for="rememberMe" class="inline-block text-gray-800">Remember me</label>
          <router-link :to="{ name: 'forget-password' }" class="text-devanga-primary">Forgot password?</router-link>
        </div>
        <div v-if="error" class="text-red-600 text-center my-2">{{ error }}</div>
        <button type="submit" class="w-full px-7 py-3 bg-devanga-primary text-white uppercase rounded shadow-md">
          Sign in
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore'; // Import your Pinia store

const router = useRouter();
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const submitted = ref(false);
const error = ref('');
const authStore = useAuthStore();

const loginUser = async () => {
  submitted.value = true;
  if (!email.value || !password.value) return;

  try {
    await authStore.login(email.value, password.value, rememberMe.value, router);
  } catch (err) {
    console.error('Login error:', err);
    error.value = err.response?.status === 401 ? 'Invalid email or password.' : 'An error occurred. Please try again.';
  }
};
</script>
