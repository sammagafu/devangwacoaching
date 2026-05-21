<template>
  <div>
    <b-row class="mb-4">
      <h5 class="mb-4">Student Reviews</h5>
      <b-col md="4" class="mb-3 mb-md-0">
        <div class="text-center">
          <h2 class="mb-0">{{ averageRating || 0 }}</h2>
          <ul class="list-inline mb-0 flex-centered hstack gap-1">
            <li class="list-inline-item me-0" v-for="n in 5" :key="n">
              <font-awesome-icon
                :icon="n <= Math.floor(averageRating) ? faStar : n <= averageRating ? faStarHalfAlt : faStarR"
                class="text-warning"
              />
            </li>
          </ul>
          <p class="mb-0">(Based on {{ reviews.length }} reviews)</p>
        </div>
      </b-col>
    </b-row>

    <div v-if="reviews.length" class="mb-4">
      <div class="d-md-flex my-4" v-for="review in reviews" :key="review.id">
        <div class="avatar avatar-xl me-4 flex-shrink-0">
          <img class="avatar-img rounded-circle" :src="defaultAvatar" alt="avatar">
        </div>
        <div>
          <h5 class="me-3 mb-0">{{ review.user?.full_name || 'Student' }}</h5>
          <ul class="list-inline mb-1 hstack gap-1">
            <li class="list-inline-item me-0" v-for="n in 5" :key="n">
              <font-awesome-icon :icon="n <= review.rating ? faStar : faStarR" class="text-warning" />
            </li>
          </ul>
          <p class="small mb-2">{{ formatDate(review.created_at) }}</p>
          <p class="mb-2">{{ review.comment }}</p>
        </div>
      </div>
    </div>

    <div v-if="authStore.isAuthenticated" class="mt-2">
      <h5 class="mb-4">Leave a Review</h5>
      <b-form class="row g-3" @submit.prevent="submitReview">
        <b-col cols="12" class="bg-light-input">
          <ChoicesSelect id="inputState2" v-model="rating" :options="ratingOptions" placeholder="Select rating" />
        </b-col>
        <b-col cols="12" class="bg-light-input">
          <b-form-textarea v-model="reviewText" placeholder="Your review" rows="3" />
        </b-col>
        <b-col cols="12">
          <b-button type="submit" variant="primary" class="mb-0" :disabled="submitting">Post Review</b-button>
        </b-col>
      </b-form>
    </div>
    <p v-else class="text-muted">Please <router-link :to="{ name: 'auth.sign-in' }">sign in</router-link> to leave a review.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import ChoicesSelect from '@/components/ChoicesSelect.vue';
import courseService from '@/services/courseService';
import { useAuthStore } from '@/stores/auth';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarR } from '@fortawesome/free-regular-svg-icons';
import avatar01 from '@/assets/images/avatar/01.jpg';

const props = defineProps({
  course: { type: Object, required: true },
});

const $toast = useToast();
const authStore = useAuthStore();
const reviews = ref([]);
const rating = ref('');
const reviewText = ref('');
const submitting = ref(false);
const defaultAvatar = avatar01;

const ratingOptions = [
  { value: '5', label: '★★★★★ (5/5)' },
  { value: '4', label: '★★★★☆ (4/5)' },
  { value: '3', label: '★★★☆☆ (3/5)' },
  { value: '2', label: '★★☆☆☆ (2/5)' },
  { value: '1', label: '★☆☆☆☆ (1/5)' },
];

const averageRating = computed(() => {
  if (!reviews.value.length) return 0;
  const total = reviews.value.reduce((sum, review) => sum + review.rating, 0);
  return (total / reviews.value.length).toFixed(1);
});

const fetchReviews = async () => {
  if (!props.course?.id) return;
  try {
    reviews.value = await courseService.fetchReviews(props.course.id);
  } catch {
    $toast.error('Failed to load reviews.');
  }
};

const submitReview = async () => {
  if (!rating.value || !reviewText.value.trim()) {
    $toast.error('Please provide a rating and comment.');
    return;
  }
  try {
    submitting.value = true;
    const created = await courseService.submitReview(props.course.id, {
      rating: rating.value,
      comment: reviewText.value,
    });
    reviews.value.unshift(created);
    $toast.success('Review submitted successfully!');
    rating.value = '';
    reviewText.value = '';
  } catch (err) {
    $toast.error(err.response?.data?.detail || 'Failed to submit review.');
  } finally {
    submitting.value = false;
  }
};

const formatDate = (date) => {
  const daysDiff = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
  return daysDiff <= 7 ? `${daysDiff} days ago` : new Date(date).toLocaleDateString();
};

onMounted(fetchReviews);
</script>
