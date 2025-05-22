<template>
  <section class="pt-0">
    <b-container>
      <b-row class="mb-4">
        <h2 class="mb-0">Top Listed Courses</h2>
      </b-row>
      <b-row>
        <div v-if="error" class="text-center py-3">
          <p class="text-danger">{{ error }}</p>
        </div>
        <div v-else-if="!topCourses.length && !loading" class="text-center py-3">
          <p>No courses available at the moment.</p>
        </div>
        <div v-else class="arrow-round arrow-blur arrow-hover">
          <CustomTinySlider :settings="settings" id="course-detail-slider">
            <div class="pb-4" v-for="(item, idx) in topCourses" :key="idx">
              <CourseCard :item="item" />
            </div>
          </CustomTinySlider>
        </div>
      </b-row>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import CustomTinySlider from '@/components/CustomTinySlider.vue';
import type { TinySliderSettings } from 'tiny-slider';
import CourseCard from '@/views/pages/course/detail-classic/components/CourseCard.vue';
import { api } from '@/services/authService';
import avatar01 from '@/assets/images/avatar/01.jpg';
import { useToast } from 'vue-toast-notification';

const $toast = useToast();
const route = useRoute();
const defaultAvatar = avatar01;
const topCourses = ref<CourseType[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

interface CourseType {
  id: number;
  title: string;
  slug: string;
  description: string;
  image?: string;
  ispublished?: boolean;
  created_at?: string;
  instructor?: { id: number; email: string; full_name?: string; avatar?: string };
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
  student?: number;
  rating?: number;
  avatar?: string;
}

defineProps<{
  course: CourseType;
}>();

const settings: TinySliderSettings = {
  arrowKeys: true,
  gutter: 30,
  autoplayButton: false,
  autoplayButtonOutput: false,
  nested: 'inner',
  mouseDrag: true,
  autoplay: false,
  controls: true,
  edgePadding: 2,
  items: 3,
  nav: false,
  responsive: {
    1: { items: 1 },
    576: { items: 1 },
    768: { items: 2 },
    992: { items: 2 },
    1200: { items: 3 },
  },
};

const fetchTopCourses = async () => {
  try {
    loading.value = true;
    const response = await api.get('course/courses/', {
      params: { limit: 6 },
    });
    console.log('Raw API response for top courses:', response.data);
    topCourses.value = response.data
      .filter((course: CourseType) => {
        const isValid = course.id && course.title && course.slug;
        if (!isValid) console.warn('Invalid course filtered out:', course);
        return isValid;
      })
      .map((course: CourseType) => ({
        ...course,
        image: course.image || '/default-course-image.jpg',
        price: course.price || '0',
        final_price: course.final_price ?? parseFloat(course.price || '0'),
        category: course.tags?.length > 0 ? course.tags[0] : 'General',
        rating: course.rating || 4.5,
        student: course.student || 0,
        avatar: course.instructor?.avatar || defaultAvatar,
        ispublished: course.ispublished ?? true,
      }));
    console.log('Processed top courses:', topCourses.value);
    if (!topCourses.value.length) {
      $toast.info('No valid courses available.');
    }
  } catch (error) {
    console.error('Failed to fetch top courses:', error);
    error.value = 'Failed to load courses.';
    $toast.error('Failed to load courses.');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTopCourses();
});
</script>