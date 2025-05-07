<template>
  <section class="py-5">
    <b-container>
      <b-row>
        <b-col lg="8" xl="9">
          <b-row class="mb-4 align-items-center">
            <b-col xl="6">
              <b-form class="border rounded p-2">
                <div class="input-group input-borderless">
                  <b-form-input
                    type="search"
                    class="me-1"
                    placeholder="Find your course"
                    v-model="searchQuery"
                  />
                  <b-button type="button" variant="primary" class="mb-0 rounded z-index-1">
                    <font-awesome-icon :icon="faSearch" />
                  </b-button>
                </div>
              </b-form>
            </b-col>

            <b-col xl="3" class="mt-3 mt-xl-0">
              <b-form class="border rounded p-2 input-borderless">
                <select v-model="sortValue" class="form-select-sm border-0">
                  <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </b-form>
            </b-col>

            <b-col cols="12" xl="3" class="d-flex justify-content-between align-items-center mt-3 mt-xl-0">
              <b-button
                variant="primary"
                class="mb-0 d-lg-none"
                type="button"
                @click="offcanvas = !offcanvas"
              >
                <font-awesome-icon :icon="faSlidersH" class="me-1" />
                Show filter
              </b-button>
              <p class="mb-0 text-end">
                Showing {{ filteredCourses.length }} of {{ coursesList.length }} result
              </p>
            </b-col>
          </b-row>

          <b-row v-if="loading" class="g-4">
            <b-col cols="12" class="text-center">
              <b-spinner variant="primary" />
            </b-col>
          </b-row>
          <b-row v-else class="g-4">
            <b-col sm="6" xl="4" v-for="(item, idx) in filteredCourses" :key="idx">
              <CourseCard
                :item="item"
                :isAdmin="isAdmin"
                @approve="approveCourse(item.id)"
                @reject="rejectCourse(item.id)"
              />
            </b-col>
          </b-row>

          <b-col cols="12">
            <nav class="mt-4 d-flex justify-content-center" aria-label="navigation">
              <ul class="pagination pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                <li class="page-item mb-0">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="currentPage--"
                    :disabled="currentPage === 1"
                  >
                    <font-awesome-icon :icon="faAngleLeft" />
                  </a>
                </li>
                <li
                  class="page-item mb-0"
                  v-for="page in totalPages"
                  :key="page"
                  :class="{ active: page === currentPage }"
                >
                  <a class="page-link" href="#" @click.prevent="currentPage = page">
                    {{ page }}
                  </a>
                </li>
                <li class="page-item mb-0">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="currentPage++"
                    :disabled="currentPage === totalPages"
                  >
                    <font-awesome-icon :icon="faAngleRight" />
                  </a>
                </li>
              </ul>
            </nav>
          </b-col>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import {
  faSearch,
  faSlidersH,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';
import { api } from '@/services/authService';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import avatar01 from '@/assets/images/avatar/01.jpg';
import CourseCard from '@/views/accounts/student/courses-all/components/CourseCard.vue';
import Filter from '@/views/accounts/student/courses-all/components/Filter.vue';

const $toast = useToast();
const coursesList = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const sortValue = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const offcanvas = ref(false);
const filters = ref({});

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const isAdmin = computed(() => user.value?.is_admin || user.value?.is_staff || false);

const defaultAvatar = avatar01;

const sortOptions = ref([
  { value: '', label: 'Sort by' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
]);

const totalPages = computed(() =>
  Math.ceil(coursesList.value.length / itemsPerPage.value)
);

const filteredCourses = computed(() => {
  let filtered = [...coursesList.value].map((course) => ({
    ...course,
    image: course.cover, // Map cover to image
    instructor: course.instructor,
    price: parseFloat(course.price),
    final_price: course.final_price,
    discount_percentage: parseFloat(course.discount_percentage),
    is_featured: course.is_featured,
    total_modules: course.total_modules,
    badge: course.is_featured
      ? { class: 'success', text: 'Featured' }
      : course.tags.length > 0
      ? { class: 'primary', text: course.tags[0] }
      : { class: 'info', text: 'General' },
    isLike: false, // Mock; integrate with user favorites if available
    rating: course.rating || 4.5, // Mock; replace with API field if available
    duration: course.duration || `${course.total_videos || 10}h 0m`, // Mock or derive
    lectures: course.total_modules || 10, // Use total_modules or mock
    category: course.tags.length > 0 ? course.tags[0] : 'general', // Mock or derive
    level: course.level || 'beginner', // Mock; replace with API field
  }));

  // Apply search
  if (searchQuery.value) {
    filtered = filtered.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Apply filters from Filter component
  if (filters.value.category) {
    filtered = filtered.filter(
      (course) => course.category === filters.value.category
    );
  }
  if (filters.value.level) {
    filtered = filtered.filter((course) => course.level === filters.value.level);
  }
  if (filters.value.price) {
    filtered = filtered.filter((course) => {
      if (filters.value.price === 'free') return course.price === 0;
      if (filters.value.price === 'paid') return course.price > 0;
      return true;
    });
  }
  if (filters.value.language) {
    filtered = filtered.filter(
      (course) => course.language === filters.value.language
    );
  }

  // Apply sorting
  switch (sortValue.value) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      break;
    case 'accepted':
      filtered = filtered.filter((course) => course.ispublished);
      break;
    case 'rejected':
      filtered = filtered.filter((course) => !course.ispublished);
      break;
    default:
      break;
  }

  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filtered.slice(start, start + itemsPerPage.value);
});

const fetchCourses = async () => {
  try {
    loading.value = true;
    const response = await api.get('course/courses/', {
      params: filters.value,
    });
    coursesList.value = response.data;
    console.log('Courses fetched:', response.data);
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    $toast.error('Failed to fetch courses');
  } finally {
    loading.value = false;
  }
};

const approveCourse = async (courseId) => {
  try {
    await api.patch(`course/courses/${courseId}/`, { ispublished: true });
    const course = coursesList.value.find((item) => item.id === courseId);
    if (course) course.ispublished = true;
    $toast.success('Course approved successfully!');
  } catch (error) {
    console.error('Failed to approve course:', error);
    $toast.error('Failed to approve course');
  }
};

const rejectCourse = async (courseId) => {
  try {
    await api.patch(`course/courses/${courseId}/`, { ispublished: false });
    const course = coursesList.value.find((item) => item.id === courseId);
    if (course) course.ispublished = false;
    $toast.success('Course rejected successfully!');
  } catch (error) {
    console.error('Failed to reject course:', error);
    $toast.error('Failed to reject course');
  }
};

const applyFilters = (newFilters) => {
  filters.value = newFilters;
  currentPage.value = 1;
  fetchCourses();
};

onMounted(() => {
  fetchCourses();
});
</script>