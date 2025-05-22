<template>
  <h5 class="mb-3">Frequently Asked Questions</h5>
  <b-accordion flush>
    <template v-for="(item, idx) in course.faqs" :key="idx">
      <b-accordion-item body-class="pt-0" :visible="!idx">
        <template #title>
          <span class="text-secondary fw-bold me-3">0{{ idx + 1 }}</span>
          <span class="h6 mb-0">{{ item.question }}</span>
        </template>
        {{ item.answer }}
      </b-accordion-item>
    </template>
    <b-accordion-item v-if="!course.faqs?.length" body-class="pt-0" visible>
      <template #title>
        <span class="text-secondary fw-bold me-3">01</span>
        <span class="h6 mb-0">No FAQs Available</span>
      </template>
      There are currently no frequently asked questions available for this course.
    </b-accordion-item>
  </b-accordion>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface CourseType {
  faqs?: { question: string; answer: string }[];
}

defineProps({
  course: {
    type: Object as PropType<CourseType>,
    required: true,
  },
});
</script>