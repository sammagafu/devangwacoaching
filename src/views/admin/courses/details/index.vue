<template>
  <AdminLayout>
  
      <b-row class="mb-3">
        <b-col cols="12" class="d-sm-flex justify-content-between align-items-center">
          <h1 class="h3 mb-2 mb-sm-0">Course Details</h1>
          <router-link v-if="course" :to="{ name: 'admin.course-list' }" class="btn btn-sm btn-primary mb-0">Back to courses</router-link>
        </b-col>
      </b-row>

      <b-row class="g-4">
        <div v-if="loading" class="text-center py-4">
          <b-spinner variant="primary" label="Loading"></b-spinner>
          <p class="text-muted mt-2">Loading course...</p>
        </div>
        <div v-else-if="!course" class="text-center py-4">
          <p class="text-muted">Course not found.</p>
          <router-link :to="{ name: 'admin.course-list' }" class="btn btn-primary">Back to Courses</router-link>
        </div>
        <template v-else>
          <CourseInfo :course="course" />
          <b-col xxl="6">
            <b-row class="g-4">
              <EarningChart :course="course" />
              <EnrollmentChart :course="course" />
            </b-row>
          </b-col>
          <Reviews :course="course" />
        </template>
      </b-row>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { api } from '@/services/authService';
import AdminLayout from '@/layouts/AdminLayout.vue';
import CourseInfo from './components/CourseInfo.vue';
import EarningChart from './components/EarningChart.vue';
import EnrollmentChart from './components/EnrollmentChart.vue';
import Reviews from './components/Reviews.vue';

const $toast = useToast();
const route = useRoute();
const router = useRouter();
const course = ref(null);
const loading = ref(true);

onMounted(async () => {
  await fetchCourse();
});

const fetchCourse = async () => {
  try {
    loading.value = true;
    const slug = route.params.slug;
    const response = await api.get(`course/courses/${slug}/`);
    course.value = response.data;
  } catch (error) {
    console.error('Failed to fetch course:', error);
    $toast.error('Failed to fetch course: ' + (error.response?.data?.message || 'Course not found'));
    course.value = null;
    await router.push({ name: 'admin.courses-list' });
  } finally {
    loading.value = false;
  }
};
</script>