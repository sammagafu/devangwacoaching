<template>
  <section class="pb-0 py-lg-5">
    <b-container>
      <b-row>
        <DetailTabs :course="course" />
        <b-col lg="4" class="pt-5 pt-lg-0">
          <b-row class="mb-5 mb-lg-0">
            <b-col md="6" lg="12">
              <b-card no-body class="shadow p-2 mb-4 z-index-9">
                <div class="overflow-hidden rounded-3">
                  <img :src="course.image" class="card-img" alt="course img">
                  <div class="bg-overlay bg-dark opacity-6"></div>
                  <div class="card-img-overlay d-flex align-items-start flex-column p-3">
                    <div class="m-auto">
                      <CustomGLightbox :link="course.video_url || 'https://www.youtube.com/embed/tXHviS-4ygo'"
                        class="btn btn-lg text-danger btn-round btn-white-shadow mb-0">
                        <font-awesome-icon :icon="faPlay" />
                      </CustomGLightbox>
                    </div>
                  </div>
                </div>

                <b-card-body class="px-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <div class="d-flex align-items-center">
                        <h3 class="fw-bold mb-0 me-2">{{ priceLabel }}</h3>
                        <span v-if="course.discount_percentage && parseFloat(course.discount_percentage) > 0"
                          class="text-decoration-line-through mb-0 me-2">{{ formatPrice(course.price) }}</span>
                        <span v-if="course.discount_percentage && parseFloat(course.discount_percentage) > 0"
                          class="badge text-bg-orange mb-0">{{ course.discount_percentage }}% off</span>
                      </div>
                      <p v-if="course.discount_deadline" class="mb-0 text-danger">
                        <font-awesome-icon :icon="faStopwatch" class="me-2" />
                        {{ formatDeadline(course.discount_deadline) }}
                      </p>
                    </div>

                    <b-dropdown end variant="link" toggle-class="btn btn-sm btn-light rounded small"
                      menu-class="dropdown-w-sm dropdown-menu-end shadow rounded" no-caret>
                      <template #button-content>
                        <font-awesome-icon :icon="faShareAlt" class="fa-fw" />
                      </template>
                      <b-dropdown-item href="#">
                        <font-awesome-icon :icon="faTwitterSquare" class="me-2" />
                        Twitter
                      </b-dropdown-item>
                      <b-dropdown-item href="#">
                        <font-awesome-icon :icon="faFacebookSquare" class="me-2" />
                        Facebook
                      </b-dropdown-item>
                      <b-dropdown-item href="#">
                        <font-awesome-icon :icon="faLinkedinIn" class="me-2" />
                        LinkedIn
                      </b-dropdown-item>
                      <b-dropdown-item href="#" @click.prevent="copyCourseLink">
                        <font-awesome-icon :icon="faCopy" class="me-2" />
                        Copy link
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>

                  <div class="mt-3 d-sm-flex justify-content-sm-between gap-2">
                    <router-link
                      v-if="isEnrolled"
                      :to="{ name: 'student.course.details', params: { slug: course.slug } }"
                      class="btn btn-success mb-0"
                    >
                      Go to Course
                    </router-link>
                    <template v-else>
                      <b-button variant="success" class="mb-0" @click="enrollCourse" :disabled="addingToCart">
                        {{ addingToCart ? 'Processing...' : (Number(course.final_price) > 0 ? 'Enroll Now' : 'Enroll Free') }}
                      </b-button>
                    </template>
                  </div>
                </b-card-body>
              </b-card>

              <b-card no-body class="card-body shadow p-4 mb-4">
                <h4 class="mb-3">This course includes</h4>
                <ul class="list-group list-group-borderless">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="h6 fw-light mb-0">
                      <font-awesome-icon :icon="faBookOpen" class="fa-fw text-primary" />
                      Lectures
                    </span>
                    <span>{{ course.total_videos || 0 }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="h6 fw-light mb-0">
                      <font-awesome-icon :icon="faClock" class="fa-fw text-primary" />
                      Duration
                    </span>
                    <span>{{ course.duration || 'N/A' }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="h6 fw-light mb-0">
                      <font-awesome-icon :icon="faSignal" class="fa-fw text-primary" />
                      Skills
                    </span>
                    <span>{{ course.level || 'Beginner' }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="h6 fw-light mb-0">
                      <font-awesome-icon :icon="faGlobe" class="fa-fw text-primary" />
                      Language
                    </span>
                    <span>{{ course.language || 'English' }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="h6 fw-light mb-0">
                      <font-awesome-icon :icon="faUserClock" class="fa-fw text-primary" />
                      Deadline
                    </span>
                    <span>{{ course.discount_deadline ? formatDeadline(course.discount_deadline) : 'N/A' }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="h6 fw-light mb-0">
                      <font-awesome-icon :icon="faMedal" class="fa-fw text-primary" />
                      Certificate
                    </span>
                    <span>{{ course.certificate ? 'Yes' : 'No' }}</span>
                  </li>
                </ul>
              </b-card>
            </b-col>

            <b-col md="6" lg="12" v-if="course.tags?.length">
              <b-card no-body class="card-body shadow p-4">
                <h4 class="mb-3">Popular Tags</h4>
                <ul class="list-inline mb-0">
                  <li v-for="(tag, idx) in course.tags" :key="`${tag}-${idx}`" class="list-inline-item">
                    <a class="btn btn-outline-light btn-sm" href="#">{{ tag }}</a>
                  </li>
                </ul>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import courseService from '@/services/courseService'
import { formatPrice } from '@/helpers/format'
import CustomGLightbox from '@/components/CustomGLightbox.vue';
import DetailTabs from '@/views/pages/course/detail-classic/components/DetailTabs.vue';
import { faShareAlt, faPlay, faStopwatch, faCopy, faBookOpen, faClock, faSignal, faGlobe, faUserClock, faMedal, faStar } from '@fortawesome/free-solid-svg-icons';
import { faTwitterSquare, faFacebookSquare, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const props = defineProps({
  course: { type: Object, required: true },
  isEnrolled: { type: Boolean, default: false },
});

const emit = defineEmits(['enrolled']);

const $toast = useToast();

const priceLabel = computed(() => formatPrice(props.course?.final_price ?? props.course?.price));

const copyCourseLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    $toast.success('Link copied to clipboard');
  } catch {
    $toast.error('Could not copy link');
  }
};
const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();
const addingToCart = ref(false);

const enrollCourse = async () => {
  const course = props.course;
  if (!course?.slug || !course?.title) {
    $toast.error('Course data is incomplete.');
    return;
  }

  if (!authStore.isAuthenticated) {
    router.push({ name: 'auth.sign-in', query: { redirectedFrom: router.currentRoute.value.fullPath } });
    return;
  }

  try {
    addingToCart.value = true;
    const price = Number(course.final_price ?? course.price ?? 0);

    if (price <= 0) {
      await courseService.enroll(course.slug);
      $toast.success('Successfully enrolled!');
      emit('enrolled');
      router.push({ name: 'student.course.details', params: { slug: course.slug } });
      return;
    }

    cartStore.addToCart({
      slug: course.slug,
      title: course.title,
      type: 'course',
      image: course.image,
      final_price: price,
    });
    router.push({ name: 'shop.checkout' });
  } catch (err) {
    const message = err?.response?.data?.detail || 'Failed to enroll. Please try again.'
    $toast.error(typeof message === 'string' ? message : 'Failed to enroll.')
  } finally {
    addingToCart.value = false;
  }
};

const formatDeadline = (deadline) => {
  const date = new Date(deadline);
  const now = new Date();
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? `${diffDays} days left at this price` : 'Offer expired';
};
</script>