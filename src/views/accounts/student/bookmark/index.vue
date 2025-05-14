<!-- src/views/accounts/student/bookmark/Index.vue -->
<template>
  <StudentLayout>
    <b-col xl="9">
      <b-card no-body class="bg-transparent border rounded-3">
        <b-card-header class="bg-transparent border-bottom">
          <h3 class="mb-0">Courses</h3>
        </b-card-header>
        <b-card-body class="p-3 p-md-4">
          <b-row class="g-4">
            <b-col sm="6" lg="6" v-for="(item, idx) in coursesList" :key="item.id">
              <WishlistCard :item="item" />
            </b-col>
          </b-row>
          <div v-if="loading" class="text-center my-3">Loading courses...</div>
        </b-card-body>
      </b-card>
    </b-col>
  </StudentLayout>
</template>

<script setup>
import StudentLayout from '@/layouts/StudentLayout.vue';
import WishlistCard from '@/views/accounts/student/bookmark/components/WishlistCard.vue';
import { ref, onMounted } from 'vue';
import { api } from '@/services/authService';
import { useToast } from 'vue-toast-notification';

const $toast = useToast();

const coursesList = ref([]);
const loading = ref(false);

const fetchCourses = async () => {
  try {
    loading.value = true;
    const response = await api.get('course/courses/');
    coursesList.value = response.data;
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    $toast.error('Failed to fetch courses');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCourses);
</script>
