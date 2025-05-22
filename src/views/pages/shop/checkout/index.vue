<!-- src/views/pages/shop/checkout/index.vue -->
<template>
  <PagesLayout>
    <PageBanner />
    <PageContent @clear-cart="handleClearCart" />
  </PagesLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import PagesLayout from '@/layouts/PagesLayout.vue';
import PageBanner from '@/views/pages/shop/checkout/components/PageBanner.vue';
import PageContent from '@/views/pages/shop/checkout/components/PageContent.vue';
import { useCartStore } from '@/stores/cart';

const $toast = useToast();
const cartStore = useCartStore();
const loading = ref(false);

const fetchCartItems = async () => {
  if (cartStore.isLoading) return;
  try {
    loading.value = true;
    await cartStore.fetchCartItems();
  } catch (err) {
    console.error('Failed to fetch cart items:', err);
    $toast.error('Failed to load cart items. Please try again.');
  } finally {
    loading.value = false;
  }
};

const handleClearCart = () => {
  cartStore.clearCart();
};

onMounted(() => {
  fetchCartItems();
});
</script>