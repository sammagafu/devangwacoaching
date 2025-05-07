<template>
  <section v-if="course && Object.keys(course).length" class="bg-light py-0 py-sm-5">
    <b-container>
      <b-row class="py-5">
        <b-col lg="8">
          <h6 class="mb-3 font-base bg-primary text-white py-2 px-4 rounded-2 d-inline-block">
            {{ course.category || 'General' }}
          </h6>
          <h1>{{ course.title }}</h1>
          <p>{{ course.description }}</p>
          <ul class="list-inline mb-0">
            <li class="list-inline-item h6 me-3 mb-1 mb-sm-0">
              <font-awesome-icon :icon="faStar" class="text-warning me-1" />
              {{ course.rating || '4.5' }}/5.0
            </li>
            <li class="list-inline-item h6 me-3 mb-1 mb-sm-0">
              <font-awesome-icon :icon="faUserGraduate" class="text-orange me-1" />
              {{ course.student || 12 }}k Enrolled
            </li>
            <li class="list-inline-item h6 me-3 mb-1 mb-sm-0">
              <font-awesome-icon :icon="faSignal" class="text-success me-1" />
              {{ course.level || 'All levels' }}
            </li>
            <li class="list-inline-item h6 me-3 mb-1 mb-sm-0">
              <BIconPatchExclamationFill class="text-danger me-1" />
              Last updated {{ formatDate(course.updated_at) }}
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
import { defineProps, watch } from 'vue';
import { faStar, faUserGraduate, faSignal, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { BIconPatchExclamationFill } from 'bootstrap-icons-vue';

defineProps({
  course: {
    type: Object,
    required: true,
  },
});

watch(
  () => course,
  (newCourse) => {
    console.log('PageIntro course updated:', newCourse);
  },
  { deep: true }
);

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
</script>