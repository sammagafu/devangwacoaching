<template>
  <b-col lg="8">
    <b-card no-body class="shadow rounded-2 p-0">
      <b-card-header class="border-bottom px-4 py-3">
        <ul class="nav nav-pills nav-tabs-line py-0" id="course-pills-tab">
          <li class="nav-item me-2 me-sm-4">
            <button class="nav-link mb-2 mb-md-0" :class="show === 1 && 'active'" @click="show = 1">Overview</button>
          </li>
          <li class="nav-item me-2 me-sm-4">
            <button class="nav-link mb-2 mb-md-0" :class="show === 2 && 'active'" @click="show = 2">Curriculum</button>
          </li>
          <li class="nav-item me-2 me-sm-4">
            <button class="nav-link mb-2 mb-md-0" :class="show === 3 && 'active'" @click="show = 3">Instructor</button>
          </li>
          <li class="nav-item me-2 me-sm-4">
            <button class="nav-link mb-2 mb-md-0" :class="show === 4 && 'active'" @click="show = 4">Reviews</button>
          </li>
          <li class="nav-item me-2 me-sm-4">
            <button class="nav-link mb-2 mb-md-0" :class="show === 5 && 'active'" @click="show = 5">FAQs</button>
          </li>
          <li class="nav-item me-2 me-sm-4">
            <button class="nav-link mb-2 mb-md-0" :class="show === 6 && 'active'" @click="show = 6">Comment</button>
          </li>
        </ul>
      </b-card-header>
      <b-card-body class="p-4">
        <OverviewTab v-if="show === 1" :course="course" />
        <CurriculumTab v-if="show === 2" :course="course" />
        <InstructorTab v-if="show === 3" :instructor="course.instructor" :course="course" />
        <ReviewsTab v-if="show === 4" :course="course" />
        <FaqTab v-if="show === 5" :course="course" />
        <CommentTab v-if="show === 6" :course="course" />
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OverviewTab from '@/views/pages/course/detail-classic/components/OverviewTab.vue';
import CurriculumTab from '@/views/pages/course/detail-classic/components/CurriculumTab.vue';
import InstructorTab from '@/views/pages/course/detail-classic/components//InstructorTab.vue';
import ReviewsTab from '@/views/pages/course/detail-classic/components//ReviewsTab.vue';
import FaqTab from '@/views/pages/course/detail-classic/components/FAQsTab.vue';
import CommentTab from '@/views/pages/course/detail-classic/components//CommentTab.vue';

const show = ref(1);

interface CourseType {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  image?: string;
  ispublished?: boolean;
  created_at?: string;
  instructor?: { id: number; email: string; full_name?: string; avatar?: string };
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

defineProps<{
  course: CourseType;
}>();
</script>