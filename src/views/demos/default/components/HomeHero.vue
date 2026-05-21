<template>
  <div class="home-hero">
    <div class="home-hero__mesh" aria-hidden="true">
      <span class="home-hero__orb home-hero__orb--navy" />
      <span class="home-hero__orb home-hero__orb--blue" />
      <span class="home-hero__orb home-hero__orb--teal" />
    </div>

    <b-container class="home-hero__container position-relative px-3 px-sm-4">
      <b-row class="home-hero__row align-items-end g-3 g-lg-4 gx-xl-5">
        <b-col lg="6" class="order-2 order-lg-1 home-hero__col-copy pb-2 pb-lg-0">
          <div class="home-hero__panel dw-animate dw-animate--fade-up" style="--dw-delay: 0.05s">
            <p class="home-hero__eyebrow dw-animate dw-animate--fade-up" style="--dw-delay: 0.12s">
              {{ t.hero.eyebrow }}
            </p>
            <h1 class="home-hero__title dw-animate dw-animate--fade-up" style="--dw-delay: 0.2s">
              {{ t.hero.titleBefore }}
              <span class="home-hero__title-accent">{{ t.hero.titleAccent }}</span>
              {{ t.hero.titleAfter }}
            </h1>
            <p class="home-hero__lead dw-animate dw-animate--fade-up" style="--dw-delay: 0.28s">
              {{ t.hero.lead }}
            </p>

            <ul class="home-hero__trust list-unstyled d-flex flex-wrap gap-2 mb-4">
              <li
                v-for="(item, index) in t.hero.trust"
                :key="item"
                class="dw-animate dw-animate--fade-up"
                :style="{ '--dw-delay': `${0.36 + index * 0.06}s` }"
              >
                {{ item }}
              </li>
            </ul>

            <div
              class="home-hero__actions d-flex flex-column gap-3 dw-animate dw-animate--fade-up"
              style="--dw-delay: 0.52s"
            >
              <router-link :to="{ name: 'courses' }" class="btn home-hero__btn-primary btn-lg w-100">
                {{ t.hero.ctaPrimary }}
                <BIconArrowRight class="ms-2" />
              </router-link>
              <router-link :to="{ name: 'auth.sign-up' }" class="btn home-hero__btn-secondary btn-lg w-100">
                {{ t.hero.ctaSecondary }}
              </router-link>
            </div>
          </div>
        </b-col>

        <b-col lg="6" class="order-1 order-lg-2 home-hero__col-visual p-0">
          <div class="home-hero__visual dw-animate dw-animate--fade-in-right" style="--dw-delay: 0.18s">
            <span class="home-hero__glow" aria-hidden="true" />
            <img
              :src="heroImage"
              class="home-hero__img dw-animate--float"
              :alt="t.hero.imageAlt"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script setup>
import { BIconArrowRight } from 'bootstrap-icons-vue'
import { useHomeLocale } from '@/composables/useHomeLocale'
import heroImage from '@/assets/images/element/hero.png'

const { t } = useHomeLocale()
</script>

<style scoped>
.home-hero {
  position: relative;
  padding: 0.75rem 0 0;
  overflow: hidden;
}

.home-hero__mesh {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.home-hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(72px);
  opacity: 0.55;
}

.home-hero__orb--navy {
  width: 42%;
  height: 48%;
  top: -8%;
  left: -6%;
  background: var(--dw-navy, #1c4589);
}

.home-hero__orb--blue {
  width: 38%;
  height: 42%;
  top: 18%;
  right: 8%;
  background: var(--dw-primary, #066ac9);
  opacity: 0.45;
}

.home-hero__orb--teal {
  width: 32%;
  height: 38%;
  bottom: 0;
  left: 28%;
  background: var(--dw-teal, #119b8e);
  opacity: 0.4;
}

.home-hero__container {
  z-index: 1;
}

.home-hero__row {
  min-height: min(78vh, 720px);
}

.home-hero__panel {
  position: relative;
  text-align: center;
  padding: 1.75rem 1.5rem 2rem;
  border-radius: var(--dw-radius-lg, 1.25rem);
  background: var(--dw-hero-panel-bg, rgba(255, 255, 255, 0.82));
  border: 1px solid var(--dw-hero-panel-border, rgba(6, 106, 201, 0.12));
  box-shadow: var(--dw-hero-panel-shadow, 0 24px 60px rgba(28, 69, 137, 0.1));
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.home-hero__panel::before {
  content: '';
  position: absolute;
  left: 0;
  top: 1.25rem;
  bottom: 1.25rem;
  width: 4px;
  border-radius: 0 4px 4px 0;
  background: linear-gradient(180deg, var(--dw-teal, #119b8e), var(--dw-primary, #066ac9));
}

@media (min-width: 992px) {
  .home-hero__panel {
    text-align: left;
    padding: 2rem 2.25rem 2.25rem;
  }
}

/* Typography hierarchy */
.home-hero__eyebrow {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--dw-hero-eyebrow, #119b8e);
  margin: 0 0 1rem;
}

.home-hero__title {
  font-size: clamp(1.75rem, 4vw, 2.85rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.03em;
  color: var(--dw-hero-title, #1a2b42);
  margin: 0 0 1rem;
}

.home-hero__title-accent {
  display: inline;
  background: linear-gradient(
    120deg,
    var(--dw-primary, #066ac9) 0%,
    var(--dw-teal, #119b8e) 55%,
    var(--dw-navy, #1c4589) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.home-hero__lead {
  font-size: 1.0625rem;
  line-height: 1.75;
  font-weight: 400;
  color: var(--dw-hero-lead, #5a6b7d);
  margin: 0 auto 1.25rem;
  max-width: 32rem;
}

@media (min-width: 992px) {
  .home-hero__lead {
    margin-left: 0;
    margin-right: 0;
  }
}

.home-hero__trust li {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--dw-hero-trust-text, #1c4589);
  background: var(--dw-hero-trust-bg, rgba(6, 106, 201, 0.09));
  border: 1px solid var(--dw-hero-trust-border, rgba(6, 106, 201, 0.14));
  padding: 0.4rem 0.8rem;
  border-radius: 0.35rem;
}

.home-hero__btn-primary {
  background: linear-gradient(135deg, var(--dw-primary, #066ac9), var(--dw-navy, #1c4589));
  border: none;
  color: #fff;
  font-weight: 600;
  border-radius: 0.5rem;
}

.home-hero__btn-primary:hover {
  background: linear-gradient(135deg, #0559a8, #0b3d6e);
  color: #fff;
}

.home-hero__btn-secondary {
  background: var(--dw-hero-btn-secondary-bg, transparent);
  border: 1.5px solid var(--dw-hero-btn-secondary-border, rgba(6, 106, 201, 0.4));
  color: var(--dw-hero-btn-secondary-text, #066ac9);
  font-weight: 600;
  border-radius: 0.5rem;
}

.home-hero__btn-secondary:hover {
  background: var(--dw-hero-btn-secondary-hover, rgba(6, 106, 201, 0.08));
  color: var(--dw-hero-btn-secondary-text, #066ac9);
}

.home-hero__col-visual {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  align-self: stretch;
}

.home-hero__visual {
  position: relative;
  width: 100%;
  max-width: 620px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  line-height: 0;
}

.home-hero__glow {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 75%;
  height: 55%;
  background: radial-gradient(
    ellipse at center,
    rgba(17, 155, 142, 0.35) 0%,
    rgba(6, 106, 201, 0.2) 45%,
    transparent 70%
  );
  pointer-events: none;
}

.home-hero__img {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  max-height: min(70vh, 580px);
  object-fit: contain;
  object-position: bottom center;
  border: none;
}

@media (min-width: 992px) {
  .home-hero__visual {
    margin-left: auto;
  }

  .home-hero__img {
    margin-left: auto;
  }
}

@media (max-width: 991.98px) {
  .home-hero {
    padding-top: 0.5rem;
  }

  .home-hero__row {
    min-height: auto;
  }

  .home-hero__col-visual {
    padding-top: 0.25rem;
  }

  .home-hero__panel {
    padding: 1.35rem 1.15rem 1.5rem;
    margin-top: 0.25rem;
  }

  .home-hero__panel::before {
    top: 1rem;
    bottom: 1rem;
    width: 3px;
  }

  .home-hero__title {
    font-size: clamp(1.5rem, 6.5vw, 2rem);
  }

  .home-hero__lead {
    font-size: 1rem;
  }

  .home-hero__trust {
    justify-content: center;
  }

  .home-hero__img {
    max-height: min(42vh, 320px);
  }

  .home-hero__orb {
    filter: blur(48px);
  }

  .home-hero__orb--navy {
    width: 55%;
    height: 40%;
  }

  .home-hero__orb--blue {
    width: 50%;
    right: -5%;
  }

  .home-hero__orb--teal {
    width: 45%;
    left: 15%;
  }
}

@media (min-width: 576px) and (max-width: 991.98px) {
  .home-hero__actions {
    flex-direction: row !important;
  }

  .home-hero__actions .btn {
    width: auto;
    flex: 1 1 0;
  }
}

@media (max-width: 575.98px) {
  .home-hero__img {
    max-height: min(38vh, 280px);
  }
}

:global([data-bs-theme='dark']) .home-hero__orb--navy {
  opacity: 0.7;
}

:global([data-bs-theme='dark']) .home-hero__orb--blue {
  opacity: 0.55;
}

:global([data-bs-theme='dark']) .home-hero__orb--teal {
  opacity: 0.5;
}
</style>
