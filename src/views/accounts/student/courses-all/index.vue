<template>
  <PagesLayout>
    <PageBanner />
    <PageContent
      :coursesList="coursesList"
      :loading="loading"
      v-model:searchQuery="searchQuery"
      v-model:sortValue="sortValue"
      v-model:currentPage="currentPage"
      :itemsPerPage="itemsPerPage"
      v-model:offcanvas="offcanvas"
      :filters="filters"
      :sortOptions="sortOptions"
      @apply-filters="applyFilters"
    />
    <Newsletter />
  </PagesLayout>
</template>
<script setup>
import PagesLayout from '@/layouts/PagesLayout.vue';
import PageContent from '@/views/accounts/student/courses-all/components/PageContent.vue';
import PageBanner from '@/views/accounts/student/courses-all/components/PageBanner.vue';
import Newsletter from '@/views/accounts/student/courses-all/components/Newsletter.vue';
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { api } from '@/services/authService';

const $toast = useToast();
const coursesList = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const sortValue = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const offcanvas = ref(false);
const filters = ref({});

const sortOptions = ref([
  { value: '', label: 'Sort by' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
]);

const fetchCourses = async () => {
  try {
    loading.value = true;
    const response = await api.get('course/courses/', {
      params: filters.value,
    });
    coursesList.value = response.data || [];
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    $toast.error('Failed to fetch courses');
    coursesList.value = [];
  } finally {
    loading.value = false;
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