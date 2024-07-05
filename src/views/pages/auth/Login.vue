<template>
  <div class="pt-12">
    <div class="bg-gray-100 w-1/2 py-16 px-24 mx-auto text-gray-800 shadow-md rounded-lg">
      <img src="@/assets/images/logo/devangwa-logo.svg" alt="Devangwa Logo">
      <h2 class="text-center py-3">Welcome to PAT Learning Management System. <br> Don't have an account yet?
        <router-link :to="{ name: 'register' }" class="text-sky-600">Sign up</router-link>
      </h2>
      <form @submit.prevent="loginUser">
        <!-- Email input -->
        <div class="flex flex-col gap-2">
          <label for="email">Enter email</label>
          <input id="email" v-model="email" type="email" class="border px-2 py-1 rounded" placeholder="mwajuma@gmail.com" required>
          <small class="text-red-600" v-if="submitted && !email">Email is required.</small>
        </div>

        <!-- Password input -->
        <div class="flex flex-col gap-2 my-2">
          <label for="password">Enter password</label>
          <input id="password" v-model="password" type="password" class="border px-2 py-1 rounded" placeholder="********" required>
          <small class="text-red-600" v-if="submitted && !password">Password is required.</small>
        </div>

        <div class="flex justify-between items-center">
          <div class="block my-4">
            <input id="rememberMe" v-model="rememberMe" type="checkbox" class="form-checkbox h-4 w-4 text-devanga-primary checked:bg-devanga-primary checked:border-devanga-primary focus:outline-none transition duration-200 mt-1 align-top">
            <label for="rememberMe" class="inline-block text-gray-800">Remember me</label>
          </div>
          <router-link :to="{ name: 'forget-password' }" class="text-devanga-primary hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out">Forgot password?</router-link>
        </div>

        <!-- Error message -->
        <div v-if="error" class="text-red-600 text-center my-2">
          {{ error }}
        </div>

        <!-- Submit button -->
        <button type="submit" class="w-full px-7 py-3 bg-devanga-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 focus:bg-blue-700 focus:outline-none active:bg-blue-800 transition duration-150 ease-in-out">
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
  try {
    submitted.value = true;
    if (!email.value || !password.value) return; // Prevent submission if fields are empty
    await authStore.login(email.value, password.value, rememberMe.value);
    router.push('/admin'); // Redirect to admin page after successful login
  } catch (error) {
    console.error('Login error:', error);
    // Handle login error
    if (error.response && error.response.status === 401) {
      error.value = 'Invalid email or password. Please try again.';
    } else {
      error.value = 'An error occurred while logging in. Please try again later.';
    }
  }
};
</script>
