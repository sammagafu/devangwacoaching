<template>
  <b-form class="border p-4 rounded-3 bg-light" @submit.prevent="handleSubmit">
    <h6 class="mb-3">Payment Information</h6>
    <b-form-group label="Payment Method" class="mb-3" v-if="showPaymentFields">
      <b-form-select v-model="paymentMethod" :options="paymentOptions" required></b-form-select>
    </b-form-group>
    <b-form-group v-if="showPhoneNumber" label="Phone Number" class="mb-3">
      <b-form-input v-model="phoneNumber" placeholder="e.g., +254123456789 or +255123456789" required></b-form-input>
    </b-form-group>
    <b-form-group v-if="paymentMethod === 'card'" label="Card Number" class="mb-3">
      <b-form-input v-model="cardNumber" placeholder="e.g., 1234567890123456" required></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary" :disabled="isProcessing || !cartStore.cartItems.length">
      {{ isProcessing ? 'Processing...' : 'Checkout' }}
    </b-button>
  </b-form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useToast } from 'vue-toast-notification';
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
const showPaymentFields = computed(() => cartStore.cartItems.some(item => item.final_price > 0));
const showPhoneNumber = computed(() => showPaymentFields.value && paymentMethod.value !== 'card');

const handleSubmit = async () => {
  if (isProcessing.value) return;
  isProcessing.value = true;

  try {
    if (!cartStore.cartItems.length) {
      throw new Error('Cart is empty');
    }

    if (totalAmount.value === 0) {
      // Free items: Emit empty confirm
      emit('confirm', {});
      $toast.success('Proceeding to enroll free items');
      return;
    }

    // Paid items: Validate payment details
    if (!paymentMethod.value) {
      throw new Error('Payment method is required');
    }
    if (paymentMethod.value !== 'card' && !phoneNumber.value) {
      throw new Error('Phone number is required for mobile payments');
    }
    if (paymentMethod.value === 'card' && !cardNumber.value) {
      throw new Error('Card number is required for card payments');
    }

    // Basic phone number format check (backend handles full validation)
    if (phoneNumber.value && !phoneNumber.value.match(/^\+\d{12}$/)) {
      throw new Error('Phone number should start with + followed by 12 digits (e.g., +254123456789)');
    }
    // Basic card number format check
    if (cardNumber.value && !cardNumber.value.match(/^\d{16}$/)) {
      throw new Error('Card number must be 16 digits');
    }

    emit('confirm', {
      payment_method: paymentMethod.value,
      phone_number: phoneNumber.value || undefined,
      card_number: cardNumber.value || undefined
    });
    $toast.success('Submitting payment details...');
  } catch (err) {
    const errorMessage = err.message || 'Payment form validation failed';
    emit('error', errorMessage);
    $toast.error(errorMessage);
  } finally {
    isProcessing.value = false;
  }
};
</script>