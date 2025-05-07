<template>
  <div class="table-responsive border-0 mb-0">
    <table class="table table-dark-gray align-middle p-4 mb-0 table-hover">
      <thead>
        <tr>
          <th scope="col" class="border-0 rounded-start">Name</th>
          <th scope="col" class="border-0">Description</th>
          <th scope="col" class="border-0">Followers</th>
          <th scope="col" class="border-0">Threads</th>
          <th scope="col" class="border-0 rounded-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
          <td>{{ category.follower_count }}</td>
          <td>{{ category.threads.length }}</td>
          <td>
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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