<template>
  <router-link class="navbar-brand" :class="logoClass" :to="{ name: 'demos.default' }">
    <img class="light-mode-item navbar-brand-item" :src="logo" alt="logo"/>
    <img class="dark-mode-item navbar-brand-item" :src="logo" alt="logo" />
  </router-link>
</template>
<script setup lang="ts">
import logo from '@/assets/images/logo.svg';

type LogoBoxPropType = {
  logoClass?: string;
};

defineProps<LogoBoxPropType>();
</script>