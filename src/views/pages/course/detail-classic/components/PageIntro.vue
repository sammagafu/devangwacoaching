<template>
  <section class="bg-light py-0 py-sm-5">
    <b-container>
      <b-row class="py-5">
        <b-col lg="8">
          <h6 class="mb-3 font-base bg-primary text-white py-2 px-4 rounded-2 d-inline-block">{{ course.category || 'General' }}</h6>
          <h1>{{ course.title || 'Course Title' }}</h1>
          <p v-html="course.description || 'No description available.'"></p>
          <ul class="list-inline mb-0">
            <li class="list-inline-item h6 me-3 mb-1 mb-sm-0">
              <font-awesome-icon :icon="faStar" class="text-warning me-1" />
              {{ course.rating || 'N/A' }}/5.0
            </li>
            <li class="list-inline-item h6 me-3 mb-1 mb-sm-0">
              <font-awesome-icon :icon="faUserGraduate" class="text-orange me-1" />
              {{ course.student || 0 }} Enrolled
            </li>
            <li class="list-inline-item h6 me-3 mb-1 mb-sm-0">
              <font-awesome-icon :icon="faSignal" class="text-success me-1" />
              {{ course.level || 'All levels' }}
            </li>
            <li class="list-inline-item h6 me-3 mb-1 mb-sm-0">
              <BIconPatchExclamationFill class="text-danger me-1" />
              Last updated {{ course.updated_at ? formatDate(course.updated_at) : 'N/A' }}
            </li>
            <li class="list-inline-item h6 mb-0">
              <font-awesome-icon :icon="faGlobe" class="text-info me-1" />
              {{ course.language || 'English' }}
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { faStar, faUserGraduate, faSignal, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { BIconPatchExclamationFill } from 'bootstrap-icons-vue';

interface CourseType {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  image?: string;
  ispublished?: boolean;
  created_at?: string;
  updated_at?: string;
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
}

defineProps({
  course: {
    type: Object as PropType<CourseType>,
    required: true,
  },
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
};
</script>