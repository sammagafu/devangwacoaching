<template>
  <section
    id="home-about"
    class="home-section home-section--base home-about"
    data-aos="fade-up"
    data-aos-offset="90"
  >
    <b-container>
      <b-row class="g-4 g-xl-5 align-items-center">
        <b-col lg="6" data-aos="fade-right" data-aos-duration="700" data-aos-offset="90">
          <figure class="home-about__figure rounded-4 overflow-hidden mb-0">
            <img :src="coupleImage" :alt="t.about.imageAlt" />
          </figure>
        </b-col>

        <b-col lg="6" data-aos="fade-left" data-aos-duration="700" data-aos-offset="90">
          <HomeSectionHeader
            :eyebrow="t.about.eyebrow"
            :title="t.about.title"
            :lead="t.about.lead"
          />

          <ul class="home-about__list list-unstyled mb-4">
            <li
              v-for="(item, index) in principleItems"
              :key="item.title"
              class="home-about__item"
              data-aos="fade-up"
              :data-aos-delay="80 + index * 70"
              data-aos-offset="90"
            >
              <span class="home-about__marker" aria-hidden="true">
                <component :is="item.icon" />
              </span>
              <div>
                <p class="home-about__item-title mb-1">{{ item.title }}</p>
                <p class="home-about__item-text mb-0">{{ item.text }}</p>
              </div>
            </li>
          </ul>

          <router-link :to="{ name: 'courses' }" class="btn btn-dw-primary">
            {{ t.about.cta }}
            <BIconArrowRight class="ms-2" />
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { BIconArrowRight, BIconClockHistory, BIconBook, BIconAward } from 'bootstrap-icons-vue'
import HomeSectionHeader from '@/views/demos/default/components/HomeSectionHeader.vue'
import { useHomeLocale } from '@/composables/useHomeLocale'
import coupleImage from '@/assets/images/services/connection.jpg'

const { t } = useHomeLocale()

const principleIcons = [BIconClockHistory, BIconBook, BIconAward]

const principleItems = computed(() =>
  t.value.about.principles.map((item, i) => ({
    ...item,
    icon: principleIcons[i],
  })),
)
</script>
