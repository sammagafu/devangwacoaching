<template>
  <section id="client-reviews" class="bg-light">
    <b-container>
      <b-row class="g-4 g-lg-5 align-items-center">
        <b-col xl="9" class="order-2 order-xl-1">
          <b-row class="mt-0 mt-xl-5 g-4">
            <b-col
              v-for="(review, idx) in reviews"
              :key="idx"
              :md="review.wide ? 7 : 5"
              :class="review.offsetClass"
            >
              <div class="bg-body shadow text-center p-4 rounded-3 h-100">
                <div
                  class="avatar avatar-xl mb-3 mx-auto rounded-circle bg-primary bg-opacity-10 text-primary fw-bold d-flex align-items-center justify-content-center"
                >
                  {{ review.initials }}
                </div>
                <blockquote class="mb-0">
                  <p class="mb-0">
                    <span class="me-1 small"><font-awesome-icon :icon="faQuoteLeft" /></span>
                    {{ review.text }}
                    <span class="ms-1 small"><font-awesome-icon :icon="faQuoteRight" /></span>
                  </p>
                  <footer class="blockquote-footer mt-3 mb-0">{{ review.author }}</footer>
                </blockquote>
              </div>
            </b-col>
          </b-row>
        </b-col>

        <b-col xl="3" class="order-1 text-center text-xl-start">
          <h2 class="fs-1">Don't just take our word for it, hear it from our clients!</h2>
          <p>Our customers are very happy with our services.</p>
          <b-button variant="primary" class="mb-0" @click="scrollToClientReviews">
            View Reviews
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { scrollToClientReviews } from '@/helpers/homeNavigation'

const reviews = [
  {
    initials: 'MK',
    author: 'Marriage coaching client',
    wide: true,
    offsetClass: 'mt-0 mt-md-5',
    text:
      'The changes are enormous — we learned how to resolve conflicts and improve the health of our relationship. Peace has increased, understanding has improved, and respect between us has grown.',
  },
  {
    initials: 'AN',
    author: 'Individual coaching client',
    wide: false,
    offsetClass: 'mt-5 mt-md-0 d-none d-md-block',
    text:
      'I learned the importance of self-awareness and interpreting positive emotions free from fear. I felt more confident and set new goals because I realized I am in control of my own life.',
  },
  {
    initials: 'JT',
    author: 'Life coaching client',
    wide: false,
    offsetClass: 'mt-n6 mb-0 mb-md-5',
    text:
      'Devangwa Coaching helped me see that I still have value. I found relief and strength to keep pursuing my dreams. At the start I would cry — now whenever I meet the coach, I laugh.',
  },
]
</script>
