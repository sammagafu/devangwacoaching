<template>
  <section
    class="home-section home-section--base home-cta"
    aria-labelledby="home-cta-title"
    data-aos="fade-up"
    data-aos-offset="90"
  >
    <b-container>
      <div
        class="home-cta__panel rounded-4 overflow-hidden"
        data-aos="zoom-in"
        data-aos-duration="750"
        data-aos-offset="90"
      >
        <b-row class="align-items-center g-4 g-lg-0">
          <b-col lg="7" class="p-4 p-lg-5">
            <p class="dw-eyebrow home-cta__eyebrow mb-2">{{ t.cta.eyebrow }}</p>
            <h2 id="home-cta-title" class="home-cta__title mb-3">
              {{ t.cta.title }}
            </h2>
            <p class="home-cta__text mb-4">
              {{ t.cta.lead }}
            </p>
            <router-link :to="{ name: 'courses' }" class="btn btn-light fw-semibold">
              {{ t.cta.button }}
              <BIconArrowRight class="ms-2" />
            </router-link>
          </b-col>
          <b-col lg="5" class="home-cta__aside p-4 p-lg-5">
            <ul class="home-cta__checks list-unstyled mb-0">
              <li v-for="point in t.cta.points" :key="point">
                <BIconCheckCircleFill class="me-2 flex-shrink-0" />
                {{ point }}
              </li>
            </ul>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </section>
</template>

<script setup>
import { BIconArrowRight, BIconCheckCircleFill } from 'bootstrap-icons-vue'
import { useHomeLocale } from '@/composables/useHomeLocale'

const { t } = useHomeLocale()
</script>
