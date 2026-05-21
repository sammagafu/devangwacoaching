<template>
  <header
    class="dw-section-header mb-4 mb-lg-5"
    :class="{ 'dw-section-header--center text-center': center }"
    data-aos="fade-up"
    data-aos-duration="650"
    data-aos-offset="90"
  >
    <p v-if="eyebrow" class="dw-eyebrow">{{ eyebrow }}</p>
    <h2 class="dw-section-title">{{ title }}</h2>
    <p v-if="lead" class="dw-section-lead" :class="{ 'mx-auto': center }">{{ lead }}</p>
  </header>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  center: { type: Boolean, default: false },
})
</script>
