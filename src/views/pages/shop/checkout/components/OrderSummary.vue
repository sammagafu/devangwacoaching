<!-- src/views/pages/shop/checkout/components/OrderSummary.vue -->
<template>
  <b-col xl="4">
    <b-row class="mb-0">
      <b-col md="6" xl="12">
        <b-card no-body class="card-body shadow p-4 mb-4">
          <h4 class="mb-4">Order Summary</h4>
          <div class="mb-3">
            <div class="input-group">
              <b-form-input v-model="couponCode" placeholder="COUPON CODE" />
              <b-button type="button" variant="primary" @click="applyCoupon" :disabled="applyingCoupon">
                {{ applyingCoupon ? 'Applying...' : 'Apply' }}
              </b-button>
            </div>
            <b-form-text v-if="couponError" class="text-danger">{{ couponError }}</b-form-text>
            <b-form-text v-if="couponApplied" class="text-success">Coupon applied! Discount: {{ currency }}{{ couponDiscount }}</b-form-text>
          </div>
          <hr>
          <div v-if="cartItems.length === 0" class="text-center">
            <p class="text-muted">Your cart is empty.</p>
          </div>
          <template v-else>
            <b-row v-for="(item, index) in cartItems" :key="`${item.type}-${item.slug}`" class="g-3 mb-3">
              <b-col sm="4">
                <img class="rounded" :src="item.image || defaultImage" alt="item image">
              </b-col>
              <b-col sm="8">
                <h6 class="mb-0">
                  <router-link :to="{ name: item.type === 'course' ? 'CourseDetail' : 'EventDetail', params: { slug: item.slug }}">{{ item.title }}</router-link>
                </h6>
                <div class="d-flex justify-content-between align-items-center mt-3">
                  <span class="text-success">{{ currency }}{{ item.final_price }}</span>
                  <div class="text-primary-hover">
                    <a href="#" class="text-body me-2" @click.prevent="removeItem(item.slug, item.type)">
                      <BIconTrash class="me-1 mb-1" />Remove
                    </a>
                  </div>
                </b-col>
              </b-row>
            </template>
            <hr v-if="cartItems.length > 0">
            <ul class="list-group list-group-borderless mb-2" v-if="cartItems.length > 0">
              <li class="list-group-item px-0 d-flex justify-content-between">
                <span class="h6 fw-light mb-0">Original Price</span>
                <span class="h6 fw-light mb-0 fw-bold">{{ currency }}{{ originalPrice }}</span>
              </li>
              <li class="list-group-item px-0 d-flex justify-content-between">
                <span class="h6 fw-light mb-0">Discount</span>
                <span class="text-danger">-{{ currency }}{{ discount }}</span>
              </li>
              <li class="list-group-item px-0 d-flex justify-content-between">
                <span class="h5 mb-0">Total</span>
                <span class="h5 mb-0">{{ currency }}{{ totalPrice }}</span>
              </li>
            </ul>
            <div class="d-grid">
              <b-button
                variant="success"
                class="btn-lg"
                :disabled="isProcessing || !cartItems.length"
                @click="placeOrder"
              >
                {{ isProcessing ? 'Processing...' : isFree ? 'Checkout for Free' : 'Place Order' }}
              </b-button>
            </div>
            <p class="small mb-0 mt-2 text-center">
              By completing your purchase, you agree to these
              <router-link to="/terms" class="text-primary"><strong>Terms of Service</strong></router-link>
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useToast } from 'vue-toast-notification';
import { BIconTrash } from 'bootstrap-icons-vue';
import { currency } from '@/helpers/constants';
import { useCartStore } from '@/stores/cart';
import avatar01 from '@/assets/images/avatar/01.jpg';

defineProps({
  cartItems: {
    type: Array,
    required: true,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['place-order']);
const $toast = useToast();
const cartStore = useCartStore();
const couponCode = ref('');
const couponError = ref('');
const couponApplied = ref(false);
const couponDiscount = ref(0);
const applyingCoupon = ref(false);
const isProcessing = ref(false);
const defaultImage = avatar01;

const originalPrice = computed(() => {
  return cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
});

const totalPrice = computed(() => {
  return cartItems.reduce((sum, item) => sum + (item.final_price || 0), 0) - couponDiscount.value;
});

const discount = computed(() => {
  return originalPrice.value - totalPrice.value + couponDiscount.value;
});

const applyCoupon = async () => {
  applyingCoupon.value = true;
  couponError.value = '';
  try {
    if (couponCode.value === 'DISCOUNT20') {
      couponDiscount.value = totalPrice.value * 0.2;
      couponApplied.value = true;
      $toast.success('Coupon applied successfully!');
    } else {
      throw new Error('Invalid coupon code');
    }
  } catch (err) {
    couponError.value = err.message || 'Failed to apply coupon.';
    $toast.error(couponError.value);
  } finally {
    applyingCoupon.value = false;
  }
};

const removeItem = (slug, type) => {
  cartStore.removeFromCart(slug, type);
};

const placeOrder = () => {
  if (isProcessing.value) return;
  emit('place-order', { orderTrackingIds: orderTrackingIds.value });
};
</script>