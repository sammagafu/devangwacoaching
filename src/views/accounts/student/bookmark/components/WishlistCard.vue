<template>
  <b-card no-body class="border rounded-3">
    <router-link :to="{ name: 'course.detail', params: { slug: item.slug }}"><img :src="item.cover" class="card-img-top" alt="course img"></router-link>
    <b-card-body>
      <router-link
        v-if="item.slug"
        :to="{ name: 'course.detail', params: { slug: item.slug }}"
        class="h5 mb-2 d-block"
      >
        {{ item.title }}
      </router-link>
      <span v-else class="h5 mb-2 d-block">{{ item.title }}</span>
      <div class="d-flex align-items-center mb-3">
        <img
          :src="item.instructor?.avatar || defaultAvatar"
          class="avatar avatar-sm rounded-circle me-2"
          alt="instructor"
        >
        <span>{{ item.instructor?.full_name || 'Unknown Instructor' }}</span>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <span class="h6 fw-light">
          <font-awesome-icon :icon="faStar" class="text-warning me-1" />
          {{ item.rating || 4.5 }}
        </span>
        <span class="h6 fw-light">
          <font-awesome-icon :icon="faUserGraduate" class="text-primary me-1" />
          {{ item.student || 0 }}k Students
        </span>
      </div>
      <div class="mt-3">
        <b-button
          variant="success"
          class="w-100"
          @click="enrollCourse"
          :disabled="addingToCart"
        >
          {{ addingToCart ? 'Adding...' : 'Enroll Now' }}
        </b-button>
      </div>
    </b-card-body>
  </b-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useCartStore } from '@/stores/cart';
import { faStar, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import avatar01 from '@/assets/images/avatar/01.jpg';
import type { PropType } from 'vue';

const $toast = useToast();
const router = useRouter();
const cartStore = useCartStore();
const addingToCart = ref(false);
const defaultAvatar = avatar01;

interface CourseType {
  id: number;
  title: string;
  slug?: string;
  description: string;
  cover?: string;
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
  student?: number;
  rating?: number;
}

const { item } = defineProps<{
  item: CourseType;
}>();

const enrollCourse = async () => {
  console.log('Item object in enrollCourse:', item);
  if (!item?.id || !item?.title || !item?.slug) {
    console.warn('Course data is incomplete:', { id: item?.id, title: item?.title, slug: item?.slug });
    $toast.error('Course data is incomplete.');
    return;
  }

  try {
    addingToCart.value = true;
    await cartStore.addToCart({
      id: item.id,
      title: item.title,
      slug: item.slug,
      type: 'course',
      image: item.cover,
      price: item.price || '0',
      final_price: item.final_price ?? parseFloat(item.price || '0'),
    });
    await cartStore.fetchCartItems();
    $toast.success('Course added to cart.');
    router.push({name: 'shop.checkout'});
  } catch (error) {
    console.error('Failed to add course to cart:', error);
    $toast.error(error.message || 'Failed to add course to cart.');
  } finally {
    addingToCart.value = false;
  }
};
</script>

<style scoped>
.btn-success {
  font-weight: bold;
}
</style>