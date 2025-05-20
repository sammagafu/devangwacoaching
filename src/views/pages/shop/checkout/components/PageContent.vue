<!-- src/views/pages/shop/checkout/components/PageContent.vue -->
<template>
  <section class="pt-5">
    <b-container>
      <b-row class="g-4 g-sm-5">
        <b-col xl="8" class="mb-4 mb-sm-0">
          <div
            class="alert alert-danger alert-dismissible d-flex justify-content-between align-items-center fade show py-2 pe-2"
            role="alert"
            v-if="!isLoggedIn"
          >
            <div>
              <BIconExclamationOctagonFill class="me-2" />
              Already have an account? <router-link to="/login" class="text-reset btn-link mb-0 fw-bold">Log in</router-link>
            </div>
            <button type="button" class="btn btn-link mb-0 text-primary-hover text-end" data-bs-dismiss="alert" aria-label="Close">
              <BIconXLg />
            </button>
          </div>
          <b-card no-body class="card-body shadow p-4">
            <h5 class="mb-4">Checkout Details</h5>
            <PaymentForm
              :cart-items="cartItems"
              :total-amount="totalAmount"
              @success="handleCheckoutSuccess"
              @error="handleCheckoutError"
              @initiate="initiatePayment"
              @confirm="confirmPayment"
            />
          </b-card>
        </b-col>
        <OrderSummary :cart-items="cartItems" :is-free="isFree" @place-order="handlePlaceOrder" />
      </b-row>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { api } from '@/services/authService';
import PaymentForm from '@/components/PaymentForm.vue';
import OrderSummary from '@/views/pages/shop/checkout/components/OrderSummary.vue';
import { BIconExclamationOctagonFill, BIconXLg } from 'bootstrap-icons-vue';
import { useCartStore } from '@/stores/cart';

defineProps({
  cartItems: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(['clear-cart', 'place-order']);

const router = useRouter();
const $toast = useToast();
const cartStore = useCartStore();
const isLoggedIn = ref(false); // Replace with actual auth check
const isFree = computed(() => cartItems.every((item) => item.final_price <= 0));
const totalAmount = computed(() => cartItems.reduce((sum, item) => sum + (item.final_price || 0), 0));
const paymentInitiated = ref(false);
const orderTrackingIds = ref({});
const isProcessing = ref(false);

const checkEnrollmentStatus = async (items) => {
  try {
    console.log('Checking enrollment status for items:', items);
    if (!Array.isArray(items) || !items.length) {
      console.log('Empty or invalid cart items, skipping check');
      return true;
    }
    const courseSlugs = items.filter((item) => item.type === 'course').map((item) => item.slug);
    const eventSlugs = items.filter((item) => item.type === 'event').map((item) => item.slug);

    if (courseSlugs.length) {
      const courseResponse = await api.get('/course/courses/enrolled/');
      const enrolledCourses = courseResponse.data.map((enrollment) => enrollment.course?.slug).filter(Boolean);
      if (courseSlugs.some((slug) => enrolledCourses.includes(slug))) {
        $toast.error('One or more courses are already enrolled.');
        router.push('/courses');
        return false;
      }
    }

    if (eventSlugs.length) {
      const eventResponse = await api.get('/participants/');
      const registeredEvents = eventResponse.data.map((participant) => participant.event?.slug).filter(Boolean);
      if (eventSlugs.some((slug) => registeredEvents.includes(slug))) {
        $toast.error('One or more events are already registered.');
        router.push('/events');
        return false;
      }
    }
    return true;
  } catch (err) {
    console.error('Failed to check enrollment/registration status:', err);
    $toast.error('Failed to verify status. Please try again.');
    return false;
  }
};

watch(
  () => cartItems,
  async (newCartItems) => {
    console.log('Watching cartItems:', newCartItems);
    if (!Array.isArray(newCartItems) || !newCartItems.length) {
      console.log('Cart is empty or invalid, skipping enrollment check');
      return;
    }
    const isValid = await checkEnrollmentStatus(newCartItems);
    if (!isValid) {
      emit('clear-cart');
    }
  },
  { immediate: true }
);

const initiatePayment = (payload) => {
  paymentInitiated.value = true;
  orderTrackingIds.value = payload.orderTrackingIds;
};

const confirmPayment = () => {
  handlePlaceOrder({ orderTrackingIds: orderTrackingIds.value });
};

const handleCheckoutSuccess = () => {
  cartStore.clearCart();
  $toast.success('Checkout successful!');
  router.push('/dashboard');
};

const handleCheckoutError = (error) => {
  $toast.error(error);
};

const handlePlaceOrder = async (payload) => {
  if (isProcessing.value) return;
  isProcessing.value = true;

  try {
    if (isFree.value) {
      for (const item of cartItems) {
        const endpoint = item.type === 'course' ? `/course/courses/${item.slug}/enroll/` : `/events/${item.slug}/attend/`;
        await api.post(endpoint, {});
      }
      handleCheckoutSuccess();
    } else if (paymentInitiated.value && payload.orderTrackingIds) {
      for (const item of cartItems) {
        if (item.final_price <= 0) continue;
        const endpoint = item.type === 'course' ? `/course/courses/${item.slug}/enroll/` : `/events/${item.slug}/attend/`;
        const orderTrackingId = payload.orderTrackingIds[item.type + '-' + item.slug];
        if (!orderTrackingId) throw new Error(`Missing order tracking ID for ${item.title}`);
        await api.post(endpoint, { order_tracking_id: orderTrackingId });
      }
      handleCheckoutSuccess();
    } else {
      $toast.error('Please initiate payment first.');
    }
  } catch (err) {
    handleCheckoutError(err.response?.data?.detail || 'Checkout failed. Please try again.');
  } finally {
    isProcessing.value = false;
  }
};
</script>