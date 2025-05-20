// src/stores/cart.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/services/authService';
import { useToast } from 'vue-toast-notification';

export const useCartStore = defineStore('cart', () => {
  const $toast = useToast();
  const cartItems = ref([]);

  const fetchCartItems = async () => {
    try {
      if (!cartItems.value.length) {
        $toast.info('Your cart is empty.');
        return;
      }
      const items = await Promise.all(
        cartItems.value.map(async (item) => {
          const endpoint = item.type === 'course' ? `/course/courses/${item.slug}/` : `/events/${item.slug}/`;
          try {
            const response = await api.get(endpoint);
            return {
              ...response.data,
              type: item.type,
              image: response.data.image || (item.type === 'course' ? '/default-course-image.jpg' : '/default-event-image.jpg'),
              category: item.type === 'course' && response.data.tags?.length > 0 ? response.data.tags[0].tag : 'general',
              final_price: response.data.final_price || 0,
              price: response.data.price || response.data.final_price || 0,
            };
          } catch (err) {
            $toast.error(`Failed to load ${item.type} ${item.slug}.`);
            return null;
          }
        })
      );
      cartItems.value = items.filter((item) => item !== null);
      if (!cartItems.value.length) {
        $toast.info('Your cart is empty or contains invalid items.');
      }
    } catch (err) {
      $toast.error('Failed to load cart items. Please try again.');
      cartItems.value = [];
    }
  };

  const addToCart = (item) => {
    if (!cartItems.value.some((i) => i.slug === item.slug && i.type === item.type)) {
      cartItems.value.push(item);
      $toast.success(`${item.type === 'course' ? 'Course' : 'Event'} added to cart.`);
    } else {
      $toast.info(`${item.type === 'course' ? 'Course' : 'Event'} is already in cart.`);
    }
  };

  const removeFromCart = (slug, type) => {
    const index = cartItems.value.findIndex((i) => i.slug === slug && i.type === type);
    if (index !== -1) {
      cartItems.value.splice(index, 1);
      $toast.info(`${type === 'course' ? 'Course' : 'Event'} removed from cart.`);
    }
  };

  const clearCart = () => {
    cartItems.value = [];
    $toast.info('Cart cleared.');
  };

  return {
    cartItems,
    fetchCartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };
});