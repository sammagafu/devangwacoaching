<template>
  <section class="pt-5">
    <b-container>
      <b-row class="g-4 g-sm-5">
        <b-col xl="8" class="mb-4 mb-sm-0">
          <div
            class="alert alert-danger alert-dismissible d-flex justify-content-between align-items-center fade show py-2 pe-2"
            role="alert"
            v-if="!authStore.isAuthenticated"
          >
            <div>
              <BIconExclamationOctagonFill class="me-2" />
              Already have an account? <router-link to="/auth/sign-in" class="text-reset btn-link mb-0 fw-bold">Log in</router-link>
            </div>
            <button type="button" class="btn btn-link mb-0 text-primary-hover text-end" data-bs-dismiss="alert" aria-label="Close">
              <BIconXLg />
            </button>
          </div>
          <b-card no-body class="card-body shadow p-4">
            <h5 class="mb-4">Checkout Details</h5>
            <PaymentForm
              :cart-items="cartStore.cartItems"
              :total-amount="totalAmount"
              @success="handleCheckoutSuccess"
              @error="handleCheckoutError"
              @confirm="handleCheckout"
            />
          </b-card>
        </b-col>
        <OrderSummary />
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { api } from '@/services/authService';
import PaymentForm from '@/components/PaymentForm.vue';
import OrderSummary from '@/views/pages/shop/checkout/components/OrderSummary.vue';
import { BIconExclamationOctagonFill, BIconXLg } from 'bootstrap-icons-vue';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';

const emit = defineEmits(['clear-cart']);

const router = useRouter();
const $toast = useToast();
const cartStore = useCartStore();
const authStore = useAuthStore();
const isProcessing = ref(false);

const isFree = computed(() => cartStore.cartItems.every((item) => item.final_price <= 0));
const totalAmount = computed(() => cartStore.cartItems.reduce((sum, item) => sum + (item.final_price || 0), 0));

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
      const courseResponse = await api.get('/courses/enrolled/');
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

onMounted(async () => {
  console.log('Checking initial cart items:', cartStore.cartItems);
  if (!Array.isArray(cartStore.cartItems) || !cartStore.cartItems.length) {
    console.log('Cart is empty or invalid, skipping check');
    return;
  }
  const isValid = await checkEnrollmentStatus(cartStore.cartItems);
  if (!isValid) {
    emit('clear-cart');
  }
});

watch(
  () => cartStore.cartItems,
  async (newCartItems) => {
    console.log('Cart items changed:', newCartItems);
    if (!Array.isArray(newCartItems) || !newCartItems.length) {
      console.log('Cart is empty or invalid, skipping check');
      return;
    }
    const isValid = await checkEnrollmentStatus(newCartItems);
    if (!isValid) {
      emit('clear-cart');
    }
  }
);

const handleCheckoutSuccess = () => {
  cartStore.clearCart();
  $toast.success('Checkout successful!');
  router.push({ name: 'student.dashboard' });
};

const handleCheckoutError = (error) => {
  $toast.error(error);
};

const handleCheckout = async (paymentData) => {
  if (isProcessing.value) return;
  isProcessing.value = true;

  try {
    for (const item of cartStore.cartItems) {
      const endpoint = item.type === 'course' ? `/courses/${item.slug}/enroll/` : `/events/${item.slug}/attend/`;
      const requestData = item.final_price <= 0 ? {} : {
        payment_method: paymentData.payment_method,
        phone_number: paymentData.phone_number,
        card_number: paymentData.card_number
      };

      if (item.final_price > 0 && !requestData.payment_method) {
        throw new Error(`Missing payment method for ${item.title}`);
      }

      await api.post(endpoint, requestData);
    }
    handleCheckoutSuccess();
  } catch (err) {
    console.error('Checkout error:', err);
    handleCheckoutError(err.response?.data?.detail || 'Checkout failed. Please try again.');
  } finally {
    isProcessing.value = false;
  }
};
</script>