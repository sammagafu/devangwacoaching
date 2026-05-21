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
import courseService from '@/services/courseService';
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

const props = defineProps<{ course: CourseType }>();

const fetchTopCourses = async () => {
  try {
    loading.value = true;
    const courses = await courseService.fetchCourses();
    topCourses.value = courses
      .filter((c) => c.slug !== route.params.slug && c.id && c.title)
      .slice(0, 6)
      .map((course) => ({
        ...course,
        avatar: course.instructor?.avatar || defaultAvatar,
      }));
  } catch {
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