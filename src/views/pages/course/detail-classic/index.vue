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

const $toast = useToast();
const route = useRoute();
const course = ref<CourseType>({});
const loading = ref(false);
const error = ref<string | null>(null);

interface CourseType {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  image?: string;
  ispublished?: boolean;
  created_at?: string;
  instructor?: { id: number; email: string; full_name?: string };
  price?: string;
  final_price?: number;
  discount_percentage?: string;
  is_featured?: boolean;
  total_modules?: number;
  total_videos?: number;
  total_documents?: number;
  total_quizzes?: number;
  tags?: string[];
  category?: string;
  level?: string;
  language?: string;
  certificate?: boolean;
  rating?: number;
  duration?: string;
  student?: number;
  modules?: { title: string; lectures: { title: string; time: string; isPremium: boolean }[] }[];
  faqs?: { question: string; answer: string }[];
  reviews?: number;
}

const fetchCourse = async () => {
  try {
    loading.value = true;
    console.log('Fetching course with slug:', route.params.slug);
    const response = await api.get(`course/courses/${route.params.slug}/`);
    course.value = {
      ...response.data,
      image: response.data.cover || '/default-course-image.jpg',
      category: response.data.tags?.length > 0 ? response.data.tags[0] : 'General',
      level: response.data.level || 'Beginner',
      language: response.data.language || 'English',
      certificate: response.data.certificate ?? false,
      rating: response.data.rating || 4.5,
      duration: response.data.duration || `${response.data.total_videos || 10}h 0m`,
      student: response.data.student || 12,
      modules: response.data.modules || [],
      faqs: response.data.faqs || [],
      reviews: response.data.reviews || 0,
    };
    console.log('Course fetched:', course.value);
  } catch (err: any) {
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