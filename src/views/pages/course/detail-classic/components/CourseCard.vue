<template>
  <b-card no-body class="p-2 border">
    <div class="rounded-top overflow-hidden">
      <div class="card-overlay-hover">
        <img :src="item.image || defaultAvatar" class="card-img-top" alt="course img">
      </div>
      <div class="card-img-overlay">
        <div class="card-element-hover d-flex justify-content-end">
          <b-button variant="danger" size="sm" @click="enrollCourse" :disabled="addingToCart">
            {{ addingToCart ? 'Adding...' : 'Enroll' }}
          </b-button>
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
            <span class="h6 fw-light ms-2 mb-0">{{ item.student || 0 }}k</span>
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
        <router-link
          v-if="item.slug"
          :to="{ name: 'course.detail', params: { slug: item.slug }}"
        >
          {{ item.title }}
        </router-link>
        <span v-else>{{ item.title }}</span>
      </b-card-title>
      <div class="d-flex justify-content-between align-items-center">
        <a href="#" class="badge bg-info bg-opacity-10 text-info">
          <font-awesome-icon :icon="faCircle" class="small fw-bold me-1" />
          {{ item.category || 'General' }}
        </a>
        <h3 class="text-success mb-0">{{ currency }}{{ item.final_price ?? item.price }}</h3>
      </div>
    </b-card-body>
  </b-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PropType } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';
import { faUserGraduate, faStar, faCircle } from '@fortawesome/free-solid-svg-icons';
import { currency } from '@/helpers/constants';
import avatar01 from '@/assets/images/avatar/01.jpg';
import { useCartStore } from '@/stores/cart';

const defaultAvatar = avatar01;
const $toast = useToast();
const router = useRouter();
const cartStore = useCartStore();
const addingToCart = ref(false);

interface CourseType {
  id: number;
  title: string;
  slug?: string;
  description: string;
  image?: string;
  ispublished: boolean;
  created_at: string;
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
  student?: number;
  rating?: number;
  avatar?: string;
}

defineProps({
  item: {
    type: Object as PropType<CourseType>,
    required: true,
  },
});

const enrollCourse = async () => {
  if (!item.id || !item.title || !item.slug) {
    $toast.error('Course data is incomplete.');
    return;
  }
  try {
    addingToCart.value = true;
    cartStore.addToCart({
      id: item.id,
      title: item.title,
      slug: item.slug,
      type: 'course',
      image: item.image,
      final_price: item.final_price ?? parseFloat(item.price || '0'),
    });
    await cartStore.fetchCartItems();
    router.push('/checkout');
  } catch (error) {
    console.error('Failed to add course to cart:', error);
    $toast.error('Failed to add course to cart.');
  } finally {
    addingToCart.value = false;
  }
};
</script>

<style scoped>
.btn-danger {
  font-weight: bold;
}
</style>