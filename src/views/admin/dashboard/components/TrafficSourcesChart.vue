<template>
  <b-col lg="6" xxl="4">
    <b-card no-body class="shadow h-100">
      <b-card-header class="border-bottom d-flex justify-content-between align-items-center p-4">
        <h5 class="card-header-title">Traffic Sources</h5>
        <a href="#" class="btn btn-link p-0 mb-0">View all</a>
      </b-card-header>
      <b-card-body class="p-4">
        <b-col sm="6" class="mx-auto">
          <ApexChart :chart="chartData" class="apex-charts" id="ChartTrafficViews" v-if="chartData" />
          <div v-else class="text-center">Loading traffic data...</div>
        </b-col>
        <ul class="list-group list-group-borderless mt-3">
          <li v-for="(label, idx) in chartData?.options.labels" :key="idx" class="list-group-item">
            <font-awesome-icon :icon="faCircle" :style="{ color: chartData?.options.colors[idx] }" class="me-1" />
            {{ label }}
          </li>
        </ul>
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { api } from '@/services/authService';
import { useToast } from 'vue-toast-notification';

const toast = useToast();
const chartData = ref(null);

onMounted(async () => {
  try {
    const response = await api.get('dashboard/traffic-sources/');
    chartData.value = {
      type: 'donut',
      height: 200,
      series: response.data.series,
      options: {
        labels: response.data.labels,
        colors: response.data.colors,
        chart: { toolbar: { show: false } },
        legend: { show: false },
        dataLabels: { enabled: false }
      }
    };
  } catch (error) {
    console.error('Error fetching traffic sources:', error);
    toast.error('Failed to load traffic sources');
  }
});
</script>