<template>
  <b-card no-body class="p-2 border">
    <div class="rounded-top overflow-hidden">
      <div class="card-overlay-hover">
        <img :src="item.image || defaultAvatar" class="card-img-top" alt="course img">
      </div>
      <div class="card-img-overlay">
        <div class="card-element-hover d-flex justify-content-end">
          <a href="#" class="icon-md bg-white rounded-circle text-center">
            <font-awesome-icon :icon="faShoppingCart" class="text-danger" />
          </a>
        </div>
      </div>
    </div>
    <b-card-body>
      <div class="d-flex justify-content-between">
        <ul class="list-inline hstack gap-2 mb-0">
          <li class="list-inline-item d-flex justify-content-center align-items-center">
            <div class="icon-md bg-orange bg-opacity-10 text-orange rounded-circle">
              <font-awesome-icon :icon="faUserGraduate" />
            </div>
            <span class="h6 fw-light ms-2 mb-0">{{ item.student || 'N/A' }}k</span>
          </li>
          <li class="list-inline-item d-flex justify-content-center align-items-center">
            <div class="icon-md bg-warning bg-opacity-15 text-warning rounded-circle">
              <font-awesome-icon :icon="faStar" />
            </div>
            <span class="h6 fw-light ms-2 mb-0">{{ item.rating || 4.5 }}</span>
          </li>
        </ul>
        <div class="avatar avatar-sm">
          <img class="avatar-img rounded-circle" :src="item.avatar || defaultAvatar" alt="avatar">
        </div>
      </div>
      <hr>
      <b-card-title tag="h5">
        <router-link :to="{ name: 'CourseDetail', params: { slug: item.slug }}">{{ item.title }}</router-link>
      </b-card-title>
      <div class="d-flex justify-content-between align-items-center">
        <a href="#" class="badge bg-info bg-opacity-10 text-info">
          <font-awesome-icon :icon="faCircle" class="small fw-bold me-1" />
          {{ item.category || 'General' }}
        </a>
        <h3 class="text-success mb-0">{{ currency }}{{ item.final_price || item.price }}</h3>
      </div>
    </b-card-body>
  </b-card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { faShoppingCart, faUserGraduate, faStar, faCircle } from '@fortawesome/free-solid-svg-icons';
import { currency } from '@/helpers/constants';
import avatar01 from '@/assets/images/avatar/01.jpg';

const defaultAvatar = avatar01;

defineProps({
  item: {
    type: Object as PropType<CourseType>,
    required: true,
  },
});

// Updated CourseType interface to match API response
interface CourseType {
  id: number;
  title: string;
  slug: string;
  description: string;
  image?: string;
  ispublished: boolean;
  created_at: string;
  instructor?: { id: number; email: string; full_name: string };
  price?: number;
  final_price?: number;
  discount_percentage?: number;
  is_featured?: boolean;
  total_modules?: number;
  total_videos?: number;
  total_documents?: number;
  total_quizzes?: number;
  tags?: string[];
  category?: string;
  level?: string;
  student?: number;
  rating?: number;
  avatar?: string;
}
</script>