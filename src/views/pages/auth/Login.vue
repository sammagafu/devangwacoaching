<template>
    <div class="pt-12">
      <div class="bg-gray-100 w-1/2 py-16 px-24 mx-auto text-gray-800 shadow-md rounded-lg">
        <img src="@/assets/images/logo/devangwa-logo.svg" alt="Devangwa Logo">
        <h2 class="text-center py-3">Welcome to PAT Learning Management System. <br> Don't have an account yet?
          <router-link :to="{ name: 'register' }" class="text-sky-600">Sign up</router-link>
        </h2>
        <form @submit.prevent="login">
          <!-- Email input -->
          <div class="flex flex-col gap-2">
          <label for="email">Enter email</label>
          <InputText id="email" v-model="email" aria-describedby="email-help" type="email" size="large"
            placeholder="mwajuma@gmail.com" />
          <small class="p-invalid" v-if="submitted && !email">E-mail is required.</small>
        </div>
  
          <!-- Password input -->
          <div class="flex flex-col gap-2 my-2">
          <label for="password">Enter password</label>
          <Password v-model="password" toggleMask size="large" placeholder="........" />
          <small class="p-invalid" v-if="submitted && !password">Password price is required.</small>
        </div>
  

            <div class="flex justify-between items-center">
              <div class="block my-4">
              <Checkbox v-model="rememberMe" :binary="true" class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-devanga-primary checked:border-devanga-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"/>
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
const submitted = ref(false)
const authStore = useAuthStore();

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});


const login = async () => {
      try {
        await authStore.login(email.value, password.value, rememberMe.value);
        router.push('/admin');
      } catch (error) {
        // Handle login error
        console.error(error);
      }
    };

</script>

 