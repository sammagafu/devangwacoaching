<!-- src/views/pages/shop/checkout/index.vue -->
<template>
  <PagesLayout>
    <PageBanner />
    <PageContent :cart-items="cartItems" @clear-cart="handleClearCart" @place-order="handlePlaceOrder" />
  </PagesLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import PagesLayout from '@/layouts/PagesLayout.vue';
import PageBanner from '@/views/pages/shop/checkout/components/PageBanner.vue';
import PageContent from '@/views/pages/shop/checkout/components/PageContent.vue';
import { useCartStore } from '@/stores/cart';

const $toast = useToast();
const cartStore = useCartStore();
const cartItems = ref(cartStore.cartItems);
const loading = ref(false);

const fetchCartItems = async () => {
  try {
    loading.value = true;
    await cartStore.fetchCartItems();
    cartItems.value = cartStore.cartItems;
  } catch (err) {
    console.error('Failed to fetch cart items:', err);
    $toast.error('Failed to load cart items. Please try again.');
  } finally {
    loading.value = false;
  }
};

const handleClearCart = () => {
  cartStore.clearCart();
  cartItems.value = cartStore.cartItems;
};

const handlePlaceOrder = (payload) => {
  // Handled by PageContent.vue; no action needed here
};

onMounted(() => {
  fetchCartItems();
});
</script>