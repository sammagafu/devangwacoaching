<template>
  <StudentLayout>
    <b-col xl="9">
      <b-card no-body class="bg-transparent border rounded-3">
        <b-card-header class="bg-transparent border-bottom">
          <h3 class="mb-0">{{ authStore.user?.full_name ?? 'Student' }}'s Courses</h3>
        </b-card-header>
        <b-card-body>
          <div v-if="loading" class="text-center py-4">
            <b-spinner variant="primary" />
          </div>

          <div v-else-if="filteredCourses.length === 0" class="text-center py-4">
            <p class="text-muted">You are not enrolled in any courses yet.</p>
            <router-link :to="{ name: 'courses' }" class="btn btn-primary">Explore Courses</router-link>
          </div>

          <div v-else class="table-responsive border-0">
            <table class="table table-dark-gray align-middle p-4 mb-0 table-hover">
              <thead>
                <tr>
                  <th scope="col" class="border-0 rounded-start">Course Title</th>
                  <th scope="col" class="border-0">Total Lectures</th>
                  <th scope="col" class="border-0">Completed</th>
                  <th scope="col" class="border-0 rounded-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in paginatedCourses" :key="idx">
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="w-100px">
                        <img :src="item.image" class="rounded" alt="">
                      </div>
                      <div class="mb-0 ms-2">
                        <h6>
                          <router-link :to="{ name: 'course.detail', params: { slug: item.slug } }">
                            {{ item.title }}
                          </router-link>
                        </h6>
                        <div class="overflow-hidden">
                          <h6 class="mb-0 text-end">{{ item.progress }}%</h6>
                          <b-progress class="progress-sm bg-primary bg-opacity-10">
                            <b-progress-bar class="bg-primary" :value="item.progress" />
                          </b-progress>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{{ item.lectures }}</td>
                  <td>{{ item.completed }}</td>
                  <td>
                    <router-link
                      :to="{ name: 'student.course.details', params: { slug: item.slug } }"
                      class="btn btn-sm btn-primary-soft icons-center"
                    >
                      <BIconPlayCircle class="me-1" />
                      {{ item.progress === 100 ? 'Review' : 'Continue' }}
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </StudentLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import StudentLayout from '@/layouts/StudentLayout.vue';
import { BIconPlayCircle } from 'bootstrap-icons-vue';
import { useAuthStore } from '@/stores/auth';
import courseService from '@/services/courseService';

const authStore = useAuthStore();
const myCourses = ref([]);
const loading = ref(false);
const searchQuery = ref('');

const filteredCourses = computed(() => {
  if (!searchQuery.value) return myCourses.value;
  return myCourses.value.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const currentPage = ref(1);
const itemsPerPage = ref(8);
const totalPages = computed(() => Math.ceil(filteredCourses.value.length / itemsPerPage.value));
const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredCourses.value.slice(start, start + itemsPerPage.value);
});

onMounted(async () => {
  loading.value = true;
  try {
    myCourses.value = await courseService.fetchEnrolled();
  } finally {
    loading.value = false;
  }
});
</script>
