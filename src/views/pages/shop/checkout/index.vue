<template>
  <PagesLayout :show-shop-cart="true">
    <PageBanner />
    <PageContent @clear-cart="cartStore.clearCart" />
  </PagesLayout>
</template>

<script setup>
import PagesLayout from '@/layouts/PagesLayout.vue'
import PageBanner from '@/views/pages/shop/checkout/components/PageBanner.vue'
import PageContent from '@/views/pages/shop/checkout/components/PageContent.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>
