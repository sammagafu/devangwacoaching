<template>
  <section
    class="home-section home-section--elevated home-features"
    data-aos="fade-up"
    data-aos-offset="90"
  >
    <b-container>
      <HomeSectionHeader
        :eyebrow="t.features.eyebrow"
        :title="t.features.title"
        :lead="t.features.lead"
        center
      />

      <b-row class="g-4">
        <b-col
          v-for="(item, index) in featureItems"
          :key="item.title"
          sm="6"
          lg="3"
          data-aos="fade-up"
          :data-aos-delay="120 + index * 80"
          data-aos-offset="90"
        >
          <article class="feature-card h-100 p-4">
            <span class="feature-card__icon" aria-hidden="true">
              <component :is="item.icon" />
            </span>
            <h3 class="dw-card-title">{{ item.title }}</h3>
            <p class="dw-card-text">{{ item.description }}</p>
          </article>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import {
  BIconChatDotsFill,
  BIconShieldExclamation,
  BIconPeopleFill,
  BIconHeartFill,
} from 'bootstrap-icons-vue'
import HomeSectionHeader from '@/views/demos/default/components/HomeSectionHeader.vue'
import { useHomeLocale } from '@/composables/useHomeLocale'

const { t } = useHomeLocale()

const icons = [BIconChatDotsFill, BIconShieldExclamation, BIconPeopleFill, BIconHeartFill]

const featureItems = computed(() =>
  t.value.features.items.map((item, i) => ({
    ...item,
    icon: icons[i],
  })),
)
</script>
