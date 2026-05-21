import { defineStore } from 'pinia';
import { ref } from 'vue';
import courseService, { normalizeCourse } from '@/services/courseService';
import { api } from '@/services/authService';
import { useToast } from 'vue-toast-notification';

export const useCartStore = defineStore('cart', () => {
  const $toast = useToast();
  const cartItems = ref([]);
  const isLoading = ref(false);

  const initializeCart = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          cartItems.value = parsed.filter((item) => item.slug && item.type);
        }
      }
    } catch {
      cartItems.value = [];
    }
  };

  const saveCart = () => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems.value));
    } catch {
      /* ignore storage errors */
    }
  };

  const fetchCartItems = async () => {
    if (isLoading.value || !cartItems.value.length) return;
    isLoading.value = true;

    try {
      const items = await Promise.all(
        cartItems.value.map(async (item) => {
          try {
            if (item.type === 'course') {
              const course = await courseService.fetchCourse(item.slug);
              return {
                slug: course.slug,
                type: 'course',
                title: course.title,
                image: course.image,
                category: course.category,
                final_price: Number(course.final_price) || 0,
                price: Number(course.final_price) || 0,
              };
            }
            const response = await api.get(`coaching/events/${item.slug}/`);
            const data = response.data;
            return {
              slug: data.slug,
              type: 'event',
              title: data.title,
              image: data.cover || data.image || '/default-event-image.jpg',
              category: 'event',
              final_price: Number(data.final_price) || 0,
              price: Number(data.final_price) || 0,
            };
          } catch {
            $toast.error(`Failed to load ${item.type} "${item.title || item.slug}".`);
            return null;
          }
        })
      );

      cartItems.value = items.filter(Boolean);
      saveCart();
    } finally {
      isLoading.value = false;
    }
  };

  const addToCart = (item) => {
    if (!item.slug || !item.type || !item.title) {
      $toast.error('Invalid item. Cannot add to cart.');
      return;
    }

    if (!cartItems.value.some((i) => i.slug === item.slug && i.type === item.type)) {
      const normalized = item.type === 'course' ? normalizeCourse(item) : item;
      cartItems.value.push({
        slug: normalized.slug || item.slug,
        type: item.type,
        title: normalized.title || item.title,
        image: normalized.image || item.image || '/default-course-image.jpg',
        category: normalized.category || item.category || 'general',
        final_price: Number(normalized.final_price ?? item.final_price) || 0,
        price: Number(normalized.price ?? item.price ?? normalized.final_price) || 0,
      });
      saveCart();
      $toast.success(`Added to cart: ${item.title}`);
    } else {
      $toast.info('Already in your cart.');
    }
  };

  const removeFromCart = (slug, type) => {
    const index = cartItems.value.findIndex((i) => i.slug === slug && i.type === type);
    if (index !== -1) {
      const removed = cartItems.value[index];
      cartItems.value.splice(index, 1);
      saveCart();
      $toast.info(`"${removed.title}" removed from cart.`);
    }
  };

  const clearCart = () => {
    cartItems.value = [];
    saveCart();
  };

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
