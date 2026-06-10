<template>
  <section class="py-5">
    <b-container>
      <b-row>
        <b-col lg="4" xl="3">
          <div class="d-none d-lg-block home-courses-filter-sidebar">
            <Filter :courses="coursesList" @filter-applied="$emit('apply-filters', $event)" />
          </div>
          <b-offcanvas
            :model-value="offcanvas"
            @update:model-value="$emit('update:offcanvas', $event)"
            placement="end"
            title="Filter programmes"
            class="d-lg-none"
          >
            <Filter :courses="coursesList" @filter-applied="$emit('apply-filters', $event)" />
          </b-offcanvas>
        </b-col>
        <b-col lg="8" xl="9">
          <b-row class="mb-4 g-3 align-items-center">
            <b-col md="7">
              <b-form @submit.prevent>
                <b-input-group>
                  <b-form-input
                    :model-value="searchQuery"
                    type="search"
                    placeholder="Search programmes by title…"
                    aria-label="Search programmes"
                    @update:model-value="$emit('update:searchQuery', $event)"
                  />
                  <b-button type="button" variant="primary">
                    <font-awesome-icon :icon="faSearch" />
                  </b-button>
                </b-input-group>
              </b-form>
            </b-col>
            <b-col md="3">
              <b-form-select
                :model-value="sortValue"
                size="sm"
                @update:model-value="$emit('update:sortValue', $event)"
              >
                <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </b-form-select>
            </b-col>
            <b-col cols="12" md="2" class="text-md-end">
              <b-button variant="outline-primary" class="d-lg-none mb-0" @click="$emit('update:offcanvas', true)">
                <font-awesome-icon :icon="faSlidersH" class="me-1" />
                Filters
              </b-button>
            </b-col>
          </b-row>

          <p class="text-muted small mb-4">
            {{ loading ? 'Loading…' : `Showing ${filteredCourses.length} of ${coursesList.length} programmes` }}
          </p>

          <div v-if="loading" class="row g-4">
            <b-col v-for="n in 6" :key="n" sm="6" xl="4">
              <b-card class="shadow-sm border-0">
                <div class="placeholder-glow">
                  <span class="placeholder col-12 rounded-top" style="height: 11rem" />
                </div>
                <b-card-body>
                  <div class="placeholder-glow">
                    <span class="placeholder col-10 mb-2" />
                    <span class="placeholder col-7" />
                  </div>
                </b-card-body>
              </b-card>
            </b-col>
          </div>

          <div v-else-if="filteredCourses.length" class="row g-4">
            <b-col v-for="item in filteredCourses" :key="item.slug" sm="6" xl="4">
              <CourseCard :item="item" />
            </b-col>
          </div>

          <div v-else class="text-center py-5">
            <h5 class="text-muted">No programmes match your filters</h5>
            <p class="mb-3">Try a different keyword, focus area, or clear filters.</p>
            <b-button variant="outline-primary" @click="clearAll">Clear filters</b-button>
          </div>

          <nav
            v-if="!loading && totalPages > 1"
            class="mt-4 d-flex justify-content-center"
            aria-label="Course pagination"
          >
            <ul class="pagination pagination-primary-soft mb-0">
              <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                <a class="page-link" href="#" @click.prevent="goPage(currentPage - 1)">Prev</a>
              </li>
              <li
                v-for="page in totalPages"
                :key="page"
                class="page-item"
                :class="{ active: page === currentPage }"
              >
                <a class="page-link" href="#" @click.prevent="goPage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
                <a class="page-link" href="#" @click.prevent="goPage(currentPage + 1)">Next</a>
              </li>
            </ul>
          </nav>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons'
import CourseCard from '@/views/accounts/student/courses-all/components/CourseCard.vue'
import Filter from '@/views/accounts/student/courses-all/components/Filter.vue'
import { courseMatchesFocus } from '@/helpers/courseFilters'

const props = defineProps({
  coursesList: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  searchQuery: { type: String, default: '' },
  sortValue: { type: String, default: '' },
  currentPage: { type: Number, default: 1 },
  itemsPerPage: { type: Number, default: 9 },
  offcanvas: { type: Boolean, default: false },
  filters: { type: Object, default: () => ({}) },
  sortOptions: { type: Array, default: () => [] },
})

const emit = defineEmits([
  'apply-filters',
  'update:offcanvas',
  'update:searchQuery',
  'update:sortValue',
  'update:currentPage',
  'clear-filters',
])

const normalizedCourses = computed(() =>
  (props.coursesList || []).map((course) => ({
    ...course,
    image: course.image || course.cover,
    final_price: Number(course.final_price ?? course.price ?? 0),
    price: Number(course.price ?? course.final_price ?? 0),
    rating: Number(course.rating) || 0,
    duration: course.duration || `${(course.total_videos || 0) + (course.total_documents || 0)} items`,
    lectures: (course.total_videos || 0) + (course.total_documents || 0) + (course.total_quizzes || 0),
    category: course.category || course.tags?.[0] || 'General',
    level: course.level || 'All levels',
    language: course.language || 'English',
    badge: course.is_featured
      ? { class: 'success', text: 'Featured' }
      : { class: 'info', text: course.category },
  }))
)

const filteredList = computed(() => {
  let list = [...normalizedCourses.value]
  const q = props.searchQuery?.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (c) =>
        c.title?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.instructor?.full_name?.toLowerCase().includes(q)
    )
  }
  if (props.filters?.focus) {
    list = list.filter((c) => courseMatchesFocus(c, props.filters.focus))
  }
  if (props.filters?.price === 'free') list = list.filter((c) => c.final_price <= 0)
  if (props.filters?.price === 'paid') list = list.filter((c) => c.final_price > 0)

  switch (props.sortValue) {
    case 'newest':
      list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      break
    case 'oldest':
      list.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      break
    case 'price-low':
      list.sort((a, b) => a.final_price - b.final_price)
      break
    case 'price-high':
      list.sort((a, b) => b.final_price - a.final_price)
      break
    default:
      break
  }
  return list
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredList.value.length / props.itemsPerPage))
)

const filteredCourses = computed(() => {
  const start = (props.currentPage - 1) * props.itemsPerPage
  return filteredList.value.slice(start, start + props.itemsPerPage)
})

const goPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  emit('update:currentPage', page)
}

const clearAll = () => {
  emit('update:searchQuery', '')
  emit('clear-filters')
  emit('update:currentPage', 1)
}
</script>

<style scoped>
.home-courses-filter-sidebar {
  position: sticky;
  top: 5.5rem;
}
</style>
