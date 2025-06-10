<template>
  <b-row class="g-4 mb-4">
    <b-col md="6" xxl="3">
      <b-card no-body class="card-body bg-warning bg-opacity-15 p-4 h-100">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span class="purecounter mb-0 fw-bold h2">{{ stats.completed_courses }}</span><br />
            <span class="mb-0 h6 fw-light">Completed Courses</span>
          </div>
          <div class="icon-lg rounded-circle bg-warning text-white mb-0">
            <BIconBookmarkCheck class="fa-fw" />
          </div>
        </div>
      </b-card>
    </b-col>

    <b-col md="6" xxl="3">
      <b-card no-body class="card-body bg-purple bg-opacity-10 p-4 h-100">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span class="purecounter mb-0 fw-bold h2">{{ stats.enrolled_users }}</span><br />
            <span class="mb-0 h6 fw-light">Enrolled Users</span>
          </div>
          <div class="icon-lg rounded-circle bg-purple text-white mb-0">
            <BIconPeople class="fa-fw" />
          </div>
        </div>
      </b-card>
    </b-col>

    <b-col md="6" xxl="3">
      <b-card no-body class="card-body bg-primary bg-opacity-10 p-4 h-100">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span class="purecounter mb-0 fw-bold h2">{{ stats.courses_in_progress }}</span><br />
            <span class="mb-0 h6 fw-light">Courses In Progress</span>
          </div>
          <div class="icon-lg rounded-circle bg-primary text-white mb-0">
            <BIconTv class="fa-fw" />
          </div>
        </div>
      </b-card>
    </b-col>

    <b-col md="6" xxl="3">
      <b-card no-body class="card-body bg-success bg-opacity-10 p-4 h-100">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span class="purecounter mb-0 fw-bold h2">{{ stats.active_users }}</span><br />
            <span class="mb-0 h6 fw-light">Active Users</span>
          </div>
          <div class="icon-lg rounded-circle bg-success text-white mb-0 flex-centered">
            <BIconPersonCheck class="fa-fw" />
          </div>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/authService';
import { useToast } from 'vue-toast-notification';
import { BIconPersonCheck,BIconPeople,BIconTv,BIconBookmarkCheck } from 'bootstrap-icons-vue';

const toast = useToast();
const stats = ref({
  completed_courses: 0,
  enrolled_users: 0,
  courses_in_progress: 0,
  active_users: 0
});

onMounted(async () => {
  try {
    const response = await api.get('dashboard/stats/');
    stats.value = response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    toast.error('Failed to load stats');
  }
});
</script>