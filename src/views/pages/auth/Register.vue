<template>
    <div class="pt-32">
      <div class="bg-gray-100 w-1/2 py-16 px-24 mx-auto text-gray-800 shadow-md rounded-lg">
        <img src="@/assets/images/logo/devangwa-logo.svg" alt="Devangwa Logo">
        <h2 class="text-center py-4">Welcome to PAT Learning Management System. <br> Already have an account? <router-link
            :to="{ name: 'login' }" class="text-sky-600">Login</router-link>
        </h2>
        <form @submit.prevent="registerUser">
          <!-- Email input -->
          <div class="mb-6">
            <label for="fullname">Full name</label>
            <input id="fullname" type="text"
              class="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Enter your full name" v-model="fullname" />
          </div>
  
          <div class="mb-6">
            <label for="email" class="text-gray-300">email</label>
            <input id="email" type="text"
              class="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Enter your e-mail" v-model="email" />
          </div>
  
                  <!-- Password input -->
          <div class="mb-6">
            <label for="password" class="text-gray-300">Password</label>
            <input id="password" type="password"
              class="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password" v-model="password"/>
          </div>
  
          <div class="mb-6">
            <label for="phone" class="text-gray-300">Phone Number </label>
            <input id="phone" type="text"
              class="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="+2557884111111" v-model="phone"/>
            <p class="text-xs text-gray-400">start with +255 or any country code</p>
          </div>
                  <!-- Password input -->
          <div class="mb-6">
            <label for="avatar" class="text-gray-300 block">avatar</label>
            <input id="avatar" type="file" ref="avatar" @change="onFileChange"/>
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
import RadioButton from 'primevue/radiobutton';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore'; // Import your auth store
import apiService from '@/service/apiService'; // Import your API service


const router = useRouter();
const email = ref('');
const fullname = ref('');
const usertype = ref("")
const is_individual = computed(() => usertype.value === 'individual');
const is_company = computed(() => usertype.value === 'business');
const password = ref('');
const rememberMe = ref(false);
const authStore = useAuthStore();

const logoUrl = computed(() => {
  return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const registerUser = async () => {
  try {
    const response = await apiService.post('auth/users/', {
      full_name : fullname.value,
      email: email.value,
      password: password.value,
      is_individual: is_individual.value,
      is_company: is_company.value,
    });
    
  } catch (error) {
    console.error('Error logging in:', error);
    // Handle error, such as displaying a message to the user
  }
  router.push({ name: 'login' });
};


  


</script>

 