<template>
  <TopBar1 />
  <main>

    <MainBanner />

    <Counter />

    <Reviews />
    
    <About />

    <ActionBox />

    <TrendingCourses />
    <CountDown />

  </main>
  <Footer1 />
</template>
<script setup lang="ts">
import TopBar1 from '@/views/demos/default/components/TopBar1.vue';
import MainBanner from '@/views/demos/default/components/MainBanner.vue';
import Counter from '@/views/demos/default/components/Counter.vue';
import PopularCourse from '@/views/demos/default/components/PopularCourse.vue';
import About from '@/views/demos/default/components/About.vue';
import ActionBox from '@/views/demos/default/components/ActionBox.vue';
import TrendingCourses from '@/views/demos/default/components/TrendingCourses.vue';
import Reviews from '@/views/demos/default/components/Reviews.vue';
import Footer1 from '@/views/demos/default/components/Footer1.vue';
import CountDown from '@/components/CountDown.vue';
</script>