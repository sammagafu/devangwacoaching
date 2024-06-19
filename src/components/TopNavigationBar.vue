<template>
<nav class="w-full z-20 top-0 start-0">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <router-link :to="{ name: 'home' }"><img src="@/assets/images/logo/devangwa-logo.svg" class="h-24" alt=""></router-link>
    <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <router-link :to="{name:'register'}" class="text-white bg-devanga-secondary hover:bg-devanga-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
        Get started
      </router-link>
    
    </div>

    
    <!-- <div class="w-full md:block md:w-auto" id="navbar-default" :class="{ 'hidden': !isOpen }">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
        <li>
          <router-link :to="{name:'about'}" class="block py-2 px-3 text-devanga-primary font-raleway">About Us</router-link>
        </li>
        <li>
          <router-link :to="{name:'coaching-list'}" class="block py-2 px-3 text-devanga-primary font-raleway">Coaching</router-link>
        </li>
        <li>
          <router-link :to="{name:'event-list'}" class="block py-2 px-3 text-devanga-primary font-raleway">Events</router-link>
        </li>

        <li>
          <router-link :to="{name:'community-index'}" class="block py-2 px-3 text-devanga-primary font-raleway">Devangwa Community</router-link>
        </li>

        <li>
          <router-link :to="{name:'contact'}" class="block py-2 px-3 text-devanga-primary font-raleway">Contact Us</router-link>
        </li>
      </ul>
    </div> -->
  </div>
</nav>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const isOpen = ref(false);
  
  const toggleMenu = () => {
    isOpen.value = !isOpen.value;
  };
  </script>