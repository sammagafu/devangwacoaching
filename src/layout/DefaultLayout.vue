<!-- LandingLayout.vue -->
<template>
  <div>
    <TopNavigationBar/>
    <main>
      <router-view></router-view> <!-- Render the child component here -->
    </main>
    <Footer/>
  </div>
</template>
<script setup>
import TopNavigationBar from '@/components/TopNavigationBar.vue';
import Footer from '@/components/Footer.vue';
</script>
