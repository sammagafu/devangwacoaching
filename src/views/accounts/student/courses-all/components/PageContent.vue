<template>
  <section class="py-5">
    <b-container>
      <b-row>
        <b-col lg="4" xl="3" class="d-lg-block" :class="{ 'd-none': !offcanvas }">
          <b-offcanvas
            :value="offcanvas"
            @update:value="$emit('update:offcanvas', $event)"
            placement="end"
            class="w-auto"
            :backdrop="true"
            :no-header-close="true"
            :no-close-on-esc="true"
            :no-close-on-backdrop="true"
            title="Filters"
            responsive="lg"
          >
            <Filter @filter-applied="$emit('apply-filters', $event)" />
          </b-offcanvas>
        </b-col>
        <b-col lg="8" xl="9">
          <b-row class="mb-4 align-items-center">
            <b-col xl="6">
              <b-form class="border rounded p-2">
                <div class="input-group input-borderless">
                  <b-form-input
                    type="search"
                    class="me-1"
                    placeholder="Find your course"
                    :value="searchQuery"
                    @input="$emit('update:searchQuery', $event)"
                  />
                  <b-button type="button" variant="primary" class="mb-0 rounded z-index-1">
                    <font-awesome-icon :icon="faSearch" />
                  </b-button>
                </div>
              </b-form>
            </b-col>
            <b-col xl="3" class="mt-3 mt-xl-0">
              <b-form class="border rounded p-2 input-borderless">
                <select
                  :value="sortValue"
                  @input="$emit('update:sortValue', $event.target.value)"
                  class="form-select-sm border-0"
                >
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
                @click="$emit('update:offcanvas', !offcanvas)"
              >
                <font-awesome-icon :icon="faSlidersH" class="me-1" />
                Show filter
              </b-button>
              <p v-if="coursesList" class="mb-0 text-end">
                Showing {{ filteredCourses.length }} of {{ coursesList.length }} results
              </p>
              <p v-else class="mb-0 text-end">
                No courses available
              </p>
            </b-col>
          </b-row>
          <b-row v-if="loading" class="g-4">
            <b-col cols="12" class="text-center">
              <b-spinner variant="primary" />
            </b-col>
          </b-row>
          <b-row v-else-if="coursesList && coursesList.length" class="g-4">
            <b-col sm="6" xl="4" v-for="(item, idx) in filteredCourses" :key="idx">
              <CourseCard :item="item" />
            </b-col>
          </b-row>
          <b-row v-else class="g-4">
            <b-col cols="12" class="text-center">
              <p>No courses found</p>
            </b-col>
          </b-row>
          <b-col v-if="coursesList && coursesList.length" cols="12">
            <nav class="mt-4 d-flex justify-content-center" aria-label="navigation">
              <ul class="pagination pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                <li class="page-item mb-0">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="$emit('update:currentPage', currentPage - 1)"
                    :class="{ disabled: currentPage === 1 }"
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
                  <a class="page-link" href="#" @click.prevent="$emit('update:currentPage', page)">
                    {{ page }}
                  </a>
                </li>
                <li class="page-item mb-0">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="$emit('update:currentPage', currentPage + 1)"
                    :class="{ disabled: currentPage === totalPages }"
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
import { computed, defineProps, defineEmits, onMounted } from 'vue';
import {
  faSearch,
  faSlidersH,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import CourseCard from '@/views/accounts/student/courses-all/components/CourseCard.vue';
import Filter from '@/views/accounts/student/courses-all/components/Filter.vue';

const props = defineProps({
  coursesList: { type: Array, required: true, default: () => [] },
  loading: { type: Boolean, required: true },
  searchQuery: { type: String, required: true },
  sortValue: { type: String, required: true },
  currentPage: { type: Number, required: true },
  itemsPerPage: { type: Number, required: true },
  offcanvas: { type: Boolean, required: true },
  filters: { type: Object, required: true },
  sortOptions: { type: Array, required: true },
});

defineEmits(['apply-filters', 'update:offcanvas', 'update:searchQuery', 'update:sortValue', 'update:currentPage']);

// Debug logging to verify props
onMounted(() => {
  console.log('PageContent props:', {
    coursesList: props.coursesList,
    loading: props.loading,
    searchQuery: props.searchQuery,
    sortValue: props.sortValue,
    currentPage: props.currentPage,
    itemsPerPage: props.itemsPerPage,
    offcanvas: props.offcanvas,
    filters: props.filters,
    sortOptions: props.sortOptions,
  });
});

interface ProductType {
  id: number;
  title: string;
  slug: string;
  description: string;
  image?: string;
  ispublished: boolean;
  created_at: string;
  instructor?: { id: number; email: string; full_name: string };
  price?: number;
  final_price?: number;
  discount_percentage?: number;
  is_featured?: boolean;
  total_modules?: number;
  total_videos?: number;
  tags?: string[];
  rating: number;
  duration?: string;
  lectures?: number;
  category?: string;
  level?: string;
  language?: string;
  badge?: { class: string; text: string };
  isLike?: boolean;
}

const totalPages = computed(() => {
  return props.coursesList ? Math.ceil(props.coursesList.length / props.itemsPerPage) : 1;
});

const filteredCourses = computed(() => {
  if (!props.coursesList) return [];

  let filtered = [...props.coursesList].map((course) => ({
    ...course,
    image: course.cover || '',
    instructor: course.instructor,
    price: parseFloat(course.price) || 0,
    final_price: parseFloat(course.final_price) || parseFloat(course.price) || 0,
    discount_percentage: parseFloat(course.discount_percentage) || 0,
    is_featured: course.is_featured || false,
    total_modules: course.total_modules || 10,
    total_videos: course.total_videos || 10,
    tags: course.tags || [],
    rating: parseFloat(course.rating) || 4.5,
    duration: course.duration || `${course.total_videos || 10}h 0m`,
    lectures: course.total_modules || 10,
    category: course.tags?.length > 0 ? course.tags[0] : 'general',
    level: course.level || 'beginner',
    language: course.language || 'english',
    badge: course.is_featured
      ? { class: 'success', text: 'Featured' }
      : course.tags?.length > 0
      ? { class: 'primary', text: course.tags[0] }
      : { class: 'info', text: 'General' },
    isLike: false,
  }));

  // Apply search
  if (props.searchQuery) {
    filtered = filtered.filter((course) =>
      course.title.toLowerCase().includes(props.searchQuery.toLowerCase())
    );
  }

  // Apply filters
  if (props.filters.category) {
    filtered = filtered.filter((course) => course.category === props.filters.category);
  }
  if (props.filters.level) {
    filtered = filtered.filter((course) => course.level === props.filters.level);
  }
  if (props.filters.price) {
    filtered = filtered.filter((course) => {
      if (props.filters.price === 'free') return course.price === 0;
      if (props.filters.price === 'paid') return course.price > 0;
      return true;
    });
  }
  if (props.filters.language) {
    filtered = filtered.filter((course) => course.language === props.filters.language);
  }

  // Apply sorting
  switch (props.sortValue) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      break;
    default:
      break;
  }

  const start = (props.currentPage - 1) * props.itemsPerPage;
  return filtered.slice(start, start + props.itemsPerPage);
});
</script>