<template>
  <PagesLayout :show-shop-cart="true">
    <PageBanner />
    <PageContent
      :courses-list="coursesList"
      :loading="loading"
      v-model:search-query="searchQuery"
      v-model:sort-value="sortValue"
      v-model:current-page="currentPage"
      :items-per-page="itemsPerPage"
      v-model:offcanvas="offcanvas"
      :filters="filters"
      :sort-options="sortOptions"
      @apply-filters="applyFilters"
    />
  </PagesLayout>
</template>

<script setup>
import PagesLayout from '@/layouts/PagesLayout.vue'
import PageContent from '@/views/accounts/student/courses-all/components/PageContent.vue'
import PageBanner from '@/views/accounts/student/courses-all/components/PageBanner.vue'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import courseService from '@/services/courseService'

const route = useRoute()
const $toast = useToast()
const coursesList = ref([])
const loading = ref(false)
const searchQuery = ref('')
const sortValue = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(9)
const offcanvas = ref(false)
const filters = ref({})

const sortOptions = [
  { value: '', label: 'Sort by' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
]

const fetchCourses = async () => {
  try {
    loading.value = true
    coursesList.value = await courseService.fetchCourses(filters.value)
  } catch {
    $toast.error('Could not load courses. Please try again.')
    coursesList.value = []
  } finally {
    loading.value = false
  }
}

const applyFilters = (newFilters) => {
  filters.value = newFilters
  currentPage.value = 1
  fetchCourses()
}

onMounted(() => {
  if (typeof route.query.q === 'string' && route.query.q.trim()) {
    searchQuery.value = route.query.q.trim()
  }
  fetchCourses()
})

watch(
  () => route.query.q,
  (q) => {
    if (typeof q === 'string') searchQuery.value = q.trim()
  }
)
</script>
