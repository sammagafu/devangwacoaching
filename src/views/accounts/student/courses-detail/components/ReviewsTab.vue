<template>
  <h5 class="mb-3">Reviews</h5>
  <b-form class="row g-3">
    <b-col cols="12" class="bg-light-input">
      <select v-model="rating" class="form-select">
        <option v-for="option in ratingOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </b-col>
    <b-col cols="12">
      <div v-if="reviews.length === 0" class="text-center">
        <p>No reviews available for this course.</p>
      </div>
      <div v-else class="border p-4 rounded-3 mb-4">
        <ul class="list-unstyled mb-0">
          <li v-for="(review, idx) in reviews" :key="idx" class="mb-3">
            <div class="d-flex">
              <div class="avatar avatar-sm flex-shrink-0 me-2">
                <img class="avatar-img rounded-circle" :src="review.avatar || defaultAvatar" alt="avatar">
              </div>
              <div>
                <h6 class="mb-1">{{ review.author }}</h6>
                <p class="mb-1">{{ review.comment }}</p>
                <ul class="list-inline mb-0 hstack gap-1">
                  <li class="list-inline-item me-0 small" v-for="n in Math.floor(review.rating)" :key="n">
                    <font-awesome-icon :icon="faStar" class="text-warning" />
                  </li>
                  <li class="list-inline-item ms-2 small">{{ review.rating }}/5.0</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </b-col>
  </b-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import avatar01 from '@/assets/images/avatar/01.jpg';

defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const defaultAvatar = avatar01;
const rating = ref(null);
const ratingOptions = [
  { value: null, label: 'Select rating', disabled: true },
  { value: 5, label: '5 Stars' },
  { value: 4, label: '4 Stars' },
  { value: 3, label: '3 Stars' },
  { value: 2, label: '2 Stars' },
  { value: 1, label: '1 Star' },
];

// Mock reviews; replace with API fetch if available
const reviews = ref([
  {
    author: 'John Doe',
    comment: 'Great course with practical examples!',
    rating: 4.5,
    avatar: defaultAvatar,
  },
  {
    author: 'Jane Smith',
    comment: 'Very informative and well-structured.',
    rating: 5.0,
    avatar: defaultAvatar,
  },
]);

// Debug rating and options
console.log('ReviewsTab course:', course);
console.log('Rating:', rating.value);
console.log('Rating Options:', ratingOptions);
</script>