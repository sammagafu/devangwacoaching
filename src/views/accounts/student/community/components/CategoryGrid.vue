<template>
  <b-row class="g-4">
    <b-col md="6" xxl="4" v-for="category in categories" :key="category.id">
      <b-card no-body class="bg-transparent border h-100">
        <b-card-header class="bg-transparent border-bottom">
          <h5>{{ category.name }}</h5>
        </b-card-header>
        <b-card-body>
          <p>{{ category.description }}</p>
          <p class="mb-0">
            <strong>Followers:</strong> {{ category.follower_count }}
            <br />
            <strong>Threads:</strong> {{ category.threads.length }}
          </p>
        </b-card-body>
        <b-card-footer class="bg-transparent border-top">
          <b-button
            variant="outline-primary"
            size="sm"
            @click="$emit('join', category.slug)"
            v-if="user && !isFollowing(category)"
          >
            Join
          </b-button>
          <b-button
            variant="outline-danger"
            size="sm"
            @click="$emit('leave', category.slug)"
            v-if="user && isFollowing(category)"
          >
            Leave
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="ms-2"
            @click="$router.push({name: 'student.community.threads', params: { slug: category.slug }})"
          >
            View Threads
          </b-button>
        </b-card-footer>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  user: {
    type: Object,
    default: null,
  },
});

defineEmits(['join', 'leave']);

const router = useRouter();

const isFollowing = (category) => {
  if (!category.followers || !props.user) return false;
  return category.followers.some(follower => follower.user.id === props.user.id);
};
</script>