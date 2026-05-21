<template>
  <section class="py-0 py-xl-5">
    <b-container>
      <b-row class="g-4">
        <b-col sm="6" xl="3" v-for="(item, idx) in counterData" :key="idx">
          <div
            :class="`d-flex flex-column justify-content-center align-items-center p-4 bg-${item.variant} bg-opacity-15 rounded-3 h-100`"
          >
            <span
              :class="`icon-lg rounded-circle bg-${item.variant} bg-opacity-25 text-${item.variant} d-flex align-items-center justify-content-center mb-3`"
            >
              <component :is="item.icon" class="fs-4" />
            </span>
            <h6 class="mb-2 text-center">{{ item.title }}</h6>
            <p class="mb-0 text-center small text-muted">{{ item.description }}</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import {
  BIconChatDotsFill,
  BIconShieldExclamation,
  BIconPeopleFill,
  BIconHeartFill,
} from 'bootstrap-icons-vue'

const counterData = [
  {
    icon: BIconChatDotsFill,
    title: 'Lack of Effective Communication',
    description: 'Struggling to share or receive information clearly within the team.',
    variant: 'primary',
  },
  {
    icon: BIconShieldExclamation,
    title: 'Lack of Conflict Resolution Skills',
    description: 'Inability to address and resolve disputes constructively among colleagues.',
    variant: 'primary',
  },
  {
    icon: BIconPeopleFill,
    title: 'Lack of Team Collaboration',
    description: 'Difficulty working together as a team to achieve common goals.',
    variant: 'primary',
  },
  {
    icon: BIconHeartFill,
    title: 'Lack of Interpersonal Harmony',
    description: 'Ongoing tensions or conflicts disrupting workplace relationships.',
    variant: 'primary',
  },
]
</script>
