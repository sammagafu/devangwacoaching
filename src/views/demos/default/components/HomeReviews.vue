<template>
  <section
    id="client-reviews"
    class="home-section home-section--elevated home-reviews"
    data-aos="fade-up"
    data-aos-offset="90"
  >
    <b-container>
      <HomeSectionHeader
        :eyebrow="t.reviews.eyebrow"
        :title="t.reviews.title"
        :lead="t.reviews.lead"
        center
      />

      <b-row class="g-4">
        <b-col
          v-for="(review, index) in homeReviews"
          :key="review.id"
          md="6"
          lg="4"
          data-aos="fade-up"
          :data-aos-delay="100 + index * 90"
          data-aos-offset="90"
        >
          <article class="testimonial-card h-100 p-4 p-lg-5 rounded-4">
            <div class="testimonial-card__stars mb-3" :aria-label="`${review.rating} out of 5`">
              <BIconStarFill v-for="n in review.rating" :key="n" />
            </div>
            <blockquote class="testimonial-card__quote mb-4">
              <p class="mb-0">“{{ review.text }}”</p>
            </blockquote>
            <footer class="d-flex align-items-center gap-3">
              <div class="testimonial-card__avatar rounded-circle" aria-hidden="true">
                {{ review.initials }}
              </div>
              <div>
                <p class="testimonial-card__author mb-0">{{ review.author }}</p>
                <p class="testimonial-card__role mb-0">{{ review.role }}</p>
              </div>
            </footer>
          </article>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import { BIconStarFill } from 'bootstrap-icons-vue'
import HomeSectionHeader from '@/views/demos/default/components/HomeSectionHeader.vue'
import { useHomeLocale } from '@/composables/useHomeLocale'
import { homeReviews } from '@/data/homeReviews'

const { t } = useHomeLocale()
</script>
