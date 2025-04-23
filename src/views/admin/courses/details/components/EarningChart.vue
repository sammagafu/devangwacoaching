<template>
  <b-col md="6" xxl="12">
    <b-card no-body class="bg-transparent border overflow-hidden">
      <b-card-header class="bg-light border-bottom">
        <h5 class="card-header-title mb-0">New Enrollment This Month</h5>
      </b-card-header>
      <b-card-body class="p-0">
        <div class="d-sm-flex justify-content-between p-4">
          <h4 class="text-blue mb-0">{{ course.enrollment_count || '0' }}</h4>
          <p class="mb-0">
            <span :class="[course.enrollment_change >= 0 ? 'text-success' : 'text-danger', 'me-1']">
              {{ course.enrollment_change ? `${course.enrollment_change}%` : '0%' }}
              <BIconArrowUp v-if="course.enrollment_change >= 0" />
              <BIconArrowDown v-else />
            </span>vs last Week
          </p>
        </div>
        <ApexChart :chart="course.enrollment_data || defaultChartData" class="apex-charts" id="activeChartstudent2" />
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { BIconArrowUp, BIconArrowDown } from 'bootstrap-icons-vue';
import { newEnrollmentChart } from './data';

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
});

const defaultChartData = newEnrollmentChart;
</script>