<template>
  <div class="container mx-auto">
    <nav class="w-full z-50 top-0 start-0 bg-devanga-neutral p-4 flex justify-between items-center relative">
    <!-- Hamburger Button -->
    <button
      @click="toggleMenu"
      class="inline-flex items-center p-2 justify-center text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
    >
      <span class="sr-only">Toggle navigation menu</span>
      <svg
        v-if="!isOpen"
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
      <svg
        v-if="isOpen"
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>

    <!-- Logo in the Center -->
    <router-link :to="{ name: 'home' }" class="flex-grow text-center">
      <img
        src="@/assets/images/logo/devangwa-logo.svg"
        class="mx-auto h-20"
        alt="Logo"
      />
    </router-link>

    <!-- Right Side Button -->
    <router-link
      :to="{ name: 'register' }"
      class="text-white bg-devanga-primary font-bold rounded-full text-sm px-4 py-2"
    >
      get started
    </router-link>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 w-full h-screen bg-white shadow-md z-50 overflow-auto"
    >
      <button
        @click="toggleMenu"
        class="absolute top-4 left-4 text-gray-700 focus:outline-none"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
      <ul class="p-8 flex flex-col space-y-4 mt-12 font-raleway font-bold text-4xl">
        <li>
          <router-link
            :to="{ name: 'about' }"
            class="block text-devanga-primary hover:text-gray-900"
            @click="toggleMenu"
          >
            about us
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'coaching-list' }"
            class="block text-devanga-primary hover:text-gray-900"
            @click="toggleMenu"
          >
            coaching
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'event-list' }"
            class="block text-devanga-primary hover:text-gray-900"
            @click="toggleMenu"
          >
            events
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'community-index' }"
            class="block text-devanga-primary hover:text-gray-900"
            @click="toggleMenu"
          >
            Devangwa community
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'contact' }"
            class="block text-devanga-primary hover:text-gray-900"
            @click="toggleMenu"
          >
            contact us
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>
