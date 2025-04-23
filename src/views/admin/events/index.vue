<template>
  <AdminLayout>
    <b-row class="mb-3">
      <b-col cols="12" class="d-sm-flex justify-content-between align-items-center">
        <h1 class="h3 mb-2 mb-sm-0">Events</h1>
        <b-button variant="primary" class="btn-sm mb-0" @click="navigateTo()">Create Event</b-button>
      </b-col>
    </b-row>
    <List ref="listComponent" />
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import List from '@/views/admin/events/components/List.vue';
import { useRouter } from 'vue-router';
const listComponent = ref(null);

const router = useRouter();
const navigateTo = () => {
  router.push({ name: 'admin.manage.event-create' });
};
</script>