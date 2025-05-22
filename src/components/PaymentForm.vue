<!-- src/components/PaymentForm.vue -->
<template>
  <b-form class="border p-4 rounded-3 bg-light" @submit.prevent="handleSubmit">
    <h6 class="mb-3">Payment Information</h6>
    <b-form-group label="Payment Method" class="mb-3">
      <b-form-select v-model="paymentMethod" :options="paymentOptions"></b-form-select>
    </b-form-group>
    <b-form-group v-if="paymentMethod !== 'card'" label="Phone Number" class="mb-3">
      <b-form-input v-model="phoneNumber" placeholder="e.g., +254123456789"></b-form-input>
    </b-form-group>
    <b-form-group v-if="paymentMethod === 'card'" label="Card Number" class="mb-3">
      <b-form-input v-model="cardNumber" placeholder="e.g., 1234 5678 9012 3456"></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary" :disabled="isProcessing || !cartStore.cartItems.length">
      {{ isProcessing ? 'Processing...' : 'Checkout' }}
    </b-button>
  </b-form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useToast } from 'vue-toast-notification';
import { api } from '@/services/authService';
import { useCartStore } from '@/stores/cart';

const emit = defineEmits(['success', 'error', 'confirm']);

const $toast = useToast();
const cartStore = useCartStore();
const paymentMethod = ref('mpesa');
const phoneNumber = ref('');
const cardNumber = ref('');
const isProcessing = ref(false);

const paymentOptions = [
  { value: 'mpesa', text: 'M-Pesa' },
  { value: 'vodacom', text: 'Vodacom' },
  { value: 'airtel', text: 'Airtel' },
  { value: 'mtn', text: 'MTN' },
  { value: 'card', text: 'Card' },
];

const totalAmount = computed(() => cartStore.cartItems.reduce((sum, item) => sum + (item.final_price || 0), 0));

const handleSubmit = async () => {
  if (isProcessing.value) return;
  isProcessing.value = true;

  try {
    if (!cartStore.cartItems.length) {
      throw new Error('Cart is empty');
    }

    if (totalAmount.value === 0) {
      // Free courses: Skip payment and emit confirm
      emit('confirm', {});
      $toast.success('Proceeding to enroll free courses');
      return;
    }

    // Paid courses: Validate payment details
    if (paymentMethod.value !== 'card' && !phoneNumber.value) {
      throw new Error('Phone number is required for mobile payments');
    }
    if (paymentMethod.value === 'card' && !cardNumber.value) {
      throw new Error('Card number is required for card payments');
    }

    const orderTrackingIds = {};
    for (const item of cartStore.cartItems) {
      if (item.final_price <= 0) continue;
      const response = await api.post(`/course/courses/${item.slug}/enroll/`, {
        payment_method: paymentMethod.value,
        phone_number: phoneNumber.value || undefined,
        card_number: cardNumber.value || undefined,
      });
      orderTrackingIds[`${item.type}-${item.slug}`] = response.data.order_tracking_id;
    }

    emit('confirm', { orderTrackingIds });
    $toast.success('Payment initiated! Completing checkout.');
  } catch (err) {
    const errorMessage = err.response?.data?.detail || err.message || 'Checkout failed. Please try again.';
    emit('error', errorMessage);
    $toast.error(errorMessage);
  } finally {
    isProcessing.value = false;
  }
};
</script>