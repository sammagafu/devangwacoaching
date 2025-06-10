<template>
  <b-col lg="6" xxl="4">
    <b-card no-body class="shadow h-100">
      <b-card-header class="border-bottom p-4">
        <h5 class="card-header-title">Event Notices</h5>
      </b-card-header>
      <b-card-body class="p-4">
        <OverlayScrollbarsComponent defer class="custom-scrollbar h-300px">
          <template v-for="(item, idx) in events" :key="item.id">
            <hr v-if="idx">
            <div class="d-flex justify-content-between position-relative">
              <div class="d-sm-flex">
                <div
                  :class="`icon-lg bg-${item.icon_color} bg-opacity-10 text-${item.icon_color} rounded-2 flex-shrink-0`">
                  <font-awesome-icon :icon="['fas', item.icon]" class="fs-5" />
                </div>
                <div class="ms-0 ms-sm-3 mt-2 mt-sm-0">
                  <h6 class="mb-0"><a href="#" class="stretched-link">{{ item.title }}</a></h6>
                  <p class="mb-0">{{ item.description }}</p>
                  <span class="small">{{ formatDate(item.time) }}</span>
                </div>
              </div>
            </div>
          </template>
          <div v-if="!events.length" class="text-center">No event notices available</div>
        </OverlayScrollbarsComponent>
      </b-card-body>
      <b-card-footer class="border-top">
        <div class="alert alert-success d-flex align-items-center mb-0 py-2">
          <div>
            <small class="mb-0">{{ events.length }} events listed</small>
          </div>
          <div class="ms-auto">
            <a class="btn btn-sm btn-success-soft mb-0" href="#!">View all</a>
          </div>
        </div>
      </b-card-footer>
    </b-card>
  </b-col>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import { api } from '@/services/authService';
import { useToast } from 'vue-toast-notification';

const toast = useToast();
const events = ref([]);

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
};

onMounted(async () => {
  try {
    const response = await api.get('dashboard/event-stats/');
    events.value = response.data;
  } catch (error) {
    console.error('Error fetching event stats:', error);
    toast.error('Failed to load event notices');
  }
});
</script>