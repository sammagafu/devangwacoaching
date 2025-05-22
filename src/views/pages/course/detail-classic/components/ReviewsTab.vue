<template>
  <div>
    <b-row class="mb-4">
      <h5 class="mb-4">Our Student Reviews</h5>
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
      <b-col md="8">
        <b-row class="align-items-center" v-for="star in [5, 4, 3, 2, 1]" :key="star">
          <b-col cols="6" sm="8">
            <b-progress class="progress-sm bg-warning bg-opacity-15">
              <b-progress-bar class="bg-warning" :value="ratingDistribution[star] ? (ratingDistribution[star] / reviews.length) * 100 : 0" />
            </b-progress>
          </b-col>
          <b-col cols="6" sm="4">
            <ul class="list-inline mb-0 hstack gap-1">
              <li class="list-inline-item me-0 small" v-for="n in 5" :key="n">
                <font-awesome-icon :icon="n <= star ? faStar : faStarR" class="text-warning" />
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <div v-if="reviews.length" class="mb-4">
      <div class="d-md-flex my-4" v-for="review in reviews" :key="review.id">
        <div class="avatar avatar-xl me-4 flex-shrink-0">
          <img class="avatar-img rounded-circle" :src="review.user.avatar || defaultAvatar" alt="avatar">
        </div>
        <div>
          <div class="d-sm-flex mt-1 mt-md-0 align-items-center">
            <h5 class="me-3 mb-0">{{ review.user.full_name || 'Anonymous' }}</h5>
            <ul class="list-inline mb-0 hstack gap-1">
              <li class="list-inline-item me-0" v-for="n in 5" :key="n">
                <font-awesome-icon :icon="n <= review.rating ? faStar : faStarR" class="text-warning" />
              </li>
            </ul>
          </div>
          <p class="small mb-2">{{ formatDate(review.created_at) }}</p>
          <p class="mb-2">{{ review.comment }}</p>
          <div class="btn-group" role="group" aria-label="Review actions">
            <b-button variant="outline-light" size="sm" @click="likeReview(review.id)">
              <font-awesome-icon :icon="faThumbsUp" class="me-1" />
              {{ review.likes || 0 }}
            </b-button>
            <b-button variant="outline-light" size="sm" @click="dislikeReview(review.id)">
              <font-awesome-icon :icon="faThumbsDown" class="me-1" />
              {{ review.dislikes || 0 }}
            </b-button>
          </div>
        </div>
      </div>
      <hr v-if="reviews.length > 1">
    </div>
    <div class="mt-2">
      <h5 class="mb-4">Leave a Review</h5>
      <b-form class="row g-3" @submit.prevent="submitReview">
        <b-col md="6" class="bg-light-input">
          <b-form-input v-model="name" type="text" id="inputtext" placeholder="Name" />
        </b-col>
        <b-col md="6" class="bg-light-input">
          <b-form-input v-model="email" type="email" placeholder="Email" id="inputEmail4" />
        </b-col>
        <b-col cols="12" class="bg-light-input">
          <ChoicesSelect id="inputState2" v-model="rating" :options="ratingOptions" placeholder="Select rating" />
        </b-col>
        <b-col cols="12" class="bg-light-input">
          <b-form-textarea
            v-model="reviewText"
            placeholder="Your review"
            rows="3"
            max-rows="6"
            id="exampleFormControlTextarea1"
          />
        </b-col>
        <b-col cols="12">
          <b-button type="submit" variant="primary" class="mb-0" :disabled="submitting">Post Review</b-button>
        </b-col>
      </b-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineProps } from 'vue';
import { useToast } from 'vue-toast-notification';
import ChoicesSelect from '@/components/ChoicesSelect.vue';
import { api } from '@/services/authService';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown, faStar as faStarR } from '@fortawesome/free-regular-svg-icons';
import avatar01 from '@/assets/images/avatar/01.jpg';

const $toast = useToast();
const reviews = ref<ReviewType[]>([]);
const name = ref('');
const email = ref('');
const rating = ref<string>(''); // Initialize as string for ChoicesSelect
const reviewText = ref('');
const submitting = ref(false);
const defaultAvatar = avatar01;

interface CourseType {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  image?: string;
  ispublished?: boolean;
  created_at?: string;
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
}

interface ReviewType {
  id: number;
  user: { full_name?: string; avatar?: string };
  rating: number;
  comment: string;
  created_at: string;
  likes: number;
  dislikes: number;
}

defineProps<{
  course: CourseType;
}>();

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

const ratingDistribution = computed(() => {
  const distribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.value.forEach(review => {
    distribution[review.rating] = (distribution[review.rating] || 0) + 1;
  });
  return distribution;
});

const fetchReviews = async () => {
  if (!course?.id) {
    console.warn('Course ID is missing, skipping review fetch.');
    return;
  }
  try {
    const response = await api.get(`/course/reviews/`, {
      params: { course_id: course.id },
    });
    reviews.value = response.data;
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    $toast.error('Failed to load reviews.');
  }
};

const submitReview = async () => {
  if (!name.value.trim() || !email.value.trim() || !rating.value || !reviewText.value.trim()) {
    $toast.error('Please fill out all fields.');
    return;
  }
  if (!course?.id) {
    $toast.error('Course ID is missing.');
    return;
  }
  try {
    submitting.value = true;
    const response = await api.post('/course/reviews/', {
      course_id: course.id,
      rating: parseInt(rating.value),
      comment: reviewText.value,
      name: name.value,
      email: email.value,
    });
    reviews.value.unshift({
      ...response.data,
      user: { full_name: name.value, avatar: defaultAvatar },
      likes: 0,
      dislikes: 0,
    });
    $toast.success('Review submitted successfully!');
    name.value = '';
    email.value = '';
    rating.value = '';
    reviewText.value = '';
  } catch (error) {
    console.error('Failed to submit review:', error);
    $toast.error('Failed to submit review.');
  } finally {
    submitting.value = false;
  }
};

const likeReview = async (reviewId: number) => {
  try {
    await api.post(`/course/reviews/${reviewId}/like/`);
    const review = reviews.value.find(r => r.id === reviewId);
    if (review) review.likes += 1;
    $toast.success('Review liked.');
  } catch (error) {
    console.error('Failed to like review:', error);
    $toast.error('Failed to like review.');
  }
};

const dislikeReview = async (reviewId: number) => {
  try {
    await api.post(`/course/reviews/${reviewId}/dislike/`);
    const review = reviews.value.find(r => r.id === reviewId);
    if (review) review.dislikes += 1;
    $toast.success('Review disliked.');
  } catch (error) {
    console.error('Failed to dislike review:', error);
    $toast.error('Failed to dislike review.');
  }
};

const formatDate = (date: string) => {
  const daysDiff = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
  return daysDiff <= 7 ? `${daysDiff} days ago` : new Date(date).toLocaleDateString();
};

onMounted(() => {
  fetchReviews();
});
</script>