<template>
  <PagesLayout>
    <div v-if="loading" class="text-center py-5">
      <b-spinner variant="primary" />
    </div>
    <div v-else-if="error" class="text-center py-5">
      <p class="text-danger">{{ error }}</p>
      <b-button variant="primary" to="/courses">Back to Courses</b-button>
    </div>
    <div v-else>
      <PageIntro :course="course" />
      <PageContent :course="course" />
      <ListedCourses :course="course" />
    </div>
  </PagesLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import PagesLayout from '@/layouts/PagesLayout.vue';
import PageIntro from '@/views/pages/course/detail-classic/components/PageIntro.vue';
import PageContent from '@/views/pages/course/detail-classic/components/PageContent.vue';
import ListedCourses from '@/views/pages/course/detail-classic/components/ListedCourses.vue';
import { api } from '@/services/authService';

// Debug imports
console.log('PagesLayout imported:', PagesLayout);
console.log('PageIntro imported:', PageIntro);
console.log('PageContent imported:', PageContent);
console.log('ListedCourses imported:', ListedCourses);

const $toast = useToast();
const route = useRoute();
const course = ref({});
const loading = ref(false);
const error = ref(null);

const fetchCourse = async () => {
  try {
    loading.value = true;
    console.log('Fetching course with slug:', route.params.slug);
    const response = await api.get(`course/courses/${route.params.slug}/`);
    course.value = {
      ...response.data,
      image: response.data.cover,
      category: response.data.tags.length > 0 ? response.data.tags[0] : 'general',
      level: response.data.level || 'beginner',
      language: response.data.language || 'English',
      certificate: response.data.certificate || false,
      rating: response.data.rating || 4.5,
      duration: response.data.duration || `${response.data.total_videos || 10}h 0m`,
      student: response.data.student || 12,
    };
    console.log('Course fetched:', course.value);
  } catch (err) {
    console.error('Failed to fetch course:', err);
    error.value = err.response?.status === 404 
      ? `Course with slug "${route.params.slug}" not found.`
      : 'Failed to load course details. Please try again.';
    $toast.error(error.value);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCourse();
});
</script>