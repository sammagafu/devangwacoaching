<template>
  <div class="home-page">
    <HomeNav />
    <section class="home-hero-shell">
      <HomeHero />
    </section>

    <main>
      <HomeFeatures />
      <HomeAboutGrid />
      <HomeSolutions />
      <HomeReviews />
      <HomeReviewsCta />
      <TrendingCourses />
    </main>

    <Footer1 home-mode />
  </div>
</template>

<script setup>
import { onMounted, nextTick, watch } from 'vue'
import AOS from 'aos'
import { useHomeLocale } from '@/composables/useHomeLocale'
import HomeNav from '@/views/demos/default/components/HomeNav.vue'
import HomeHero from '@/views/demos/default/components/HomeHero.vue'
import HomeFeatures from '@/views/demos/default/components/HomeFeatures.vue'
import HomeAboutGrid from '@/views/demos/default/components/HomeAboutGrid.vue'
import HomeSolutions from '@/views/demos/default/components/HomeSolutions.vue'
import HomeReviews from '@/views/demos/default/components/HomeReviews.vue'
import HomeReviewsCta from '@/views/demos/default/components/HomeReviewsCta.vue'
import TrendingCourses from '@/views/demos/default/components/TrendingCourses.vue'
import Footer1 from '@/views/demos/default/components/Footer1.vue'

const { locale } = useHomeLocale()

const refreshMotion = async () => {
  await nextTick()
  AOS.refresh()
}

onMounted(refreshMotion)

watch(locale, refreshMotion)
</script>

<style scoped>
.home-hero-shell {
  display: flex;
  flex-direction: column;
}

.home-page :deep(main) {
  padding: 0;
}
</style>
