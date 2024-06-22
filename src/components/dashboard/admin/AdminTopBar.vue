<template>
  <nav class="w-full z-20 top-0 start-0">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <button data-collapse-toggle="navbar-default" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>

      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <div class="flex items-center relative">
          <img src="@/assets/images/placeholder/amyelsner.png" alt="Profile" class="w-8 h-8 rounded-full" />
          <span class="ml-2">{{ userName }}</span>
          <button @click="toggleMenu" class="ml-2 p-button p-button-text">
            <i class="pi pi-chevron-down"></i>
          </button>
          <Menu ref="menu" :popup="true" :model="items" />
        </div>
      </div>

      <div class="w-3/5 mx-auto">
        <form @submit.prevent="search" class="w-full mx-auto">
          <label for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search"
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for, Courses, Post, Materials..." required />
            <button type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-devanga-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import Menu from 'primevue/menu';

const userName = 'Samuel Magafu';
const menu = ref(null);

const items = [
  { label: 'Profile', icon: 'pi pi-user', command: () => { console.log('Profile clicked') } },
  { label: 'Inbox', icon: 'pi pi-inbox', command: () => { console.log('Inbox clicked') } },
  { label: 'Settings', icon: 'pi pi-cog', command: () => { console.log('Settings clicked') } },
  { label: 'Sign Out', icon: 'pi pi-sign-out', command: () => { console.log('Sign Out clicked') } },
];

const toggleMenu = (event) => {
  if (menu.value) {
    menu.value.toggle(event);
  }
};

const search = () => {
  // Handle search functionality here
  console.log('Performing search...');
};
</script>
