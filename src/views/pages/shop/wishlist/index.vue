<template>
  <PagesLayout>
    <PageBanner />
    <PageContent />
  </PagesLayout>
</template>
<script setup lang="ts">
import PagesLayout from '@/layouts/PagesLayout.vue';

import PageBanner from '@/views/pages/shop/wishlist/components/PageBanner.vue';
import PageContent from '@/views/pages/shop/wishlist/components/PageContent.vue';
</script>