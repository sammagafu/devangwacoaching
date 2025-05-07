<template>
    <AdminLayout>
      <b-row>
        <b-col cols="12" class="text-center">
          <img :src="forbidden403" class="h-200px h-md-400px mb-4" alt="Forbidden Access">
          <h1 class="display-1 text-danger mb-0">403</h1>
          <h2>Access Denied!</h2>
          <p class="mb-4">You do not have permission to access this page.</p>
          <router-link :to="{name: 'demos.default'}" class="btn btn-primary mb-0">Go to Home</router-link>
        </b-col>
      </b-row>
    </AdminLayout>
  </template>
  
  <script setup lang="ts">
  import AdminLayout from '@/layouts/AdminLayout.vue';
  import forbidden403 from '@/assets/images/element/error404-01.svg';
  </script>