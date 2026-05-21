<template>
  <b-col xl="4">
    <CustomStickyElement data-sticky data-margin-top="80" data-sticky-for="768">
      <b-row class="g-4">
        <b-col md="6" xl="12">
          <b-card no-body class="card-body border p-4">
            <div class="d-flex justify-content-between align-items-center">
              <h3 class="fw-bold mb-0 me-2">{{ currency }}{{ price }}</h3>
            </div>

            <div class="mt-3 d-grid">
              <router-link
                v-if="isEnrolled"
                :to="{ name: 'student.course.details', params: { slug: courseSlug } }"
                class="btn btn-success"
              >
                Go to Course
              </router-link>
              <b-button
                v-else
                variant="primary"
                :disabled="loading"
                @click="enrollCourse"
              >
                <b-spinner v-if="loading" small class="me-2" />
                {{ loading ? 'Processing...' : (price > 0 ? 'Enroll Now' : 'Enroll Free') }}
              </b-button>
            </div>
            <hr>

            <h5 class="mb-3">This course includes</h5>
            <ul class="list-group list-group-borderless border-0">
              <li class="list-group-item px-0 d-flex justify-content-between">
                <span class="h6 fw-light mb-0">
                  <font-awesome-icon :icon="faBookOpen" class="fa-fw text-primary" />
                  Lectures
                </span>
                <span>{{ lecturesCount }}</span>
              </li>
              <li class="list-group-item px-0 d-flex justify-content-between">
                <span class="h6 fw-light mb-0">
                  <font-awesome-icon :icon="faClock" class="fa-fw text-primary" />
                  Duration
                </span>
                <span>{{ duration }}</span>
              </li>
            </ul>
          </b-card>
        </b-col>

        <b-col md="6" xl="12" v-if="tags.length">
          <b-card no-body class="card-body border p-4">
            <h4 class="mb-3">Popular Tags</h4>
            <ul class="list-inline mb-0">
              <li class="list-inline-item" v-for="(tag, index) in tags" :key="index">
                <span class="btn btn-outline-light btn-sm">{{ tag }}</span>
              </li>
            </ul>
          </b-card>
        </b-col>
      </b-row>
    </CustomStickyElement>
  </b-col>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { currency } from '@/helpers/constants';
import CustomStickyElement from '@/components/CustomStickyElement.vue';
import courseService from '@/services/courseService';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import { faBookOpen, faClock } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  courseSlug: { type: String, required: true },
  price: { type: Number, default: 0 },
  lecturesCount: { type: Number, default: 0 },
  duration: { type: String, default: '0h 0m' },
  tags: { type: Array, default: () => [] },
});

const router = useRouter();
const $toast = useToast();
const cartStore = useCartStore();
const authStore = useAuthStore();
const isEnrolled = ref(false);
const loading = ref(false);

const checkEnrollment = async () => {
  if (!authStore.isAuthenticated) return;
  try {
    isEnrolled.value = await courseService.isEnrolled(props.courseSlug);
  } catch {
    isEnrolled.value = false;
  }
};

const enrollCourse = async () => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'auth.sign-in', query: { redirectedFrom: router.currentRoute.value.fullPath } });
    return;
  }

  loading.value = true;
  try {
    if (props.price <= 0) {
      await courseService.enroll(props.courseSlug);
      isEnrolled.value = true;
      $toast.success('Successfully enrolled!');
      router.push({ name: 'student.course.details', params: { slug: props.courseSlug } });
      return;
    }

    const course = await courseService.fetchCourse(props.courseSlug);
    cartStore.addToCart({
      slug: course.slug,
      title: course.title,
      type: 'course',
      image: course.image,
      final_price: course.final_price,
    });
    router.push({ name: 'shop.checkout' });
  } catch (err) {
    $toast.error(err.response?.data?.detail || 'Failed to enroll. Please try again.');
  } finally {
    loading.value = false;
  }
};

onMounted(checkEnrollment);
</script>
