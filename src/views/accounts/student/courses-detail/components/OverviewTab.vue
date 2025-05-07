<template>
  <h5 class="mb-3">Course Description</h5>
  <p class="mb-3">{{ course.description }}</p>
  <p class="mb-3">
    Learn the essentials of {{ course.title }} with our comprehensive course designed for
    {{ course.level || 'all levels' }}. This course covers practical skills and hands-on examples to help you succeed.
  </p>

  <h5 class="mt-4">What you’ll learn</h5>
  <ul class="list-group list-group-borderless mb-3">
    <li class="list-group-item h6 fw-light d-flex mb-0" v-for="(topic, idx) in course.topics || defaultTopics" :key="idx">
      <font-awesome-icon :icon="faCheckCircle" class="text-success me-2" />
      {{ topic }}
    </li>
  </ul>

  <p class="mb-0">
    This course combines theory and practice to build a solid foundation in {{ course.category || 'general' }} skills.
    Follow step-by-step examples to apply what you learn in real-world scenarios.
  </p>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const defaultTopics = [
  'Understand core concepts and techniques',
  'Apply skills in practical scenarios',
  'Master key tools and methodologies',
  'Build projects from scratch',
];
</script>