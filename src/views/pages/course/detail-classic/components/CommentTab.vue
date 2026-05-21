<template>
  <div>
    <p v-if="!faqs.length" class="text-muted">No questions yet. Check the FAQ tab or ask your instructor.</p>
    <div v-for="faq in faqs" :key="faq.id" class="mb-4">
      <h6 class="mb-1">{{ faq.question }}</h6>
      <p class="mb-0 text-muted">{{ faq.answer || 'Awaiting answer from instructor.' }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  course: { type: Object, required: true },
});

const faqs = computed(() => props.course?.faqs || []);
</script>
