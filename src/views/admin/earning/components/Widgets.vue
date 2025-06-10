<template>
  <b-row class="g-4 mb-4">
    <b-col sm="6" lg="4">
      <div class="p-4 bg-primary bg-opacity-10 rounded-3">
        <h6>Sales this month</h6>
        <h2 class="mb-0 fs-1 text-primary">{{ currency }}{{ formatNumber(earnings.sales_this_month) }}</h2>
      </div>
    </b-col>
    <b-col sm="6" lg="4">
      <div class="p-4 bg-purple bg-opacity-10 rounded-3">
        <h6>To be paid
          <a tabindex="0" class="h6 mb-0 icons-center" role="button" data-bs-toggle="popover" data-bs-trigger="focus"
            data-bs-placement="top" data-bs-content="After commission" data-bs-original-title=""
            title="">
            <BIconInfoCircleFill class="small" />
          </a>
        </h6>
        <h2 class="mb-0 fs-1 text-purple">{{ currency }}{{ formatNumber(earnings.to_be_paid) }}</h2>
      </div>
    </b-col>
    <b-col sm="6" lg="4">
      <div class="p-4 bg-orange bg-opacity-10 rounded-3">
        <h6>Lifetime Earnings</h6>
        <h2 class="mb-0 fs-1 text-orange">{{ currency }}{{ formatNumber(earnings.lifetime_earnings) }}</h2>
      </div>
    </b-col>
  </b-row>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { currency } from '@/helpers/constants';
import { BIconInfoCircleFill } from 'bootstrap-icons-vue';
import { api } from '@/services/authService';
import { useToast } from 'vue-toast-notification';

const $toast = useToast();
const earnings = ref({
  sales_this_month: 0,
  to_be_paid: 0,
  lifetime_earnings: 0
});

const formatNumber = (value) => {
  // Convert string or number to float and format to 2 decimal places
  return value != null ? parseFloat(value).toFixed(2) : '0.00';
};

onMounted(async () => {
  try {
    const response = await api.get('/payments/earnings/');
    earnings.value = {
      sales_this_month: response.data.sales_this_month,
      to_be_paid: response.data.to_be_paid,
      lifetime_earnings: response.data.lifetime_earnings
    };
  } catch (err) {
    $toast.error('Failed to load earnings data');
    console.error('Earnings fetch error:', err);
  }
});
</script>