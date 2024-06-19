<template>
    <div class="pt-12">
      <div class="bg-gray-100 w-1/2 py-16 px-24 mx-auto text-gray-800 shadow-md rounded-lg">
        <img src="@/assets/images/logo/devangwa-logo.svg" alt="Devangwa Logo">
        <h2 class="text-center py-3">Welcome to PAT Learning Management System. <br> Don't have an account yet?
          <router-link :to="{ name: 'register' }" class="text-sky-600">Sign up</router-link>
        </h2>
        <form @submit.prevent="login">
          <!-- Email input -->
          <div class="mb-6">
            <input type="text"
              class="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-devanga-primary focus:outline-none"
              placeholder="Enter your username" v-model="email" />
          </div>
  
          <!-- Password input -->
          <div class="mb-6">
            <input type="password"
              class="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-devanga-primary focus:outline-none"
              placeholder="Password" v-model="password" />
          </div>
  
          <div class="flex justify-between items-center mb-6">
            <div class="form-group form-check">
              <input type="checkbox"
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-devanga-primary checked:border-devanga-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck3" checked />
              <label class="form-check-label inline-block text-gray-800" for="exampleCheck2">Remember me</label>
            </div>
            <router-link :to="{name:'forget-password'}" class="text-devanga-primary hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out">Forgot
              password?</router-link>
          </div>
  
          <!-- Submit button -->
          <button type="submit"
            class="inline-block px-7 py-3 bg-devanga-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true" data-mdb-ripple-color="light">
            Sign in
          </button>
        </form>
      </div>
    </div>
  </template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore'; // Import your auth store
import apiService from '@/service/apiService'; // Import your API service


const router = useRouter();
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const authStore = useAuthStore();

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});


const login = async () => {
      try {
        await authStore.login(email.value, password.value, rememberMe.value);
        router.push('/');
      } catch (error) {
        // Handle login error
        console.error(error);
      }
    };

</script>

 