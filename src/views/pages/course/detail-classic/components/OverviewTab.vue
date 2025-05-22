<template>
  <div>
    <h5 class="mb-3">Course Description</h5>
    <p class="mb-3">
      Welcome to <strong>{{ course.title || 'this course' }}</strong>
    </p>
    <p class="mb-3">
      {{ course.description || 'No description available.' }}
    </p>
    <p class="mb-0">
      This course focuses on practical, hands-on learning to help you master the skills needed. We combine theoretical foundations with real-world applications to ensure you can apply what you learn effectively.
    </p>

    <h5 class="mt-4">What you’ll learn</h5>
    <ul class="list-group list-group-borderless mb-3">
      <li class="list-group-item h6 fw-light d-flex mb-0" v-for="(objective, idx) in course.learning_objectives || defaultObjectives" :key="idx">
        <font-awesome-icon :icon="faCheckCircle" class="text-success me-2" />
        {{ objective }}
      </li>
    </ul>

    <p class="mb-0">
      {{ course.summary || 'Join us to gain valuable skills and achieve your learning goals.' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

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
  modules?: { title: string; lectures: { title: string; time: string; isPremium: boolean }[] }[];
  faqs?: { question: string; answer: string }[];
  reviews?: number;
  discount_deadline?: string;
  video_url?: string;
  learning_objectives?: string[];
  summary?: string;
}

defineProps({
  course: {
    type: Object as PropType<CourseType>,
    required: true,
  },
});

const defaultObjectives = [
  'Understand key concepts and techniques.',
  'Apply skills in real-world scenarios.',
  'Master practical tools and strategies.',
];
</script>