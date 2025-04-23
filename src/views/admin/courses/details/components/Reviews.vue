<template>
  <div>
    <b-col cols="12">
      <b-card no-body class="bg-transparent border">
        <b-card-header class="bg-light border-bottom">
          <h5 class="mb-0">Students All Reviews</h5>
        </b-card-header>
        <b-card-body class="pb-0">
          <div v-if="!course.reviews || course.reviews.length === 0" class="text-center py-4">
            <p class="text-muted">No reviews available.</p>
          </div>
          <div v-else class="table-responsive border-0 mb-0">
            <table class="table table-dark-gray align-middle p-4 mb-0 table-hover">
              <thead>
                <tr>
                  <th scope="col" class="border-0 rounded-start">Student Name</th>
                  <th scope="col" class="border-0">Date</th>
                  <th scope="col" class="border-0">Rating</th>
                  <th scope="col" class="border-0 rounded-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in paginatedReviews" :key="idx">
                  <td>
                    <div class="d-flex align-items-center position-relative">
                      <div class="avatar avatar-xs mb-2 mb-md-0">
                        <img :src="item.student?.avatar ? `${apiBaseUrl}${item.student.avatar}` : defaultAvatar" class="rounded-circle" alt="">
                      </div>
                      <div class="mb-0 ms-2">
                        <h6 class="mb-0"><a href="#" class="stretched-link">{{ item.student?.full_name || 'Unknown' }}</a></h6>
                      </div>
                    </div>
                  </td>
                  <td class="text-center text-sm-start">
                    <h6 class="mb-0">{{ formatDate(item.created_at) }}</h6>
                  </td>
                  <td>
                    <ul class="list-inline mb-0 hstack gap-1" v-if="item.rating">
                      <li class="list-inline-item me-0 small" v-for="(_star, idx) in Array(Math.floor(item.rating)).fill(0)" :key="idx">
                        <font-awesome-icon :icon="faStar" class="text-warning" />
                      </li>
                      <li class="list-inline-item me-0 small" v-if="!Number.isInteger(item.rating)">
                        <font-awesome-icon :icon="faStarHalfAlt" class="text-warning" />
                      </li>
                      <li class="list-inline-item me-0 small" v-for="(_star, idx) in item.rating < 5 && Array(5 - Math.ceil(item.rating)).fill(0)" :key="idx">
                        <font-awesome-icon :icon="faStarR" class="text-warning" />
                      </li>
                    </ul>
                  </td>
                  <td>
                    <a href="#" class="btn btn-sm btn-info-soft mb-0 me-1" data-bs-toggle="modal" data-bs-target="#viewReview" @click="selectReview(item)">View</a>
                    <button class="btn btn-sm btn-danger-soft me-1 mb-1 mb-md-0" @click="deleteReview(item.id)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card-body>

        <b-card-footer class="bg-transparent" v-if="course.reviews && course.reviews.length > 0">
          <div class="d-sm-flex justify-content-sm-between align-items-sm-center">
            <p class="mb-0 text-center text-sm-start">Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredReviews.length) }} of {{ filteredReviews.length }} entries</p>
            <nav class="d-flex justify-content-center mb-0" aria-label="navigation">
              <ul class="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                <li class="page-item mb-0" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="#" @click.prevent="currentPage--"><font-awesome-icon :icon="faAngleLeft" /></a>
                </li>
                <li v-for="page in totalPages" :key="page" class="page-item mb-0" :class="{ active: currentPage === page }">
                  <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                </li>
                <li class="page-item mb-0" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link" href="#" @click.prevent="currentPage++"><font-awesome-icon :icon="faAngleRight" /></a>
                </li>
              </ul>
            </nav>
          </div>
        </b-card-footer>
      </b-card>
    </b-col>

    <b-modal v-model="showModal" :title="selectedReview?.student?.full_name || 'Review'" header-class="bg-dark" title-class="text-white" ok-only ok-title="Close" ok-variant="danger-soft" centered>
      <div class="d-md-flex">
        <div class="avatar avatar-md me-4 flex-shrink-0">
          <img class="avatar-img rounded-circle" :src="selectedReview?.student?.avatar ? `${apiBaseUrl}${selectedReview.student.avatar}` : defaultAvatar" alt="avatar">
        </div>
        <div>
          <div class="d-sm-flex mt-1 mt-md-0 align-items-center">
            <h5 class="me-3 mb-0">{{ selectedReview?.student?.full_name || 'Unknown' }}</h5>
            <ul class="list-inline mb-0 hstack gap-1" v-if="selectedReview?.rating">
              <li class="list-inline-item me-0 small" v-for="(_star, idx) in Array(Math.floor(selectedReview.rating)).fill(0)" :key="idx">
                <font-awesome-icon :icon="faStar" class="text-warning" />
              </li>
              <li class="list-inline-item me-0 small" v-if="!Number.isInteger(selectedReview.rating)">
                <font-awesome-icon :icon="faStarHalfAlt" class="text-warning" />
              </li>
              <li class="list-inline-item me-0 small" v-for="(_star, idx) in selectedReview.rating < 5 && Array(5 - Math.ceil(selectedReview.rating)).fill(0)" :key="idx">
                <font-awesome-icon :icon="faStarR" class="text-warning" />
              </li>
            </ul>
          </div>
          <p class="small mb-2">{{ formatDate(selectedReview?.created_at) }}</p>
          <p class="mb-2">{{ selectedReview?.comment || 'No comment provided.' }}</p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import { useToast } from 'vue-toast-notification';
import { api } from '@/services/authService';
import { faStar, faStarHalfAlt, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarR } from '@fortawesome/free-regular-svg-icons';
import avatar01 from '@/assets/images/avatar/01.jpg';

const apiBaseUrl = 'http://localhost:8000';

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
});

const $toast = useToast();
const showModal = ref(false);
const selectedReview = ref(null);
const currentPage = ref(1);
const itemsPerPage = ref(8);

const defaultAvatar = avatar01;

const filteredReviews = computed(() => {
  return props.course.reviews || [];
});

const totalPages = computed(() => Math.ceil(filteredReviews.value.length / itemsPerPage.value));

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredReviews.value.slice(start, start + itemsPerPage.value);
});

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const selectReview = (review) => {
  selectedReview.value = review;
  showModal.value = true;
};

const deleteReview = async (reviewId) => {
  try {
    await api.delete(`course/reviews/${reviewId}/`);
    const index = props.course.reviews.findIndex(review => review.id === reviewId);
    if (index !== -1) {
      props.course.reviews.splice(index, 1);
    }
    $toast.success('Review deleted successfully!');
  } catch (error) {
    console.error('Failed to delete review:', error);
    $toast.error('Failed to delete review: ' + (error.response?.data?.message || 'Unknown error'));
  }
};
</script>