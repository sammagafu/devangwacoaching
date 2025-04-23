<template>
  <AdminLayout>
    <b-row>
      <b-col cols="12">
        <h1 class="h3 mb-2 mb-sm-0">Students</h1>
      </b-col>
    </b-row>

    <b-card no-body class="bg-transparent">
      <b-card-header class="bg-transparent border-bottom px-0">
        <b-row class="g-3 align-items-center justify-content-between">
          <b-col md="8">
            <b-form class="rounded position-relative" @submit.prevent="handleSearch">
              <b-form-input
                class="bg-transparent"
                type="search"
                placeholder="Search by name or email"
                v-model="searchQuery"
                @input="filterUsers"
              />
              <button
                class="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset"
                type="submit"
              >
                <font-awesome-icon :icon="faSearch" class="fs-6" />
              </button>
            </b-form>
          </b-col>

          <b-col md="3">
            <ul
              class="list-inline mb-0 nav nav-pills nav-pill-dark-soft border-0 justify-content-end"
              id="pills-tab"
              role="tablist"
            >
              <li class="nav-item">
                <a
                  href="#nav-preview-tab-1"
                  class="nav-link mb-0 me-2"
                  :class="!show && 'active'"
                  data-bs-toggle="tab"
                  @click="show = false"
                >
                  <font-awesome-icon :icon="faThLarge" class="fa-fw" />
                </a>
              </li>
              <li class="nav-item">
                <a
                  href="#nav-html-tab-1"
                  class="nav-link mb-0"
                  :class="show && 'active'"
                  data-bs-toggle="tab"
                  @click="show = true"
                >
                  <font-awesome-icon :icon="faListUl" class="fa-fw" />
                </a>
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-card-header>

      <b-card-body class="px-0">
        <div class="tab-content">
          <div class="tab-pane fade" :class="!show && 'show active'" id="nav-preview-tab-1">
            <StudentGrid :users-list="paginatedUsers" @user-deleted="fetchUsers" @user-updated="updateUser" />
          </div>
          <div class="tab-pane fade" :class="show && 'show active'" id="nav-html-tab-1">
            <StudentList @user-updated="updateUser" />
          </div>
        </div>
      </b-card-body>

      <b-card-footer class="bg-transparent pt-0 px-0">
        <div class="d-sm-flex justify-content-sm-between align-items-sm-center">
          <p class="mb-0 text-center text-sm-start">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
            {{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }} of {{ filteredUsers.length }} entries
          </p>
          <nav class="d-flex justify-content-center mb-0" aria-label="navigation">
            <ul class="pagination pagination-sm pagination-primary-soft mb-0 pb-0 px-0">
              <li class="page-item mb-0" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="currentPage--" tabindex="-1">
                  <font-awesome-icon :icon="faAngleLeft" />
                </a>
              </li>
              <li
                class="page-item mb-0"
                v-for="page in totalPages"
                :key="page"
                :class="{ active: page === currentPage }"
              >
                <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
              </li>
              <li class="page-item mb-0" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="currentPage++">
                  <font-awesome-icon :icon="faAngleRight" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </b-card-footer>
    </b-card>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import AdminLayout from '@/layouts/AdminLayout.vue';
import StudentGrid from '@/views/admin/studentList/components/StudentGrid.vue';
import StudentList from '@/views/admin/studentList/components/StudentList.vue';
import { faAngleRight, faAngleLeft, faSearch, faThLarge, faListUl } from '@fortawesome/free-solid-svg-icons';
import { api } from '@/services/authService';

const $toast = useToast();
const show = ref(false);
const usersList = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(8);

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

const filteredUsers = computed(() => {
  if (!searchQuery.value) return usersList.value;
  const query = searchQuery.value.toLowerCase();
  return usersList.value.filter(
    user =>
      (user.full_name?.toLowerCase().includes(query) || user.email.toLowerCase().includes(query))
  );
});

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value));

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredUsers.value.slice(start, end);
});

const handleSearch = () => {
  currentPage.value = 1; // Reset to first page on search
};

const filterUsers = () => {
  currentPage.value = 1; // Reset to first page on filter change
};

const updateUser = ({ userId, is_active }: { userId: number; is_active: boolean }) => {
  const user = usersList.value.find(u => u.id === userId);
  if (user) user.is_active = is_active;
};

onMounted(() => {
  fetchUsers();
});
</script>