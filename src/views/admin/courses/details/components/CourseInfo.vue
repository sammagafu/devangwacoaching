
<template>
  <b-col xxl="6">
    <b-card no-body class="bg-transparent border rounded-3 h-100">
      <b-card-header class="bg-light border-bottom">
        <h5 class="card-header-title">{{ course.title || 'Untitled Course' }}</h5>
      </b-card-header>
      <b-card-body>
        <b-row class="g-4">
          <b-col md="6">
            <img
              :src="imageSrc"
              class="rounded"
              alt="Course cover"
              @error="handleImageError"
              @load="handleImageLoad"
            >
            <p v-if="imageError" class="text-danger small mt-1">Failed to load cover image.</p>
          </b-col>
          <b-col md="6">
            <p class="mb-3" v-html=" course.description || 'No description available.' "></p>
            <h5 class="mb-3">{{ currency }}{{ course.final_price || '0.00' }}</h5>
            <div class="d-sm-flex align-items-center">
              <div class="avatar avatar-md">
                <img
                  class="avatar-img rounded-circle"
                  :src="course.instructor?.avatar ? `${apiBaseUrl}${course.instructor.avatar}` : defaultAvatar"
                  alt="Instructor avatar"
                >
              </div>
              <div class="ms-sm-3 mt-2 mt-sm-0">
                <h6 class="mb-0"><a href="#">{{ course.instructor?.full_name || 'Unknown' }}</a></h6>
                <p class="mb-0 small">{{ course.instructor?.role || 'Instructor' }}</p>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col md="6">
            <ul class="list-group list-group-borderless">
              <li class="list-group-item">
                <span>Release Date:</span>
                <span class="h6 mb-0">{{ formatDate(course.created_at) }}</span>
              </li>
              <li class="list-group-item">
                <span>Total Hour:</span>
                <span class="h6 mb-0">{{ course.total_hours || 'N/A' }}</span>
              </li>
              <li class="list-group-item">
                <span>Total Enrolled:</span>
                <span class="h6 mb-0">{{ course.enrollment_count || '0' }}</span>
              </li>
              <li class="list-group-item">
                <span>Certificate:</span>
                <span class="h6 mb-0">{{ course.certificate ? 'Yes' : 'No' }}</span>
              </li>
            </ul>
          </b-col>
          <b-col md="6">
            <ul class="list-group list-group-borderless">
              <li class="list-group-item">
                <span>Skills:</span>
                <span class="h6 mb-0">{{ course.skill_level || 'All levels' }}</span>
              </li>
              <li class="list-group-item">
                <span>Total Lecture:</span>
                <span class="h6 mb-0">{{ course.total_lectures || '0' }}</span>
              </li>
              <li class="list-group-item">
                <span>Language:</span>
                <span class="h6 mb-0">{{ course.language || 'English' }}</span>
              </li>
              <li class="list-group-item">
                <span>Review:</span>
                <span class="h6 mb-0">{{ course.rating || '0.0' }}
                  <font-awesome-icon :icon="faStar" class="text-warning ms-1" />
                </span>
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { currency } from '@/helpers/constants';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import avatar01 from '@/assets/images/avatar/01.jpg';
import defaultImage from '@/assets/images/courses/4by3/01.jpg';

const apiBaseUrl = 'http://localhost:8000';

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
});

const defaultAvatar = avatar01;
const imageError = ref(false);

// Compute image source with debugging
const imageSrc = computed(() => {
  const cover = props.course.cover;
  console.log('Course cover:', cover); // Debug cover value
  if (!cover) {
    console.log('Using default image:', defaultImage);
    return defaultImage;
  }
  // Handle both relative and absolute URLs
  const url = cover.startsWith('http') ? cover : `${apiBaseUrl}${cover.startsWith('/') ? '' : '/'}${cover}`;
  console.log('Constructed image URL:', url);
  imageError.value = false; // Reset error state
  return url;
});

// Watch for changes in course.cover
watch(() => props.course.cover, (newCover) => {
  console.log('Cover changed:', newCover);
  imageError.value = false; // Reset error on cover change
});

const handleImageError = () => {
  console.error('Failed to load image:', imageSrc.value);
  imageError.value = true;
};

const handleImageLoad = () => {
  console.log('Image loaded successfully:', imageSrc.value);
  imageError.value = false;
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
</script>
