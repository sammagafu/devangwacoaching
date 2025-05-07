<template>
  <section class="py-0 py-xl-5">
    <b-container>
      <b-row class="g-4">
        <b-col sm="6" xl="3" v-for="(item, idx) in counterData" :key="idx">
          <div
            :class="`d-flex flex-column justify-content-center align-items-center p-4 bg-${item.variant} bg-opacity-15 rounded-3`">
            <img :src="item.icon" class="mb-3" style="width: 60px; height: 60px;" />
            <h6 class="mb-2 text-center">{{ item.title }}</h6>
            <p class="mb-0 text-center">{{ item.description }}</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup lang="ts">
const counterData = [
  {
    icon: '/src/assets/images/painpoints/01.png',
    title: 'Lack of Effective Communication',
    description: 'Struggling to share or receive information clearly within the team.',
    variant: 'primary'
  },
  {
    icon: '/src/assets/images/painpoints/02.png',
    title: 'Lack of Conflict Resolution Skills',
    description: 'Inability to address and resolve disputes constructively among colleagues.',
    variant: 'primary'
  },
  {
    icon: '/src/assets/images/painpoints/03.png',
    title: 'Lack of Team Collaboration',
    description: 'Difficulty working together as a team to achieve common goals.',
    variant: 'primary'
  },
  {
    icon: '/src/assets/images/painpoints/04.png',
    title: 'Lack of Interpersonal Harmony',
    description: 'Ongoing tensions or conflicts with colleagues disrupting workplace relationships.',
    variant: 'primary'
  }
];
</script>

<style scoped>
img {
  object-fit: contain; /* Ensure the image fits within the specified dimensions */
}
</style>