<template>
  <section class="bg-light">
    <b-container>
      <b-row class="g-4 g-lg-5 align-items-center">
        <b-col xl="9" class="order-2 order-xl-1">
          <b-row class="mt-0 mt-xl-5">
            <b-col md="7" class="position-relative mb-0 mt-0 mt-md-5">
              <figure class="fill-danger opacity-2 position-absolute top-0 start-0 translate-middle mb-3">
                <svg width="211px" height="211px">
                  <path
                    d="M210.030,105.011 C210.030,163.014 163.010,210.029 105.012,210.029 C47.013,210.029 -0.005,163.014 -0.005,105.011 C-0.005,47.015 47.013,-0.004 105.012,-0.004 C163.010,-0.004 210.030,47.015 210.030,105.011 Z">
                  </path>
                </svg>
              </figure>

              <div class="bg-body shadow text-center p-4 rounded-3 position-relative mb-5 mb-md-0">
                <div class="avatar avatar-xl mb-3">
                  <img class="avatar-img rounded-circle" :src="avatar01" alt="avatar">
                </div>
                <blockquote>
                  <p>
                    <span class="me-1 small"><font-awesome-icon :icon="faQuoteLeft" /></span>
                    The changes are enormous as I have been able to guide (speak and agree with) my partner on how to resolve
              our conflicts, how to improve the health of our relationship. Additionally, we have been able to
              understand what each of us dislikes and what we are expected to do. My partner and I have become freer as
              peace has increased, understanding has improved. We have achieved great calmness and improved the family
              because respect (and love) between us has grown.
                    <span class="ms-1 small"><font-awesome-icon :icon="faQuoteRight" /></span>
                  </p>
                </blockquote>
              </div>
            </b-col>

            <b-col md="5" class="mt-5 mt-md-0 d-none d-md-block">
              <figure class="fill-danger opacity-2 position-absolute top-0 start-0 translate-middle mb-3">
                <svg width="211px" height="211px">
                  <path
                    d="M210.030,105.011 C210.030,163.014 163.010,210.029 105.012,210.029 C47.013,210.029 -0.005,163.014 -0.005,105.011 C-0.005,47.015 47.013,-0.004 105.012,-0.004 C163.010,-0.004 210.030,47.015 210.030,105.011 Z">
                  </path>
                </svg>
              </figure>

              <div class="bg-body shadow text-center p-4 rounded-3 position-relative mb-5 mb-md-0">
                <div class="avatar avatar-xl mb-3">
                  <img class="avatar-img rounded-circle" :src="avatar01" alt="avatar">
                </div>
                <blockquote>
                  <p>
                    <span class="me-1 small"><font-awesome-icon :icon="faQuoteLeft" /></span>
                    It was the only time I learned the importance of self-awareness, self-worth, and interpreting positive
              emotions free from fear. I felt more confident and set new goals for my life because I realized that I am
              the one in control of my own life.
                    <span class="ms-1 small"><font-awesome-icon :icon="faQuoteRight" /></span>
                  </p>
                </blockquote>
              </div>
            </b-col>
          </b-row>

          <b-row class="mt-5 mt-xl-0">
            <b-col cols="7" class="mt-0 mt-xl-5 text-end position-relative z-index-1 d-none d-md-block">
              <figure
                class="fill-danger position-absolute top-0 start-50 mt-n7 ms-6 ps-3 pt-2 z-index-n1 d-none d-lg-block">
                <svg enable-background="new 0 0 160.7 159.8" height="180px">
                  <path
                    d="m153.2 114.5c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2-0.1-1.2 0.9-2.2 2.1-2.2z" />
                  <path d="m116.4 114.5c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s0.9-2.2 2.1-2.2z" />
                  <path d="m134.8 114.5c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s0.9-2.2 2.1-2.2z" />
                  <path d="m135.1 96.9c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s0.9-2.2 2.1-2.2z" />
                  <path
                    d="m153.5 96.9c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2-0.1-1.2 0.9-2.2 2.1-2.2z" />
                  <path d="m98.3 96.9c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s0.9-2.2 2.1-2.2z" />
                  <ellipse cx="116.7" cy="99.1" rx="2.1" ry="2.2" />
                  <path
                    d="m153.2 149.8c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2-0.1-1.3 0.9-2.2 2.1-2.2z" />
                  <path
                    d="m135.1 132.2c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2 0-1.3 0.9-2.2 2.1-2.2z" />
                  <path
                    d="m153.5 132.2c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2-0.1-1.3 0.9-2.2 2.1-2.2z" />
                  <path d="m80.2 79.3c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s1-2.2 2.1-2.2z" />
                  <path d="m117 79.3c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s0.9-2.2 2.1-2.2z" />
                  <path d="m98.6 79.3c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s0.9-2.2 2.1-2.2z" />
                  <path d="m135.4 79.3c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s0.9-2.2 2.1-2.2z" />
                  <path d="m153.8 79.3c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s0.9-2.2 2.1-2.2z" />
                  <path
                    d="m80.6 61.7c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2-0.1-1.2 0.9-2.2 2.1-2.2z" />
                  <ellipse cx="98.9" cy="63.9" rx="2.1" ry="2.2" />
                  <path d="m117.3 61.7c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s0.9-2.2 2.1-2.2z" />
                  <ellipse cx="62.2" cy="63.9" rx="2.1" ry="2.2" />
                  <ellipse cx="154.1" cy="63.9" rx="2.1" ry="2.2" />
                  <path d="m135.7 61.7c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s0.9-2.2 2.1-2.2z" />
                  <path d="m154.4 44.1c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s0.9-2.2 2.1-2.2z" />
                  <path
                    d="m80.9 44.1c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2-0.1-1.2 0.9-2.2 2.1-2.2z" />
                  <path
                    d="m44.1 44.1c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2-0.1-1.2 0.9-2.2 2.1-2.2z" />
                  <path d="m99.2 44.1c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s1-2.2 2.1-2.2z" />
                  <ellipse cx="117.6" cy="46.3" rx="2.1" ry="2.2" />
                  <path d="m136 44.1c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s0.9-2.2 2.1-2.2z" />
                  <path
                    d="m62.5 44.1c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2-0.1-1.2 0.9-2.2 2.1-2.2z" />
                  <path d="m154.7 26.5c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s0.9-2.2 2.1-2.2z" />
                  <path
                    d="m62.8 26.5c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2-0.1-1.2 0.9-2.2 2.1-2.2z" />
                  <ellipse cx="136.3" cy="28.6" rx="2.1" ry="2.2" />
                  <path
                    d="m99.6 26.5c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2-0.1-1.2 0.9-2.2 2.1-2.2z" />
                  <path d="m117.9 26.5c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s1-2.2 2.1-2.2z" />
                  <path
                    d="m81.2 26.5c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2-0.1-1.2 0.9-2.2 2.1-2.2z" />
                  <path d="m26 26.5c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2c-1.2 0-2.1-1-2.1-2.2s0.9-2.2 2.1-2.2z" />
                  <ellipse cx="44.4" cy="28.6" rx="2.1" ry="2.2" />
                  <path
                    d="m136.6 13.2c-1.2 0-2.1-1-2.1-2.2s1-2.2 2.1-2.2c1.2 0 2.1 1 2.1 2.2 0.1 1.2-0.9 2.2-2.1 2.2z" />
                  <path d="m155 13.2c-1.2 0-2.1-1-2.1-2.2s1-2.2 2.1-2.2c1.2 0 2.1 1 2.1 2.2 0.1 1.2-0.9 2.2-2.1 2.2z" />
                  <path d="m26.3 13.2c-1.2 0-2.1-1-2.1-2.2s1-2.2 2.1-2.2c1.2 0 2.1 1 2.1 2.2s-0.9 2.2-2.1 2.2z" />
                  <path d="m81.5 13.2c-1.2 0-2.1-1-2.1-2.2s1-2.2 2.1-2.2c1.2 0 2.1 1 2.1 2.2s-0.9 2.2-2.1 2.2z" />
                  <path d="m63.1 13.2c-1.2 0-2.1-1-2.1-2.2s1-2.2 2.1-2.2c1.2 0 2.1 1 2.1 2.2s-0.9 2.2-2.1 2.2z" />
                  <path d="m44.7 13.2c-1.2 0-2.1-1-2.1-2.2s1-2.2 2.1-2.2c1.2 0 2.1 1 2.1 2.2s-0.9 2.2-2.1 2.2z" />
                  <path
                    d="m118.2 13.2c-1.2 0-2.1-1-2.1-2.2s1-2.2 2.1-2.2c1.2 0 2.1 1 2.1 2.2 0.1 1.2-0.9 2.2-2.1 2.2z" />
                  <path d="m7.9 13.2c-1.2 0-2.1-1-2.1-2.2s1-2.2 2.1-2.2c1.2 0 2.1 1 2.1 2.2 0.1 1.2-0.9 2.2-2.1 2.2z" />
                  <path d="m99.9 13.2c-1.2 0-2.1-1-2.1-2.2s1-2.2 2.1-2.2c1.2 0 2.1 1 2.1 2.2s-1 2.2-2.1 2.2z" />
                </svg>
              </figure>
            </b-col>

            <b-col md="5" class="mt-n6 mb-0 mb-md-5">
              <div class="bg-body shadow text-center p-4 rounded-3">
                <div class="avatar avatar-xl mb-3">
                  <img class="avatar-img rounded-circle" :src="avatar03" alt="avatar">
                </div>
                <blockquote>
                  <p>
                    <span class="me-1 small"><font-awesome-icon :icon="faQuoteLeft" /></span>
                    It helped me escape the heavy wave of thoughts because I was even contemplating ending my life. However,
              through Devangwa Coaching Sessions, I was able to see that I still have value and can live without that
              fiancé. Therefore, through the coaching sessions, I found relief and the strength to keep pursuing my
              dreams and move past the pain I was experiencing. I remember at the start of the sessions, I would cry,
              but now, whenever I meet the coach, all I do is laugh.
                    <span class="ms-1 small"><font-awesome-icon :icon="faQuoteRight" /></span>
                  </p>
                </blockquote>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col xl="3" class="order-1 text-center text-xl-start">
          <h2 class="fs-1">Don't just take our word for it, hear it from our clients!</h2>
          <p>Our Customers Very Happy With Our Services</p>
          <a href="#" class="btn btn-primary mb-0">View Reviews</a>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script setup lang="ts">
import { faQuoteLeft, faQuoteRight, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { BIconShieldFillCheck } from 'bootstrap-icons-vue';

import avatar01 from '@/assets/images/avatar/01.jpg';
import avatar09 from '@/assets/images/avatar/09.jpg';
import avatar04 from '@/assets/images/avatar/04.jpg';
import avatar02 from '@/assets/images/avatar/02.jpg';
import avatar03 from '@/assets/images/avatar/03.jpg';

import pattern02 from '@/assets/images/pattern/02.png';
</script>