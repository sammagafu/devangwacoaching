<template>
	<section class="pt-0">
		<b-container>
			<b-row class="mb-4">
				<h2 class="mb-0">Top Listed Courses</h2>
			</b-row>
			<b-row>
				<div class="arrow-round arrow-blur arrow-hover">
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

defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const route = useRoute();
const defaultAvatar = avatar01;
const topCourses = ref([]);

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
		1: {
			items: 1,
		},
		576: {
			items: 1,
		},
		768: {
			items: 2,
		},
		992: {
			items: 2,
		},
		1200: {
			items: 3,
		},
	},
};

const fetchTopCourses = async () => {
  try {
    const response = await api.get('course/courses/', {
      params: { is_featured: true, limit: 6 },
    });
    topCourses.value = response.data
      .filter((course) => course.slug !== route.params.slug)
      .map((course) => ({
        ...course,
        image: course.cover,
        price: parseFloat(course.price),
        final_price: course.final_price,
        category: course.tags.length > 0 ? course.tags[0] : 'general',
        rating: course.rating || 4.5,
        student: course.student || 12,
        avatar: course.instructor?.avatar || defaultAvatar,
      }));
    console.log('Top courses fetched:', topCourses.value);
  } catch (error) {
    console.error('Failed to fetch top courses:', error);
  }
};

onMounted(() => {
  fetchTopCourses();
});
</script>