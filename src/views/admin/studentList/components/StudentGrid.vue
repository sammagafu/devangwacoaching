<template>
  <b-row class="g-4">
    <b-col md="6" xxl="4" v-for="(item, idx) in usersList" :key="idx">
      <StudentCard :item="item" @user-deleted="handleUserDeleted" @user-updated="handleUserUpdated" />
    </b-col>
  </b-row>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import StudentCard from '@/views/admin/studentList/components/StudentCard.vue';

defineProps({
  usersList: {
    type: Array as PropType<{
      id: number;
      full_name?: string;
      email: string;
      location?: string;
      is_staff: boolean;
      is_superuser: boolean;
      is_active: boolean;
      date_joined: string;
      enrolled_courses?: number;
    }[]>,
    required: true,
  },
});

defineEmits(['user-deleted', 'user-updated']);

const handleUserDeleted = (userId: number) => {
  defineEmits(['user-deleted'])('user-deleted', userId);
};

const handleUserUpdated = (payload: { userId: number; is_active: boolean }) => {
  defineEmits(['user-updated'])('user-updated', payload);
};
</script>