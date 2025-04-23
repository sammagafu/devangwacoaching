<template>
  <div class="table-responsive border-0 mb-0">
    <table class="table table-dark-gray align-middle p-4 mb-0 table-hover">
      <thead>
        <tr>
          <th scope="col" class="border-0 rounded-start">User</th>
          <th scope="col" class="border-0">Join Date</th>
          <th scope="col" class="border-0">Role</th>
          <th scope="col" class="border-0">Status</th>
          <th scope="col" class="border-0">Courses Enrolled</th>
          <th scope="col" class="border-0 rounded-end">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in usersList" :key="idx">
          <td>
            <div class="d-flex align-items-center position-relative">
              <div class="mb-0 ms-3">
                <h6 class="mb-0"><a href="#" class="stretched-link">{{ item.full_name || item.email }}</a></h6>
                <span class="text-body small">
                  <font-awesome-icon :icon="faMapMarkerAlt" class="fa-fw mt-1" />
                  {{ item.location || 'Unknown' }}
                </span>
              </div>
            </div>
          </td>
          <td>{{ formatDate(item.date_joined) }}</td>
          <td>{{ getUserRole(item) }}</td>
          <td>{{ item.is_active ? 'Active' : 'Inactive' }}</td>
          <td>{{ item.enrolled_courses || 0 }}</td>
          <td>
            <a
              href="#"
              class="btn btn-light btn-round me-2 mb-1 mb-md-0"
              v-b-tooltip.hover.top="'View'"
              @click="viewUser(item.id)"
            >
              <BIconEye />
            </a>
            <a
              href="#"
              class="btn btn-light btn-round me-2 mb-1 mb-md-0"
              v-b-tooltip.hover.top="'Message'"
              @click="messageUser(item.id)"
            >
              <BIconEnvelope />
            </a>
            <b-button
              variant="light"
              class="btn-round mb-0"
              :v-b-tooltip.hover.top="item.is_active ? 'Block' : 'Unblock'"
              @click="toggleBlockUser(item.id, item.is_active)"
            >
              <font-awesome-icon :icon="item.is_active ? faBan : faUnlock" />
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { faMapMarkerAlt, faBan, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { BIconEye, BIconEnvelope } from 'bootstrap-icons-vue';
import { api } from '@/services/authService';
import { useRouter } from 'vue-router';

const $toast = useToast();
const router = useRouter();
const usersList = ref([]);

onMounted(async () => {
  await fetchUsers();
});

const fetchUsers = async () => {
  try {
    const response = await api.get('auth/users/');
    usersList.value = response.data;
    $toast.success('Users loaded successfully!');
  } catch (error) {
    console.error('Failed to fetch users:', error);
    $toast.error('Failed to fetch users');
  }
};

const getUserRole = (user: any) => {
  if (user.is_superuser) return 'Admin';
  if (user.is_staff) return 'Staff';
  return 'Student';
};

const viewUser = (userId: number) => {
  router.push({ name: 'admin.user.detail', params: { id: userId } });
};

const messageUser = (userId: number) => {
  $toast.info(`Messaging user ${userId} (Not implemented)`);
};

const toggleBlockUser = async (userId: number, isActive: boolean) => {
  try {
    await api.patch(`auth/users/${userId}/`, { is_active: !isActive });
    const user = usersList.value.find(item => item.id === userId);
    if (user) user.is_active = !isActive;
    $toast.success(`User ${isActive ? 'blocked' : 'unblocked'} successfully!`);
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