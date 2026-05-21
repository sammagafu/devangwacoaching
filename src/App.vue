<template>
  <RouterView />
  <BackToTop />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import BackToTop from '@/components/BackToTop.vue';
import AOS from 'aos';

import { useLayoutStore } from '@/stores/layout';

// Demo mock API — only when explicitly enabled (never in production)
if (import.meta.env.VITE_USE_FAKE_BACKEND === 'true') {
  import('@/helpers/fake-backend').then((m) => m.default());
}
const useLayout = useLayoutStore();
useLayout.setTheme(useLayout.theme);

onMounted(() => {
  AOS.init();
});
</script>
