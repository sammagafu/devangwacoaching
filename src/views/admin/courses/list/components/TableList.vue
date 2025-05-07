<template>
  <b-row class="g-4 mb-4">
    <b-col sm="6" lg="4">
      <div class="text-center p-4 bg-primary bg-opacity-10 border border-primary rounded-3">
        <h6>Total Courses</h6>
        <h2 class="mb-0 fs-1 text-primary">{{ coursesList.length }}</h2>
      </div>
    </b-col>

    <b-col sm="6" lg="4">
      <div class="text-center p-4 bg-success bg-opacity-10 border border-success rounded-3">
        <h6>Activated Courses</h6>
        <h2 class="mb-0 fs-1 text-success">{{ activatedCoursesCount }}</h2>
      </div>
    </b-col>

    <b-col sm="6" lg="4">
      <div class="text-center p-4 bg-warning bg-opacity-15 border border-warning rounded-3">
        <h6>Pending Courses</h6>
        <h2 class="mb-0 fs-1 text-warning">{{ pendingCoursesCount }}</h2>
      </div>
    </b-col>
  </b-row>
  
  <b-card no-body class="bg-transparent border">
    <b-card-header class="bg-light border-bottom">
      <b-row class="g-3 align-items-center justify-content-between">
        <b-col md="8">
          <b-form class="rounded position-relative">
            <b-form-input class="bg-body" type="search" placeholder="Search" v-model="searchQuery" />
            <button
              class="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset"
              type="submit">
              <font-awesome-icon :icon="faSearch" class="fs-6" />
            </button>
          </b-form>
        </b-col>

        <b-col md="3">
          <b-form>
            <ChoicesSelect
              id="sort"
              class="border-0 z-index-9"
              v-model="sortValue"
              :options="sortOptions"
              @update:modelValue="sortCourses"
            >
              <option value="">Sort by</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </ChoicesSelect>
          </b-form>
        </b-col>
      </b-row>
    </b-card-header>

    <b-card-body>
      <div class="table-responsive border-0 rounded-3 mb-0">
        <table class="table table-dark-gray align-middle p-4 mb-0 table-hover">
          <thead>
            <tr>
              <th scope="col" class="border-0 rounded-start">Course Name</th>
              <th scope="col" class="border-0">Instructor</th>
              <th scope="col" class="border-0">Added Date</th>
              <th scope="col" class="border-0">Type</th>
              <th scope="col" class="border-0">Price</th>
              <th scope="col" class="border-0">Status</th>
              <th scope="col" class="border-0 rounded-end">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, idx) in filteredCourses" :key="idx">
              <td>
                <div class="d-flex align-items-center position-relative">
                  <div class="w-60px">
                    <img :src="item.cover" class="rounded" alt="">
                  </div>
                  <h6 class="table-responsive-title mb-0 ms-2">
                    <router-link :to="{ name: 'admin.course.detail', params: { slug: item.slug } }" class="stretched-link">
                      {{ item.title }}
                    </router-link>
                  </h6>
                </div>
              </td>

              <td>
                <div class="d-flex align-items-center mb-3">
                  <div class="avatar avatar-xs flex-shrink-0">
                    <img class="avatar-img rounded-circle" :src="item.instructor?.avatar || defaultAvatar" alt="avatar">
                  </div>
                  <div class="ms-2">
                    <h6 class="mb-0 fw-light">{{ item.instructor?.full_name || item.instructor?.email || 'Unknown' }}</h6>
                  </div>
                </div>
              </td>

              <td>{{ formatDate(item.created_at) }}</td>

              <td>
                <span class="badge text-bg-primary">Course</span>
              </td>

              <td>{{ currency }}{{ item.final_price }}</td>

              <td>
                <span class="badge bg-opacity-15"
                  :class="item.ispublished ? 'bg-success text-success' : 'bg-warning text-warning'">
                  {{ item.ispublished ? 'Live' : 'Pending' }}
                </span>
              </td>

              <td>
                <router-link v-if="isAdmin" :to="{ name: 'admin.course.edit', params: { slug: item.slug } }" class="btn btn-sm btn-dark me-1 mb-1 mb-md-0">Edit</router-link>
                <template v-if="!item.ispublished">
                  <a href="#" class="btn btn-sm btn-success-soft me-1 mb-1 mb-md-0" @click="approveCourse(item.slug)">Approve</a>
                  <button class="btn btn-sm btn-secondary-soft mb-0" @click="rejectCourse(item.slug)">Reject</button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card-body>

    <b-card-footer class="bg-transparent pt-0">
      <div class="d-sm-flex justify-content-sm-between align-items-sm-center">
        <p class="mb-0 text-center text-sm-start">Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredCourses.length) }} of {{ coursesList.length }} entries</p>
        <nav class="d-flex justify-content-center mb-0" aria-label="navigation">
          <ul class="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
            <li class="page-item mb-0" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="currentPage--"><font-awesome-icon :icon="faAngleLeft" /></a>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item mb-0" :class="{ active: currentPage === page }">
              <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
            </li>
            <li class="page-item mb-0" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="currentPage++"><font-awesome-icon :icon="faAngleRight" /></a>
            </li>
          </ul>
        </nav>
      </div>
    </b-card-footer>
  </b-card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { faSearch, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { currency } from '@/helpers/constants';
import { api } from '@/services/authService';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import avatar01 from '@/assets/images/avatar/01.jpg';

const $toast = useToast();
const coursesList = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const sortValue = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const isAdmin = computed(() => user.value?.is_admin || user.value?.is_staff || false);

const defaultAvatar = avatar01;

const sortOptions = ref([
  { value: '', label: 'Sort by' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
]);

const totalPages = computed(() => Math.ceil(coursesList.value.length / itemsPerPage.value));

const filteredCourses = computed(() => {
  let filtered = [...coursesList.value];

  if (searchQuery.value) {
    filtered = filtered.filter(course =>
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  switch (sortValue.value) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      break;
    case 'accepted':
      filtered = filtered.filter(course => course.ispublished);
      break;
    case 'rejected':
      filtered = filtered.filter(course => !course.ispublished);
      break;
    default:
      break;
  }

  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filtered.slice(start, start + itemsPerPage.value);
});

const activatedCoursesCount = computed(() => {
  return coursesList.value.filter(course => course.ispublished).length;
});

const pendingCoursesCount = computed(() => {
  return coursesList.value.filter(course => !course.ispublished).length;
});

onMounted(async () => {
  await fetchCourses();
});

const fetchCourses = async () => {
  try {
    loading.value = true;
    const response = await api.get('course/courses/');
    coursesList.value = response.data;
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    $toast.error('Failed to fetch courses');
  } finally {
    loading.value = false;
  }
};

const approveCourse = async (courseId) => {
  try {
    await api.patch(`course/courses/${courseId}/`, { ispublished: true });
    const course = coursesList.value.find(item => item.id === courseId);
    if (course) course.ispublished = true;
    $toast.success('Course approved successfully!');
  } catch (error) {
    console.error('Failed to approve course:', error);
    $toast.error('Failed to approve course');
  }
};

const rejectCourse = async (courseId) => {
  try {
    await api.patch(`course/courses/${courseId}/`, { ispublished: false });
    $toast.success('Course rejected successfully!');
  } catch (error) {
    console.error('Failed to reject course:', error);
    $toast.error('Failed to reject course');
  }
};

const sortCourses = () => {
  // Handled by filteredCourses
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
</script>