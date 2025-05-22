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
                        <h3 class="fw-bold mb-0 me-2">{{ currency }}{{ course.final_price ?? course.price }}</h3>
                        <span v-if="course.discount_percentage && parseFloat(course.discount_percentage) > 0"
                          class="text-decoration-line-through mb-0 me-2">{{ currency }}{{ course.price }}</span>
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
                      <b-dropdown-item href="#">
                        <font-awesome-icon :icon="faCopy" class="me-2" />
                        Copy link
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>

                  <div class="mt-3 d-sm-flex justify-content-sm-between">
                    <a href="#" class="btn btn-outline-primary mb-0">Free trial</a>
                    <b-button variant="success" class="mb-0" @click="enrollCourse" :disabled="addingToCart">
                      {{ addingToCart ? 'Adding...' : 'Enroll Now' }}
                    </b-button>
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

            <b-col md="6" lg="12">
              <b-card no-body class="card-body shadow p-4 mb-4">
                <h4 class="mb-3">Recently Viewed</h4>
                <b-row class="gx-3 mb-3">
                  <b-col cols="4">
                    <img class="rounded" :src="courses21" alt="">
                  </b-col>
                  <b-col cols="8">
                    <h6 class="mb-0"><a href="#">Fundamentals of Business Analysis</a></h6>
                    <ul class="list-group list-group-borderless mt-1 d-flex justify-content-between">
                      <li class="list-group-item px-0 d-flex justify-content-between">
                        <span class="text-success">{{ currency }}130</span>
                        <span class="h6 fw-light">4.5
                          <font-awesome-icon :icon="faStar" class="text-warning ms-1" />
                        </span>
                      </li>
                    </ul>
                  </b-col>
                </b-row>
                <b-row class="gx-3">
                  <b-col cols="4">
                    <img class="rounded" :src="courses18" alt="">
                  </b-col>
                  <b-col cols="8">
                    <h6 class="mb-0"><a href="#">The Complete Video Production Bootcamp</a></h6>
                    <ul class="list-group list-group-borderless mt-1 d-flex justify-content-between">
                      <li class="list-group-item px-0 d-flex justify-content-between">
                        <span class="text-success">{{ currency }}150</span>
                        <span class="h6 fw-light">4.0
                          <font-awesome-icon :icon="faStar" class="text-warning ms-1" />
                        </span>
                      </li>
                    </ul>
                  </b-col>
                </b-row>
              </b-card>

              <b-card no-body class="card-body shadow p-4">
                <h4 class="mb-3">Popular Tags</h4>
                <ul class="list-inline mb-0">
                  <li v-for="tag in course.tags" :key="tag" class="list-inline-item">
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

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useCartStore } from '@/stores/cart';
import { currency } from '@/helpers/constants';
import CustomGLightbox from '@/components/CustomGLightbox.vue';
import DetailTabs from '@/views/pages/course/detail-classic/components/DetailTabs.vue';
import { faShareAlt, faPlay, faStopwatch, faCopy, faBookOpen, faClock, faSignal, faGlobe, faUserClock, faMedal, faStar } from '@fortawesome/free-solid-svg-icons';
import { faTwitterSquare, faFacebookSquare, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import courses01 from '@/assets/images/courses/4by3/01.jpg';
import courses18 from '@/assets/images/courses/4by3/18.jpg';
import courses21 from '@/assets/images/courses/4by3/21.jpg';
import type { PropType } from 'vue';

const $toast = useToast();
const router = useRouter();
const cartStore = useCartStore();
const addingToCart = ref(false);

interface CourseType {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  image?: string;
  ispublished?: boolean;
  created_at?: string;
  instructor?: { id: number; email: string; full_name?: string };
  price?: string;
  final_price?: number;
  discount_percentage?: string;
  is_featured?: boolean;
  total_modules?: number;
  total_videos?: number;
  total_documents?: number;
  total_quizzes?: number;
  tags?: string[];
  category?: string;
  level?: string;
  language?: string;
  certificate?: boolean;
  rating?: number;
  duration?: string;
  student?: number;
  modules?: { title: string; lectures: { title: string; time: string; isPremium: boolean }[] }[];
  faqs?: { question: string; answer: string }[];
  reviews?: number;
  discount_deadline?: string;
  video_url?: string;
}

// Explicitly define props with type
const { course } = defineProps<{
  course: CourseType;
}>();

const enrollCourse = async () => {
  console.log('Course object in enrollCourse:', course); // Debug log
  if (!course?.id || !course?.title || !course?.slug) {
    $toast.error('Course data is incomplete.');
    return;
  }

  try {
    addingToCart.value = true;
    await cartStore.addToCart({
      id: course.id,
      title: course.title,
      slug: course.slug,
      type: 'course',
      image: course.image,
      final_price: course.final_price ?? parseFloat(course.price || '0'),
    });
    await cartStore.fetchCartItems();
    $toast.success('Course added to cart.');
    router.push('/checkout');
  } catch (error) {
    console.error('Failed to add course to cart:', error);
    $toast.error(error.message || 'Failed to add course to cart.');
  } finally {
    addingToCart.value = false;
  }
};

const formatDeadline = (deadline: string) => {
  const date = new Date(deadline);
  const now = new Date();
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? `${diffDays} days left at this price` : 'Offer expired';
};
</script>