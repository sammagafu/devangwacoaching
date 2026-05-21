<template>
  <section class="bg-light py-0 py-sm-5">
    <b-container>
      <nav aria-label="breadcrumb" class="pt-4">
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'courses' }">Courses</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ course.title || 'Course' }}</li>
        </ol>
      </nav>
      <b-row class="py-4 pb-5">
        <b-col lg="8">
          <span class="mb-3 badge bg-primary bg-opacity-10 text-primary">{{ course.category || 'General' }}</span>
          <h1 class="mb-3">{{ course.title || 'Course' }}</h1>
          <p class="lead text-muted">{{ descriptionText }}</p>
          <ul class="list-inline mb-0">
            <li v-if="course.rating" class="list-inline-item me-3 mb-2">
              <font-awesome-icon :icon="faStar" class="text-warning me-1" />
              {{ course.rating }}/5
            </li>
            <li class="list-inline-item me-3 mb-2 text-muted">
              <font-awesome-icon :icon="faUserGraduate" class="me-1" />
              {{ course.student || 0 }} enrolled
            </li>
            <li class="list-inline-item me-3 mb-2 text-muted">
              <font-awesome-icon :icon="faBookOpen" class="me-1" />
              {{ course.total_videos || 0 }} lectures
            </li>
            <li v-if="course.updated_at" class="list-inline-item mb-2 text-muted">
              Updated {{ formatDate(course.updated_at) }}
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { faStar, faUserGraduate, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { truncate } from '@/helpers/format'

const props = defineProps({
  course: { type: Object, required: true },
})

const descriptionText = computed(() =>
  truncate(props.course.description, 280) || 'No description available.'
)

const formatDate = (date) =>
  new Date(date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
</script>
