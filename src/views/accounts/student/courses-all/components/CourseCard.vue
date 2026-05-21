<template>
  <b-card no-body class="shadow h-100 course-card">
    <router-link :to="{ name: 'course.detail', params: { slug: item.slug } }" class="text-decoration-none">
      <img
        :src="item.image || defaultImage"
        class="card-img-top"
        alt=""
        style="height: 180px; object-fit: cover;"
        loading="lazy"
      >
    </router-link>
    <b-card-body class="pb-0 d-flex flex-column">
      <span v-if="item.badge?.text" :class="`badge bg-${item.badge.class} bg-opacity-10 text-${item.badge.class} align-self-start mb-2`">
        {{ item.badge.text }}
      </span>
      <b-card-title tag="h5" class="mb-2">
        <router-link :to="{ name: 'course.detail', params: { slug: item.slug } }" class="text-dark stretched-link">
          {{ item.title }}
        </router-link>
      </b-card-title>
      <p class="mb-2 text-muted small flex-grow-1">{{ descriptionPreview }}</p>
      <p v-if="item.instructor?.full_name" class="mb-2 small">
        <span class="text-muted">Instructor:</span> {{ item.instructor.full_name }}
      </p>
      <div class="d-flex align-items-center justify-content-between mb-2">
        <span class="h5 mb-0" :class="isFree ? 'text-success' : 'text-primary'">
          {{ priceLabel }}
        </span>
        <span v-if="item.rating > 0" class="small">
          <font-awesome-icon :icon="faStar" class="text-warning me-1" />
          {{ item.rating }}
        </span>
      </div>
    </b-card-body>
    <b-card-footer class="pt-0 pb-3 bg-transparent border-0">
      <div class="d-flex justify-content-between small text-muted mb-3">
        <span><font-awesome-icon :icon="faClock" class="me-1" />{{ item.duration || '—' }}</span>
        <span>{{ item.lectures || 0 }} items</span>
      </div>
      <router-link :to="{ name: 'course.detail', params: { slug: item.slug } }" class="btn btn-primary w-100">
        View course
      </router-link>
    </b-card-footer>
  </b-card>
</template>

<script setup>
import { computed } from 'vue'
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons'
import { formatPrice, truncate } from '@/helpers/format'

const defaultImage = '/default-course-image.jpg'

const props = defineProps({
  item: { type: Object, required: true },
})

const descriptionPreview = computed(() => truncate(props.item.description, 100))
const isFree = computed(() => Number(props.item.final_price) <= 0)
const priceLabel = computed(() => formatPrice(props.item.final_price))
</script>

<style scoped>
.course-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1) !important;
}
</style>
