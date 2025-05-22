<!-- src/views/demos/default/components/TrendingCourses.vue -->
<template>
  <section class="pb-5 pt-0 pt-lg-5">
    <b-container>
      <b-row class="mb-4">
        <b-col lg="8" class="mx-auto text-center">
          <h2 class="fs-1">Our Trending Courses</h2>
          <p class="mb-0">Check out most 🔥 courses in the market</p>
        </b-col>
      </b-row>
      <b-row>
        <div class="arrow-round arrow-blur arrow-hover">
          <CustomTinySlider v-if="isSliderReady && courses.length" :settings="settings" id="trending-courses" class="pb-1">
            <div v-for="(course, idx) in courses" :key="idx">
              <TrendingCoursesCard :item="course" />
            </div>
          </CustomTinySlider>
          <div v-else-if="!isSliderReady" class="text-center">
            <p>Loading trending courses...</p>
          </div>
          <div v-else class="text-center">
            <p>No trending courses available.</p>
          </div>
        </div>
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useToast } from 'vue-toast-notification';
import CustomTinySlider from '@/components/CustomTinySlider.vue';
import TrendingCoursesCard from '@/views/demos/default/components/TrendingCoursesCard.vue';
import { api } from '@/services/authService';

const $toast = useToast();
const courses = ref([]);
const isSliderReady = ref(false);

const settings = {
  arrowKeys: true,
  gutter: 30,
  autoplayButton: false,
  autoplayButtonOutput: false,
  nested: 'inner',
  autoplay: true,
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

const fetchTrendingCourses = async () => {
  try {
    const response = await api.get('/course/courses/');
    courses.value = response.data.map(course => ({
      slug: course.slug || '',
      title: course.title || 'Untitled Course',
      image: course.cover || 'https://placehold.co/300x200?text=Course',
      final_price: course.final_price || 0,
      price: parseFloat(course.price) || course.final_price || 0,
      category: course.category || 'Unknown',
      ribbon: course.ribbon || '',
      badges: course.categories?.map(cat => ({ text: cat.name, class: 'primary' })) || [{ text: course.category || 'General', class: 'primary' }],
      rating: course.rating || 0,
      reviews: course.reviews || 0,
      students: course.students || 0,
      time: course.duration || 'N/A',
      lectures: course.lectures || 0,
      instructor: {
        name: course.instructor?.full_name || course.instructor?.email || 'Unknown Instructor',
        avatar: course.instructor?.avatar || 'https://placehold.co/50?text=Avatar',
      },
    }));
    console.log('Fetched trending courses:', courses.value);
    isSliderReady.value = courses.value.length > 0;
  } catch (err) {
    console.error('Failed to fetch trending courses:', err);
    $toast.error('Failed to load trending courses. Please try again.');
    isSliderReady.value = false;
  }
};

onMounted(() => {
  fetchTrendingCourses();
});

// Watch courses to update slider readiness
watch(courses, () => {
  isSliderReady.value = courses.value.length > 0;
});
</script>