<template>
  <div class="wishlist-card">
    <router-link :to="{ name: 'course.detail.advance', params: { slug: item.slug } }"><img :src="item.cover" :alt="item.title" class="wishlist-card-image" /></router-link>
    <h3 class="wishlist-card-title">{{ item.title }}</h3>
    <p class="wishlist-card-description">{{ item.description }}</p>
    <p class="wishlist-card-instructor">By: {{ item.instructor.full_name }}</p>
    <p class="wishlist-card-price">Price: {{ item.final_price }} TZS</p>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.wishlist-card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
}
.wishlist-card-image {
  max-width: 100%;
  height: auto;
}
.wishlist-card-title {
  font-weight: bold;
  margin-top: 0.5rem;
}
</style>
