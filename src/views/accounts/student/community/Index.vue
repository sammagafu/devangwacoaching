<template>
  <StudentLayout>
    <b-col xl="9">
      <b-row class="mb-3">
        <b-col cols="12" class="d-sm-flex justify-content-between align-items-center">
          <h1 class="h3 mb-2 mb-sm-0">Community Categories</h1>
          <b-button variant="primary" @click="showCreateModal = true">Create New Category</b-button>
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
                  placeholder="Search by name"
                  v-model="searchQuery"
                  @input="filterCategories"
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
              <ul class="list-inline mb-0 nav nav-pills nav-pill-dark-soft border-0 justify-content-end" id="pills-tab" role="tablist">
                <li class="nav-item">
                  <a href="#nav-list-tab" class="nav-link mb-0 me-2" :class="!showGrid && 'active'" data-bs-toggle="tab" @click="showGrid = false">
                    <font-awesome-icon :icon="faListUl" class="fa-fw" />
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#nav-grid-tab" class="nav-link mb-0" :class="showGrid && 'active'" data-bs-toggle="tab" @click="showGrid = true">
                    <font-awesome-icon :icon="faThLarge" class="fa-fw" />
                  </a>
                </li>
              </ul>
            </b-col>
          </b-row>
        </b-card-header>

        <b-card-body class="px-0">
          <div class="tab-content">
            <div class="tab-pane fade" :class="!showGrid && 'show active'" id="nav-list-tab">
              <CategoryTable :categories="paginatedCategories" :user="user" @join="joinCommunity" @leave="leaveCommunity" />
            </div>
            <div class="tab-pane fade" :class="showGrid && 'show active'" id="nav-grid-tab">
              <CategoryGrid :categories="paginatedCategories" :user="user" @join="joinCommunity" @leave="leaveCommunity" />
            </div>
          </div>
        </b-card-body>

        <b-card-footer class="bg-transparent pt-0 px-0">
          <div class="d-sm-flex justify-content-sm-between align-items-sm-center">
            <p class="mb-0 text-center text-sm-start">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
              {{ Math.min(currentPage * itemsPerPage, filteredCategories.length) }} of {{ filteredCategories.length }} entries
            </p>
            <nav class="d-flex justify-content-center mb-0" aria-label="navigation">
              <ul class="pagination pagination-sm pagination-primary-soft mb-0 pb-0 px-0">
                <li class="page-item mb-0" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="#" @click.prevent="currentPage--">
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

      <b-modal v-model="showCreateModal" title="Create New Category" @hidden="resetForm">
        <CreateCategory @category-created="fetchCategories" />
      </b-modal>
    </b-col>
  </StudentLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useRouter } from 'vue-router';
import StudentLayout from '@/layouts/StudentLayout.vue';
import CategoryTable from '@/views/accounts/student/community/components/CategoryTable.vue';
import CategoryGrid from '@/views/accounts/student/community/components/CategoryGrid.vue';
import CreateCategory from '@/views/accounts/student/community/components/CreateCategory.vue';
import { faSearch, faListUl, faThLarge, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { api } from '@/services/authService';

const $toast = useToast();
const router = useRouter();
const showGrid = ref(false);
const showCreateModal = ref(false);
const categories = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10); // Align with backend pagination
const user = ref(null);

const fetchCategories = async () => {
  try {
    const response = await api.get('community/categories/', { params: { page: currentPage.value, page_size: itemsPerPage.value } });
    categories.value = response.data.results; // Assuming Django REST Framework pagination
    $toast.success('Categories loaded successfully!');
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    $toast.error('Failed to fetch categories');
  }
};

const fetchUser = async () => {
  try {
    const response = await api.get('auth/users/me/'); // Adjust endpoint based on your auth setup
    user.value = response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    $toast.error('Failed to fetch user data');
  }
};

const joinCommunity = async (slug) => {
  try {
    await api.post(`community/categories/${slug}/join/`);
    $toast.success('Joined community successfully!');
    await fetchCategories(); // Refresh categories to update follower count
  } catch (error) {
    console.error('Failed to join community:', error);
    $toast.error('Failed to join community');
  }
};

const leaveCommunity = async (slug) => {
  try {
    await api.post(`community/categories/${slug}/leave/`);
    $toast.success('Left community successfully!');
    await fetchCategories(); // Refresh categories to update follower count
  } catch (error) {
    console.error('Failed to leave community:', error);
    $toast.error('Failed to leave community');
  }
};

const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value;
  const query = searchQuery.value.toLowerCase();
  return categories.value.filter(category =>
    category.name.toLowerCase().includes(query) || category.description.toLowerCase().includes(query)
  );
});

const totalPages = computed(() => Math.ceil(filteredCategories.value.length / itemsPerPage.value));

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCategories.value.slice(start, end);
});

const handleSearch = () => {
  currentPage.value = 1; // Reset to first page on search
};

const filterCategories = () => {
  currentPage.value = 1; // Reset to first page on filter change
};

const resetForm = () => {
  showCreateModal.value = false;
};

onMounted(() => {
  fetchCategories();
  fetchUser();
});
</script>