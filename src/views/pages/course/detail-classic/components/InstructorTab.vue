<template>
  <div>
    <b-card no-body class="mb-0 mb-md-4">
      <b-row class="g-0 align-items-center">
        <b-col md="5">
          <img :src="instructor.avatar || defaultAvatar" class="img-fluid rounded-3" alt="instructor-img">
        </b-col>
        <b-col md="7">
          <b-card-body>
            <b-card-title tag="h3" class="mb-0">{{ instructor.full_name || instructor.email || 'Unknown Instructor' }}</b-card-title>
            <p class="mb-2">Instructor of {{ course.category || 'General' }}</p>
            <ul class="list-inline mb-3 hstack gap-1">
              <li class="list-inline-item me-3">
                <a href="#" class="fs-5 text-twitter"><font-awesome-icon :icon="faTwitterSquare" /></a>
              </li>
              <li class="list-inline-item me-3">
                <a href="#" class="fs-5 text-instagram"><font-awesome-icon :icon="faInstagramSquare" /></a>
              </li>
              <li class="list-inline-item me-3">
                <a href="#" class="fs-5 text-facebook"><font-awesome-icon :icon="faFacebookSquare" /></a>
              </li>
              <li class="list-inline-item me-3">
                <a href="#" class="fs-5 text-linkedin"><font-awesome-icon :icon="faLinkedinIn" /></a>
              </li>
              <li class="list-inline-item">
                <a href="#" class="fs-5 text-youtube"><font-awesome-icon :icon="faYoutubeSquare" /></a>
              </li>
            </ul>
            <ul class="list-inline">
              <li class="list-inline-item">
                <div class="d-flex align-items-center me-3 mb-2">
                  <span class="icon-md bg-orange bg-opacity-10 text-orange rounded-circle">
                    <font-awesome-icon :icon="faUserGraduate" />
                  </span>
                  <span class="h6 fw-light mb-0 ms-2">{{ course.student || 0 }}</span>
                </div>
              </li>
              <li class="list-inline-item">
                <div class="d-flex align-items-center me-3 mb-2">
                  <span class="icon-md bg-warning bg-opacity-15 text-warning rounded-circle">
                    <font-awesome-icon :icon="faStar" />
                  </span>
                  <span class="h6 fw-light mb-0 ms-2">{{ course.rating || 4.5 }}</span>
                </div>
              </li>
              <li class="list-inline-item">
                <div class="d-flex align-items-center me-3 mb-2">
                  <span class="icon-md bg-danger bg-opacity-10 text-danger rounded-circle">
                    <font-awesome-icon :icon="faPlay" />
                  </span>
                  <span class="h6 fw-light mb-0 ms-2">{{ course.total_modules || 0 }} Courses</span>
                </div>
              </li>
              <li class="list-inline-item">
                <div class="d-flex align-items-center me-3 mb-2">
                  <span class="icon-md bg-info bg-opacity-10 text-info rounded-circle">
                    <font-awesome-icon :icon="faCommentDots" />
                  </span>
                  <span class="h6 fw-light mb-0 ms-2">{{ course.reviews || 0 }}</span>
                </div>
              </li>
            </ul>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>

    <h5 class="mb-3">About Instructor</h5>
    <p class="mb-3">{{ instructor.bio || `Experienced instructor specializing in ${course.category || 'various'} topics.` }}</p>
    <p class="mb-3">{{ instructor.full_name || 'The instructor' }} brings years of expertise to help students achieve their learning goals.</p>

    <b-col cols="12">
      <ul class="list-group list-group-borderless mb-0">
        <li class="list-group-item pb-0">Mail ID: <a href="#" class="ms-2">{{ instructor.email || 'N/A' }}</a></li>
        <li class="list-group-item pb-0">Web: <a href="#" class="ms-2">{{ instructor.website || 'https://eduport.com' }}</a></li>
      </ul>
    </b-col>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import avatar01 from '@/assets/images/avatar/01.jpg';
import { faPlay, faUserGraduate, faStar, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faTwitterSquare, faInstagramSquare, faFacebookSquare, faLinkedinIn, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';

const defaultAvatar = avatar01;

interface InstructorType {
  id: number;
  email: string;
  full_name?: string;
  avatar?: string;
  bio?: string;
  website?: string;
}

interface CourseType {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  image?: string;
  ispublished?: boolean;
  created_at?: string;
  instructor?: InstructorType;
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
}

defineProps({
  instructor: {
    type: Object as PropType<InstructorType>,
    required: true,
  },
  course: {
    type: Object as PropType<CourseType>,
    required: true,
  },
});
</script>