<template>
  <b-col xxl="4">
    <b-card no-body class="shadow h-100">
      <b-card-header class="border-bottom d-flex justify-content-between align-items-center p-4">
        <h5 class="card-header-title">Support Requests</h5>
        <a href="#" class="btn btn-link p-0 mb-0">View all</a>
      </b-card-header>
      <b-card-body class="p-4">
        <div v-for="(item, index) in requests" :key="item.id" class="d-flex justify-content-between position-relative">
          <div class="d-sm-flex">
            <div class="avatar avatar-md flex-shrink-0">
              <img v-if="item.image" class="avatar-img rounded-circle" :src="item.image" alt="avatar">
              <div v-else :class="`avatar-img rounded-circle bg-${item.icon_color || 'secondary'} bg-opacity-10`">
                <span :class="`text-${item.icon_color || 'secondary'} position-absolute top-50 start-50 translate-middle fw-bold`">{{ getInitials(item.name) }}</span>
              </div>
            </div>
            <div class="ms-0 ms-sm-2 mt-2 mt-sm-0">
              <h6 class="mb-0"><a href="#" class="stretched-link">{{ item.name }}</a></h6>
              <p class="mb-0" v-html="item.description"></p>
              <span class="small">{{ formatDate(item.time) }}</span>
            </div>
          </div>
        </div>
        <hr v-if="index < requests.length - 1" v-for="(item, index) in requests" :key="`hr-${item.id}`">
        <div v-if="!requests.length" class="text-center">No support requests available</div>
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/authService';
import { useToast } from 'vue-toast-notification';

const toast = useToast();
const requests = ref([]);

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
};

const getInitials = (name) => {
  const parts = name.split(' ');
  return parts.map(p => p[0]).join('').toUpperCase().slice(0, 2);
};

onMounted(async () => {
  try {
    const response = await api.get('dashboard/stats/');
    requests.value = response.data.support_requests || [];
  } catch (error) {
    console.error('Error fetching support requests:', error);
    toast.error('Failed to load support requests');
  }
});
</script>