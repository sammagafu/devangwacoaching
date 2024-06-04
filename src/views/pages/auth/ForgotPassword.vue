<template>
    <div class="pt-12">
      <div class="bg-gray-100 w-1/2 py-16 px-24 mx-auto text-gray-800 shadow-md rounded-lg">
        <img src="@/assets/images/logo/devangwa-logo.svg" alt="Devangwa Logo">
        <h2 class="text-center py-3">Welcome to PAT Learning Management System. <br> Don't have an account yet?
          <router-link :to="{ name: 'register' }" class="text-sky-600">Sign up</router-link>
        </h2>
        <form @submit.prevent="">
          <!-- Email input -->
          <div class="mb-6">
            <input type="email"
              class="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-devanga-primary focus:outline-none"
              placeholder="Email address" v-model="email" />
          </div>
  
          <!-- Submit button -->
          <button type="submit"
            class="inline-block px-7 py-3 bg-devanga-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true" data-mdb-ripple-color="light">
            Reset Password !
          </button>
        </form>
      </div>
    </div>
  </template>

  


<script setup>

</script>

 