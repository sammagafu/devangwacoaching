<template>
  <section
    class="home-section home-section--muted home-courses pb-5"
    data-aos="fade-up"
    data-aos-offset="90"
  >
    <b-container>
      <HomeSectionHeader
        :eyebrow="t.courses.eyebrow"
        :title="t.courses.title"
        :lead="t.courses.lead"
        center
      />
      <b-row>
        <div class="arrow-round arrow-blur arrow-hover">
          <CustomTinySlider
            v-if="isSliderReady && courses.length"
            :settings="settings"
            id="trending-courses"
            class="pb-1"
          >
            <div v-for="course in courses" :key="course.slug">
              <TrendingCoursesCard :item="course" />
            </div>
          </CustomTinySlider>
          <div v-else-if="loading" class="text-center py-5">
            <b-spinner variant="primary" />
            <p class="mt-3 mb-0 dw-muted">{{ t.courses.loading }}</p>
          </div>
          <div v-else class="text-center py-5">
            <p class="dw-muted mb-3">{{ t.courses.empty }}</p>
            <router-link :to="{ name: 'courses' }" class="btn btn-dw-primary">
              {{ t.courses.viewAll }}
            </router-link>
          </div>
        </div>
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HomeSectionHeader from '@/views/demos/default/components/HomeSectionHeader.vue'
import CustomTinySlider from '@/components/CustomTinySlider.vue'
import TrendingCoursesCard from '@/views/demos/default/components/TrendingCoursesCard.vue'
import { useHomeLocale } from '@/composables/useHomeLocale'
import courseService from '@/services/courseService'

const { t } = useHomeLocale()

const courses = ref([])
const loading = ref(true)
const isSliderReady = ref(false)

const settings = {
  arrowKeys: true,
  gutter: 30,
  autoplayButton: false,
  autoplayButtonOutput: false,
  nested: 'inner',
  autoplay: true,
  controls: true,
  edgePadding: 2,
  items: 3,
  nav: false,
  responsive: {
    1: { items: 1 },
    576: { items: 1 },
    768: { items: 2 },
    992: { items: 2 },
    1200: { items: 3 },
  },
}

function mapCourseForCard(course) {
  return {
    slug: course.slug,
    title: course.title,
    image: course.image,
    type: 'course',
    final_price: course.final_price,
    price: course.price,
    category: course.category,
    ribbon: course.is_featured ? 'Featured' : '',
    badges: (course.tags || []).slice(0, 2).map((tag) => ({ text: tag, class: 'primary' })),
    rating: course.rating || 0,
    reviews: course.reviews || 0,
    students: course.student || 0,
    time: course.duration,
    lectures: (course.total_videos || 0) + (course.total_documents || 0),
    instructor: {
      name: course.instructor?.full_name || 'Devangwa Coach',
      avatar: course.instructor?.avatar || null,
    },
  }
}

const fetchTrendingCourses = async () => {
  loading.value = true
  try {
    const list = await courseService.fetchCourses()
    const featured = list.filter((c) => c.is_featured)
    const source = featured.length ? featured : list
    courses.value = source.slice(0, 12).map(mapCourseForCard)
    isSliderReady.value = courses.value.length > 0
  } catch {
    courses.value = []
    isSliderReady.value = false
  } finally {
    loading.value = false
  }
}

onMounted(fetchTrendingCourses)
</script>
