<template>
  <section class="home-hero">
    <div class="home-hero__bg" aria-hidden="true" />
    <b-container class="position-relative">
      <b-row class="align-items-center g-4 g-xl-5 py-5 py-lg-6">
        <b-col lg="6" xl="5" class="text-center text-lg-start">
          <span class="hero-badge d-inline-block mb-3">Devangwa Coaching</span>

          <h1 class="hero-title mb-3">
            You deserve a joyous,
            <span class="hero-title-accent">meaningful</span>
            life.
          </h1>

          <p class="hero-lead mb-4">
            Unlock your potential with personalized, self-paced coaching—built for couples and
            individuals ready to grow with clarity and confidence.
          </p>

          <ul class="hero-benefits list-unstyled mb-4">
            <li v-for="item in benefits" :key="item">
              <BIconPatchCheckFill class="text-primary me-2 flex-shrink-0" />
              <span>{{ item }}</span>
            </li>
          </ul>

          <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
            <router-link :to="{ name: 'auth.sign-up' }" class="btn btn-lg btn-primary px-4">
              Get Started
            </router-link>
            <router-link :to="{ name: 'courses' }" class="btn btn-lg btn-outline-primary px-4">
              Browse Courses
            </router-link>
          </div>
        </b-col>

        <b-col lg="6" xl="7" class="text-center">
          <div class="hero-visual mx-auto">
            <div class="hero-visual__frame rounded-4 overflow-hidden">
              <img :src="heroImage" class="hero-visual__img" alt="Coaching and learning with Devangwa" />
            </div>
            <div class="hero-visual__card rounded-3 shadow-sm">
              <p class="mb-0 small text-secondary">Trusted coaching</p>
              <p class="mb-0 fw-bold text-dark">Grow together, at your pace</p>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import { BIconPatchCheckFill } from 'bootstrap-icons-vue'
import heroImage from '@/assets/images/element/hero.png'

const benefits = [
  'Gain clarity on what matters most',
  'Overcome overwhelm with practical tools',
  'Build lasting change step by step',
]
</script>

<style scoped>
.home-hero {
  position: relative;
  overflow: hidden;
}

.home-hero__bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 100% 0%, rgba(6, 106, 201, 0.08), transparent),
    radial-gradient(ellipse 60% 50% at 0% 100%, rgba(247, 195, 46, 0.1), transparent),
    #f7f5f0;
}

.hero-badge {
  padding: 0.35rem 0.85rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--bs-primary);
  background: rgba(6, 106, 201, 0.1);
  border-radius: 2rem;
}

.hero-title {
  font-size: clamp(1.85rem, 4vw, 2.75rem);
  font-weight: 700;
  line-height: 1.2;
  color: #1a202c;
}

.hero-title-accent {
  color: var(--bs-primary);
  position: relative;
  white-space: nowrap;
}

.hero-title-accent::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.1em;
  height: 0.35em;
  background: rgba(247, 195, 46, 0.45);
  z-index: -1;
  border-radius: 2px;
}

.hero-lead {
  font-size: 1.125rem;
  line-height: 1.65;
  color: #475569;
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 992px) {
  .hero-lead {
    margin-left: 0;
    margin-right: 0;
  }
}

.hero-benefits li {
  display: flex;
  align-items: flex-start;
  text-align: left;
  color: #334155;
  font-size: 1rem;
  margin-bottom: 0.65rem;
}

.hero-benefits li:last-child {
  margin-bottom: 0;
}

.hero-visual {
  position: relative;
  max-width: 520px;
}

.hero-visual__frame {
  border: none;
  background: transparent;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
}

.hero-visual__img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  min-height: 280px;
  border: none;
  outline: none;
}

.hero-visual__card {
  position: absolute;
  left: 1rem;
  bottom: -1.25rem;
  padding: 0.85rem 1.1rem;
  background: #fff;
  border: none;
  text-align: left;
}

@media (max-width: 991.98px) {
  .hero-visual {
    margin-top: 1rem;
    padding-bottom: 2rem;
  }
}
</style>
