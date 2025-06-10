<template>
  <b-col xxl="8">
    <b-card no-body class="shadow h-100">
      <b-card-header class="p-4 border-bottom">
        <h5 class="card-header-title">Earnings</h5>
      </b-card-header>
      <b-card-body>
        <ApexChart :chart="chartData" class="apex-charts" id="ChartPayout" v-if="chartData" />
        <div v-else class="text-center">Loading earnings...</div>
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/authService';
import { useToast } from 'vue-toast-notification';

const toast = useToast();
const chartData = ref(null);

onMounted(async () => {
  try {
    const response = await api.get('/dashboard/payments/earnings/chart/');
    chartData.value = {
      type: 'line',
      height: 300,
      series: response.data.series,
      options: {
        chart: { toolbar: { show: false } },
        xaxis: { categories: response.data.categories },
        stroke: { curve: 'smooth' },
        dataLabels: { enabled: false },
        colors: ['#0d6efd']
      }
    };
  } catch (error) {
    console.error('Error fetching earnings:', error);
    toast.error('Failed to load earnings chart');
  }
});
</script>