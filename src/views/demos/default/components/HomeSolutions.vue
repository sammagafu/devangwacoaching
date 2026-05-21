<template>
  <section
    class="home-section home-section--muted home-solutions"
    data-aos="fade-up"
    data-aos-offset="90"
  >
    <b-container>
      <HomeSectionHeader
        :eyebrow="t.solutions.eyebrow"
        :title="t.solutions.title"
        :lead="t.solutions.lead"
        center
      />

      <b-row class="g-4">
        <b-col
          lg="6"
          v-for="(card, index) in programmeCards"
          :key="card.title"
          data-aos="zoom-in"
          :data-aos-delay="100 + index * 120"
          data-aos-offset="90"
        >
          <article class="programme-card h-100 rounded-4">
            <div class="programme-card__media">
              <img :src="card.image" :alt="card.title" />
              <span v-if="card.tag" class="programme-card__tag">{{ card.tag }}</span>
            </div>
            <div class="programme-card__body p-4 p-lg-5">
              <h3 class="dw-card-title h5 mb-2">{{ card.title }}</h3>
              <p class="dw-card-text mb-4">{{ card.description }}</p>
              <router-link :to="card.to" class="btn btn-dw-primary btn-sm">
                {{ t.solutions.cta }}
                <BIconArrowRight class="ms-1" />
              </router-link>
            </div>
          </article>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { BIconArrowRight } from 'bootstrap-icons-vue'
import HomeSectionHeader from '@/views/demos/default/components/HomeSectionHeader.vue'
import { useHomeLocale } from '@/composables/useHomeLocale'
import imageConflict from '@/assets/images/services/conflit.jpg'
import imageComm from '@/assets/images/services/communication.jpg'

const { t } = useHomeLocale()

const images = [imageConflict, imageComm]

const programmeCards = computed(() =>
  t.value.solutions.items.map((item, i) => ({
    title: item.title,
    description: item.description,
    tag: item.tag,
    image: images[i],
    to: { name: 'courses', query: { q: item.query } },
  })),
)
</script>
