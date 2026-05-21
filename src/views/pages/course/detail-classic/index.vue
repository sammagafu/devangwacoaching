<template>
  <PagesLayout :show-shop-cart="true">
    <div v-if="loading" class="text-center py-5">
      <b-spinner variant="primary" />
      <p class="mt-3 text-muted">Loading course…</p>
    </div>
    <div v-else-if="error" class="text-center py-5">
      <h4 class="text-danger">{{ error }}</h4>
      <router-link :to="{ name: 'courses' }" class="btn btn-primary mt-3">Back to courses</router-link>
    </div>
    <template v-else>
      <PageIntro :course="course" />
      <PageContent :course="course" :is-enrolled="isEnrolled" @enrolled="checkEnrollment" />
      <ListedCourses :course="course" />
    </template>
  </PagesLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import PagesLayout from '@/layouts/PagesLayout.vue'
import PageIntro from '@/views/pages/course/detail-classic/components/PageIntro.vue'
import PageContent from '@/views/pages/course/detail-classic/components/PageContent.vue'
import ListedCourses from '@/views/pages/course/detail-classic/components/ListedCourses.vue'
import courseService from '@/services/courseService'
import { useAuthStore } from '@/stores/auth'

const $toast = useToast()
const route = useRoute()
const authStore = useAuthStore()
const course = ref({})
const loading = ref(true)
const error = ref(null)
const isEnrolled = ref(false)

const checkEnrollment = async () => {
  if (!authStore.isAuthenticated) {
    isEnrolled.value = false
    return
  }
  try {
    isEnrolled.value = await courseService.isEnrolled(route.params.slug)
  } catch {
    isEnrolled.value = false
  }
}

const fetchCourse = async () => {
  try {
    loading.value = true
    error.value = null
    course.value = await courseService.fetchCourse(route.params.slug)
    await checkEnrollment()
  } catch (err) {
    error.value =
      err.response?.status === 404
        ? 'This course could not be found.'
        : 'Failed to load course. Please try again.'
    $toast.error(error.value)
  } finally {
    loading.value = false
  }
}

onMounted(fetchCourse)
</script>
