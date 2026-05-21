<template>
  <router-link
    class="navbar-brand brand-lockup"
    :class="logoClass"
    :to="{ name: 'demos.default' }"
    aria-label="Devangwa Coaching — Home"
  >
    <img class="light-mode-item brand-lockup__logo navbar-brand-item" :src="logo" alt="Devangwa Coaching" />
    <img class="dark-mode-item brand-lockup__logo navbar-brand-item" :src="logoLight" alt="Devangwa Coaching" />
  </router-link>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.svg'
import logoLight from '@/assets/images/logo-light.svg'

type LogoBoxPropType = {
  logoClass?: string
}

defineProps<LogoBoxPropType>()
</script>

<style scoped>
.brand-lockup {
  display: inline-flex;
  align-items: center;
  padding: 0;
  text-decoration: none;
}

.brand-lockup__logo,
.brand-lockup :deep(.navbar-brand-item) {
  height: 3rem !important;
  width: auto;
  max-width: min(280px, 50vw);
  object-fit: contain;
}

@media (min-width: 992px) {
  .brand-lockup__logo,
  .brand-lockup :deep(.navbar-brand-item) {
    height: 3.75rem !important;
    max-width: 320px;
  }
}
</style>
