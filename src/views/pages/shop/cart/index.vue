<template>
  <PagesLayout :show-shop-cart="true">
    <PageBanner />
    <PageContent />
  </PagesLayout>
</template>

<script setup>
import PagesLayout from '@/layouts/PagesLayout.vue'
import PageBanner from '@/views/pages/shop/cart/components/PageBanner.vue'
import PageContent from '@/views/pages/shop/cart/components/PageContent.vue'
</script>
