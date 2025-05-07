<template>
  <b-card no-body class="bg-transparent border">
    <b-card-header class="bg-light border-bottom">
      <h5>Communities</h5>
    </b-card-header>
    <b-card-body>
      <div class="table-responsive border-0 rounded-3 mb-0">
        <table class="table table-dark-gray align-middle p-4 mb-0 table-hover">
          <thead>
            <tr>
              <th scope="col" class="border-0 rounded-start">Name</th>
              <th scope="col" class="border-0">Description</th>
              <th scope="col" class="border-0">Members</th>
              <th scope="col" class="border-0 rounded-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="4" class="text-center">Loading...</td>
            </tr>
            <tr v-else-if="!categoriesWithMembers.length">
              <td colspan="4" class="text-center">No communities found</td>
            </tr>
            <tr v-else v-for="item in categoriesWithMembers" :key="item.category.id">
              <td>{{ item.category.name }}</td>
              <td>{{ item.category.description }}</td>
              <td>{{ item.members.length }}</td>
              <td>
                <b-button @click="showMembersModal = true; selectedCategoryWithMembers = item" class="btn btn-sm btn-info">View Members</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card-body>
  </b-card>

  <b-modal v-model="showMembersModal" :title="'Members of ' + (selectedCategoryWithMembers ? selectedCategoryWithMembers.category.name : '')">
    <ul>
      <li v-for="member in (selectedCategoryWithMembers ? selectedCategoryWithMembers.members : [])" :key="member.id">{{ member.full_name }}</li>
    </ul>
  </b-modal>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { api } from '@/services/authService';

const $toast = useToast();
const categories = ref([]);
const threads = ref([]);
const loading = ref(false);
const showMembersModal = ref(false);
const selectedCategoryWithMembers = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    // Fetch categories
    const catsRes = await api.get('community/categories/');
    console.log('Categories response:', catsRes.data);
    // Handle paginated response
    categories.value = catsRes.data.results || catsRes.data;

    // Fetch threads
    const threadsRes = await api.get('community/threads/');
    console.log('Threads response:', threadsRes.data);
    // Handle paginated response
    threads.value = threadsRes.data.results || threadsRes.data;

    console.log('Categories with members:', categoriesWithMembers.value);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    $toast.error('Failed to fetch communities or threads');
  } finally {
    loading.value = false;
  }
});

const categoriesWithMembers = computed(() => {
  return categories.value.map(category => {
    const catThreads = threads.value.filter(thread => thread.category && thread.category.id === category.id);
    const membersMap = new Map();
    catThreads.forEach(thread => {
      if (thread.starter && !membersMap.has(thread.starter.id)) {
        membersMap.set(thread.starter.id, thread.starter);
      }
      if (thread.replies) {
        thread.replies.forEach(reply => {
          if (reply.author && !membersMap.has(reply.author.id)) {
            membersMap.set(reply.author.id, reply.author);
          }
        });
      }
    });
    return {
      category,
      members: Array.from(membersMap.values())
    };
  });
});
</script>