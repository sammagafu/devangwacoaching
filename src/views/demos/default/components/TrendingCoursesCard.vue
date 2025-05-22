<!-- src/views/demos/default/components/TrendingCoursesCard.vue -->
<template>
  <b-card no-body class="action-trigger-hover border bg-transparent">
    <img :src="item.image || 'https://placehold.co/300x200?text=Course'" class="card-img-top" alt="course">
    <div class="ribbon mt-3" v-if="item.ribbon"><span>{{ item.ribbon }}</span></div>
    <b-card-body class="pb-0">
      <div class="d-flex justify-content-between mb-3">
        <span class="hstack gap-2">
          <template v-for="(badge, idx) in item.badges || []" :key="idx">
            <a href="#"
              :class="badge.class === 'primary' ? 'badge bg-primary bg-opacity-10 text-primary' : 'badge text-bg-dark'">
              {{ badge.text }}
            </a>
          </template>
        </span>
        <a href="#" class="h6 fw-light mb-0" @click.prevent="toggleBookmark">
          <font-awesome-icon :icon="faBookmark" />
        </a>
      </div>
      <b-card-title tag="h5">
        <router-link :to="{ name: 'course.detail', params: { slug: item.slug }}">{{ item.title || 'Untitled Course' }}</router-link>
      </b-card-title>
      <div class="d-flex justify-content-between mb-2">
        <div class="hstack gap-2">
          <p class="text-warning m-0">{{ item.rating || 'N/A' }}
            <font-awesome-icon :icon="faStar" class="text-warning ms-1" />
          </p>
          <span class="small">({{ item.reviews || 0 }})</span>
        </div>
        <div class="hstack gap-2">
          <p class="h6 fw-light mb-0 m-0">{{ item.students || 0 }}</p>
          <span class="small">(Student)</span>
        </div>
      </div>
      <div class="hstack gap-3">
        <span class="h6 fw-light mb-0">
          <font-awesome-icon :icon="faClock" class="text-danger me-2" />
          {{ item.time || 'N/A' }}
        </span>
        <span class="h6 fw-light mb-0">
          <font-awesome-icon :icon="faTable" class="text-orange me-2" />
          {{ item.lectures || 0 }} lectures
        </span>
      </div>
    </b-card-body>
    <b-card-footer class="pt-0 bg-transparent">
      <hr>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <div class="avatar avatar-sm">
            <img class="avatar-img rounded-1" :src="item.instructor?.avatar || 'https://placehold.co/50?text=Avatar'" alt="avatar">
          </div>
          <p class="mb-0 ms-2">
            <a href="#" class="h6 fw-light mb-0">{{ item.instructor?.name || 'Unknown Instructor' }}</a>
          </p>
        </div>
        <div>
          <h4 class="text-success mb-0 item-show">{{ price }}</h4>
          <a href="#" class="btn btn-sm btn-success-soft item-show-hover" @click.prevent="addToCart">
            <font-awesome-icon :icon="faShoppingCart" class="me-2" />
            Add to cart
          </a>
        </div>
      </div>
    </b-card-footer>
  </b-card>
</template>

<script setup>
import { computed } from 'vue';
import { useToast } from 'vue-toast-notification';
import { faShoppingCart, faStar, faTable } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faClock } from '@fortawesome/free-regular-svg-icons';
import { useCartStore } from '@/stores/cart';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const $toast = useToast();
const cartStore = useCartStore();

const price = computed(() => {
  return props.item.final_price === 0 ? 'Free' : `$${props.item.final_price.toFixed(2)}`;
});

const addToCart = () => {
  try {
    cartStore.addToCart({
      slug: props.item.slug || '',
      type: props.item.type || 'course',
      title: props.item.title || 'Untitled Course',
      final_price: props.item.final_price || 0,
      price: props.item.price || props.item.final_price || 0,
      image: props.item.image || 'https://placehold.co/300x200?text=Course',
      category: props.item.category || 'Unknown',
    });
    $toast.success(`${props.item.title || 'Course'} added to cart!`);
  } catch (err) {
    $toast.error('Failed to add course to cart.');
  }
};

const toggleBookmark = () => {
  $toast.info('Bookmark functionality not implemented.');
};
</script>