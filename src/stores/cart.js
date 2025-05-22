// src/stores/cart.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/services/authService';
import { useToast } from 'vue-toast-notification';

/**
 * @typedef {Object} CartItem
 * @property {string} slug - Unique identifier for the item
 * @property {'course' | 'event'} type - Type of item (course or event)
 * @property {string} title - Item title
 * @property {number} final_price - Price after discounts
 * @property {number} price - Original price
 * @property {string} [image] - Item image URL
 * @property {string} [category] - Item category
 * @property {*} [key: string] - Allow additional fields from API
 */

export const useCartStore = defineStore('cart', () => {
  const $toast = useToast();
  /** @type {import('vue').Ref<CartItem[]>} */
  const cartItems = ref([]);
  /** @type {import('vue').Ref<boolean>} */
  const isLoading = ref(false);

  // Load cart from local storage on initialization
  const initializeCart = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          cartItems.value = parsed.filter(item => item.slug && item.type);
        }
      }
    } catch (err) {
      console.error('Failed to load cart from local storage:', err);
    }
  };

  // Save cart to local storage
  const saveCart = () => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems.value));
    } catch (err) {
      console.error('Failed to save cart to local storage:', err);
    }
  };

  const fetchCartItems = async () => {
    if (isLoading.value) return;
    isLoading.value = true;

    try {
      if (!cartItems.value.length) {
        cartItems.value = [];
        saveCart();
        return;
      }

      const items = await Promise.all(
        cartItems.value.map(async (item) => {
          const endpoint = item.type === 'course' ? `/course/courses/${item.slug}/` : `/events/${item.slug}/`;
          try {
            const response = await api.get(endpoint);
            const data = response.data;
            if (!data.slug || !data.title) {
              throw new Error('Invalid item data');
            }
            return {
              slug: data.slug,
              type: item.type,
              title: data.title,
              image: data.image || (item.type === 'course' ? '/default-course-image.jpg' : '/default-event-image.jpg'),
              category: item.type === 'course' && data.tags?.length > 0 ? data.tags[0].tag : 'general',
              final_price: Number(data.final_price) || 0,
              price: Number(data.price) || Number(data.final_price) || 0,
            };
          } catch (err) {
            console.error(`Failed to load ${item.type} ${item.slug}:`, err);
            $toast.error(`Failed to load ${item.type} "${item.title || item.slug}".`);
            return null;
          }
        })
      );

      cartItems.value = items.filter((item) => item !== null);
      saveCart();

      if (!cartItems.value.length) {
        $toast.info('Your cart is empty or contains invalid items.');
      }
    } catch (err) {
      console.error('Failed to fetch cart items:', err);
      $toast.error('Failed to load cart items. Please try again.');
      cartItems.value = [];
      saveCart();
    } finally {
      isLoading.value = false;
    }
  };

  /** @param {CartItem} item */
  const addToCart = (item) => {
    if (!item.slug || !item.type || !item.title) {
      $toast.error('Invalid item. Cannot add to cart.');
      return;
    }

    if (!cartItems.value.some((i) => i.slug === item.slug && i.type === item.type)) {
      cartItems.value.push({
        ...item,
        final_price: Number(item.final_price) || 0,
        price: Number(item.price) || Number(item.final_price) || 0,
        image: item.image || (item.type === 'course' ? '/default-course-image.jpg' : '/default-event-image.jpg'),
        category: item.category || 'general',
      });
      saveCart();
      $toast.success(`${item.type === 'course' ? 'Course' : 'Event'} "${item.title}" added to cart.`);
    } else {
      $toast.info(`${item.type === 'course' ? 'Course' : 'Event'} "${item.title}" is already in cart.`);
    }
  };

  /** @param {string} slug @param {'course' | 'event'} type */
  const removeFromCart = (slug, type) => {
    const index = cartItems.value.findIndex((i) => i.slug === slug && i.type === type);
    if (index !== -1) {
      const item = cartItems.value[index];
      cartItems.value.splice(index, 1);
      saveCart();
      $toast.info(`${type === 'course' ? 'Course' : 'Event'} "${item.title || slug}" removed from cart.`);
    }
  };

  const clearCart = () => {
    cartItems.value = [];
    saveCart();
    $toast.info('Cart cleared.');
  };

  // Initialize cart on store creation
  initializeCart();

  return {
    cartItems,
    isLoading,
    fetchCartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };
});