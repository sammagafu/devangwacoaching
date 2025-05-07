<template>
  <PagesLayout>
    <PageContent />
  </PagesLayout>
</template>
<script setup>
import PagesLayout from '@/layouts/PagesLayout.vue';
// import PageContent from '@/components/PageContent.vue';
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
import PageContent from '@/views/accounts/student/courses-all/components/PageContent.vue';

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
    // Map API data to ProductType
    badge: course.category
      ? { class: 'primary', text: course.category }
      : undefined,
    isLike: false, // Mock; replace with API field if available
    rating: course.rating || 4.5, // Mock; replace with API field
    duration: course.duration || '10h 30m', // Mock; replace with API field
    lectures: course.lectures || 20, // Mock; replace with API field
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

const activatedCoursesCount = computed(() => {
  return coursesList.value.filter((course) => course.ispublished).length;
});

const pendingCoursesCount = computed(() => {
  return coursesList.value.filter((course) => !course.ispublished).length;
});

const fetchCourses = async () => {
  try {
    loading.value = true;
    const response = await api.get('course/courses/', {
      params: filters.value,
    });
    coursesList.value = response.data;
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

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

onMounted(() => {
  fetchCourses();
});
</script>