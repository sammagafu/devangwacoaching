<template>
  <b-card no-body class="bg-transparent border h-100">
    <b-card-header class="bg-transparent border-bottom d-flex justify-content-between">
      <div class="d-sm-flex align-items-center">
        <div class="ms-0 ms-sm-2 mt-2 mt-sm-0">
          <h5 class="mb-0"><a href="#">{{ item.full_name || item.email }}</a></h5>
          <span class="text-body small">
            <font-awesome-icon :icon="faMapMarkerAlt" class="fa-fw mt-1" />
            {{ item.location || 'Unknown' }}
          </span>
        </div>
      </div>

      <div class="dropdown text-end">
        <a
          href="#"
          class="btn btn-sm btn-light btn-round small mb-0"
          role="button"
          :id="`dropdownShare${item.id}`"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <BIconThreeDots class="fa-fw" />
        </a>
        <ul
          class="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded"
          :aria-labelledby="`dropdownShare${item.id}`"
        >
          <li>
            <a class="dropdown-item icons-center" @click="editUser(item.id)">
              <BIconPencilSquare class="fa-fw me-2" />Edit
            </a>
          </li>
          <li>
            <a class="dropdown-item icons-center" @click="removeUser(item.id)">
              <BIconTrash class="fa-fw me-2" />Remove
            </a>
          </li>
        </ul>
      </div>
    </b-card-header>

    <b-card-body>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="d-flex align-items-center">
          <div
            class="icon-md bg-success bg-opacity-10 text-success rounded-circle flex-shrink-0 flex-centered"
          >
            <font-awesome-icon :icon="faUser" class="fa-fw" />
          </div>
          <h6 class="mb-0 ms-2 fw-light">Role</h6>
        </div>
        <span class="mb-0 fw-bold">{{ getUserRole(item) }}</span>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="d-flex align-items-center">
          <div
            class="icon-md bg-purple bg-opacity-10 text-purple rounded-circle flex-shrink-0"
          >
            <font-awesome-icon :icon="faCheckCircle" class="fa-fw" />
          </div>
          <h6 class="mb-0 ms-2 fw-light">Status</h6>
        </div>
        <span class="mb-0 fw-bold">{{ item.is_active ? 'Active' : 'Inactive' }}</span>
      </div>

      <div class="overflow-hidden">
        <h6 class="mb-0">Courses Enrolled</h6>
        <span class="text-body small">{{ item.enrolled_courses || 0 }}</span>
      </div>
    </b-card-body>

    <b-card-footer class="bg-transparent border-top">
      <div class="d-sm-flex justify-content-between align-items-center">
        <h6 class="mb-2 mb-sm-0 icons-center">
          <BIconCalendar class="fa-fw text-orange me-2" />
          <span class="text-body me-1">Join at:</span>
          {{ formatDate(item.date_joined) }}
        </h6>
        <div class="text-end text-primary-hover">
          <a
            href="#"
            class="btn btn-link text-body p-0 mb-0 me-2 icons-center"
            v-b-tooltip.hover.top="'Message'"
            @click="messageUser(item.id)"
          >
            <BIconEnvelopeFill />
          </a>
          <a
            href="#"
            class="btn btn-link text-body p-0 mb-0"
            v-b-tooltip.hover.top="item.is_active ? 'Block' : 'Unblock'"
            @click="toggleBlockUser(item.id, item.is_active)"
          >
            <font-awesome-icon :icon="item.is_active ? faBan : faUnlock" />
          </a>
        </div>
      </div>
    </b-card-footer>
  </b-card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { faMapMarkerAlt, faUser, faCheckCircle, faBan, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { BIconThreeDots, BIconPencilSquare, BIconTrash, BIconCalendar, BIconEnvelopeFill } from 'bootstrap-icons-vue';
import { useRouter } from 'vue-router';
import { api } from '@/services/authService';

const $toast = useToast();
const router = useRouter();

defineProps({
  item: {
    type: Object as PropType<{
      id: number;
      full_name?: string;
      email: string;
      location?: string;
      is_staff: boolean;
      is_superuser: boolean;
      is_active: boolean;
      date_joined: string;
      enrolled_courses?: number;
    }>,
    required: true,
  },
});

const getUserRole = (user: any) => {
  if (user.is_superuser) return 'Admin';
  if (user.is_staff) return 'Staff';
  return 'Student';
};

const editUser = (userId: number) => {
  router.push({ name: 'admin.user.edit', params: { id: userId } });
};

const removeUser = async (userId: number) => {
  if (!confirm('Are you sure you want to delete this user?')) return;
  try {
    await api.delete(`auth/users/${userId}/`);
    $toast.success('User deleted successfully!');
    // Emit event to parent to refresh data
    defineEmits(['user-deleted'])('user-deleted', userId);
  } catch (error) {
    console.error('Failed to delete user:', error);
    $toast.error('Failed to delete user');
  }
};

const messageUser = (userId: number) => {
  $toast.info(`Messaging user ${userId} (Not implemented)`);
};

const toggleBlockUser = async (userId: number, isActive: boolean) => {
  try {
    await api.patch(`auth/users/${userId}/`, { is_active: !isActive });
    $toast.success(`User ${isActive ? 'blocked' : 'unblocked'} successfully!`);
    // Emit event to parent to refresh data
    defineEmits(['user-updated'])('user-updated', { userId, is_active: !isActive });
  } catch (error) {
    console.error(`Failed to ${isActive ? 'block' : 'unblock'} user:`, error);
    $toast.error(`Failed to ${isActive ? 'block' : 'unblock'} user`);
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
</script>