<!-- src/components/PaymentForm.vue -->
<template>
  <div>
    <div v-if="loading" class="text-center py-3">
      <b-spinner variant="primary" />
    </div>
    <div v-else-if="error" class="text-danger text-center py-3">
      {{ error }}
    </div>
    <div v-else-if="paymentInitiated">
      <p class="text-info mb-3">{{ instructions }}</p>
      <b-button variant="primary" @click="emit('confirm')" :disabled="confirming">
        {{ confirming ? 'Confirming...' : 'Confirm Payment' }}
      </b-button>
    </div>
    <b-form v-else @submit.prevent="initiatePayment" class="border p-4 rounded-3 bg-light">
      <b-form-group label="Payment Method" label-for="payment-method" class="mb-3">
        <b-form-select
          id="payment-method"
          v-model="paymentMethod"
          :options="paymentMethodOptions"
          required
        />
      </b-form-group>
      <b-form-group
        v-if="paymentMethod !== 'card'"
        label="Phone Number"
        label-for="phone-number"
        class="mb-3"
        description="Enter your mobile number (e.g., +254712345678)"
      >
        <b-form-input
          id="phone-number"
          v-model="phoneNumber"
          type="tel"
          placeholder="e.g., +254712345678"
          required
          :state="phoneNumberState"
          pattern="^\+254\d{9}$"
        />
        <b-form-invalid-feedback>
          Please enter a valid Kenyan phone number (e.g., +254712345678).
        </b-form-invalid-feedback>
      </b-form-group>
      <div v-else>
        <b-form-group
          label="Card Number"
          label-for="card-number"
          class="mb-3"
          description="Enter your card number (e.g., 1234 5678 9012 3456)"
        >
          <b-form-input
            id="card-number"
            v-model="cardNumber"
            type="text"
            placeholder="xxxx xxxx xxxx xxxx"
            required
            :state="cardNumberState"
            pattern="^\d{16}$"
          />
          <b-form-invalid-feedback>
            Please enter a valid 16-digit card number.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-row>
          <b-col md="6">
            <b-form-group label="Expiration Date" label-for="exp-date" class="mb-3">
              <b-form-input
                id="exp-date"
                v-model="expDate"
                type="text"
                placeholder="MM/YYYY"
                required
                :state="expDateState"
                pattern="^(0[1-9]|1[0-2])\/\d{4}$"
              />
              <b-form-invalid-feedback>
                Please enter a valid expiration date (MM/YYYY).
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="CVV" label-for="cvv" class="mb-3">
              <b-form-input
                id="cvv"
                v-model="cvv"
                type="text"
                placeholder="xxx"
                required
                :state="cvvState"
                pattern="^\d{3}$"
              />
              <b-form-invalid-feedback>
                Please enter a valid 3-digit CVV.
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <b-button
        type="submit"
        variant="success"
        :disabled="initiating || !formValid || !hasPaidItems"
        class="w-100"
      >
        {{ initiating ? 'Initiating...' : 'Initiate Payment' }}
      </b-button>
    </b-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useToast } from 'vue-toast-notification';
import { api } from '@/services/authService';
import { currency } from '@/helpers/constants';

defineProps({
  cartItems: {
    type: Array,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['success', 'error', 'initiate', 'confirm']);

const paymentMethod = ref('mpesa');
const phoneNumber = ref('');
const cardNumber = ref('');
const expDate = ref('');
const cvv = ref('');
const loading = ref(false);
const initiating = ref(false);
const confirming = ref(false);
const error = ref<string | null>(null);
const paymentInitiated = ref(false);
const orderTrackingIds = ref({});
const instructions = ref('');
const $toast = useToast();

const paymentMethodOptions = [
  { value: 'mpesa', text: 'M-Pesa' },
  { value: 'vodacom', text: 'Vodacom' },
  { value: 'airtel', text: 'Airtel' },
  { value: 'mtn', text: 'MTN' },
  { value: 'card', text: 'Credit/Debit Card' },
];

const hasPaidItems = computed(() => cartItems.some((item) => item.final_price > 0));

const phoneNumberState = computed(() => {
  if (!phoneNumber.value || paymentMethod.value === 'card') return null;
  return /^\+254\d{9}$/.test(phoneNumber.value);
});

const cardNumberState = computed(() => {
  if (!cardNumber.value || paymentMethod.value !== 'card') return null;
  return /^\d{16}$/.test(cardNumber.value);
});

const expDateState = computed(() => {
  if (!expDate.value || paymentMethod.value !== 'card') return null;
  return /^(0[1-9]|1[0-2])\/\d{4}$/.test(expDate.value);
});

const cvvState = computed(() => {
  if (!cvv.value || paymentMethod.value !== 'card') return null;
  return /^\d{3}$/.test(cvv.value);
});

const formValid = computed(() => {
  if (!hasPaidItems.value) return true;
  if (paymentMethod.value === 'card') {
    return cardNumberState.value && expDateState.value && cvvState.value;
  }
  return phoneNumberState.value;
});

const initiatePayment = async () => {
  if (!formValid.value) {
    error.value = 'Please fill in all required fields correctly.';
    $toast.error(error.value);
    return;
  }

  if (!hasPaidItems.value) {
    emit('initiate', { orderTrackingIds: {} });
    return;
  }

  initiating.value = true;
  error.value = null;

  try {
    const trackingIds = {};
    for (const item of cartItems) {
      if (item.final_price <= 0) continue;
      const endpoint = item.type === 'course' ? `/course/courses/${item.slug}/enroll/` : `/events/${item.slug}/attend/`;
      const payload = {
        payment_method: paymentMethod.value,
        ...(paymentMethod.value === 'card' ? { card_number: cardNumber.value } : { phone_number: phoneNumber.value }),
      };
      const response = await api.post(endpoint, payload);
      trackingIds[`${item.type}-${item.slug}`] = response.data.order_tracking_id;
    }
    orderTrackingIds.value = trackingIds;
    instructions.value = `Please confirm the ${paymentMethod.value} payment to complete checkout.`;
    paymentInitiated.value = true;
    $toast.info('Payment initiated. Please confirm to complete checkout.');
    emit('initiate', { orderTrackingIds: trackingIds });
  } catch (err) {
    error.value = err.response?.data?.detail || 'Failed to initiate payment. Please try again.';
    $toast.error(error.value);
    emit('error', error.value);
  } finally {
    initiating.value = false;
  }
};

const confirmPayment = async () => {
  confirming.value = true;
  error.value = null;

  try {
    for (const item of cartItems) {
      if (item.final_price <= 0) continue;
      const endpoint = item.type === 'course' ? `/course/courses/${item.slug}/enroll/` : `/events/${item.slug}/attend/`;
      const orderTrackingId = orderTrackingIds.value[`${item.type}-${item.slug}`];
      if (!orderTrackingId) throw new Error(`Missing order tracking ID for ${item.title}`);
      await api.post(endpoint, { order_tracking_id: orderTrackingId });
    }
    emit('success');
  } catch (err) {
    error.value = err.response?.data?.detail || 'Payment confirmation failed. Please try again.';
    $toast.error(error.value);
    emit('error', error.value);
  } finally {
    confirming.value = false;
  }
};
</script>

<style scoped>
.bg-light {
  background-color: #f8f9fa !important;
}
.btn-success {
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
}
</style>