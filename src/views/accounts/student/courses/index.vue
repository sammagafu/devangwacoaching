<template>
	<StudentLayout>
	  <b-col xl="9">
		<b-card no-body class="bg-transparent border rounded-3">
		  <b-card-header class="bg-transparent border-bottom">
			<h3 class="mb-0">{{ authStore.user?.full_name ?? 'Student' }}'s Courses List</h3>
		  </b-card-header>
		  <b-card-body>
			<b-row class="g-3 align-items-center justify-content-between mb-4">
			  <b-col md="8">
				<b-form class="rounded position-relative">
				  <b-form-input class="pe-5 bg-transparent" type="search" placeholder="Search" v-model="searchQuery" />
				  <button
					class="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset"
					type="submit">
					<font-awesome-icon :icon="faSearch" class="fs-6" />
				  </button>
				</b-form>
			  </b-col>
  
			  <b-col md="3">
				<b-form>
				  <ChoicesSelect id="sort-by" class="border-0 z-index-9 bg-transparent" v-model="sortBy">
					<option value="">Sort by</option>
					<option value="Free">Free</option>
					<option value="Newest">Newest</option>
					<option value="Most popular">Most popular</option>
					<option value="Most Viewed">Most Viewed</option>
				  </ChoicesSelect>
				</b-form>
			  </b-col>
			</b-row>
  
			<div v-if="filteredCourses.length === 0" class="text-center py-4">
			  <p class="text-muted">You are not enrolled in any courses yet.</p>
			  <router-link to="/courses" class="btn btn-primary">Explore Courses</router-link>
			</div>
  
			<div v-else class="table-responsive border-0">
			  <table class="table table-dark-gray align-middle p-4 mb-0 table-hover">
				<thead>
				  <tr>
					<th scope="col" class="border-0 rounded-start">Course Title</th>
					<th scope="col" class="border-0">Total Lectures</th>
					<th scope="col" class="border-0">Completed Lecture</th>
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
							<router-link :to="{ name: 'student.course.details', params: { slug: item.slug } }">
							  {{ item.title }}
							</router-link>
						  </h6>
						  <div class="overflow-hidden">
							<h6 class="mb-0 text-end">{{ item.progress }}%</h6>
							<b-progress class="progress-sm bg-primary bg-opacity-10">
							  <b-progress-bar class="bg-primary aos" :value="item.progress" />
							</b-progress>
						  </div>
						</div>
					  </div>
					</td>
  
					<td>{{ item.lectures }}</td>
  
					<td>{{ item.completed }}</td>
  
					<td>
					  <template v-if="item.progress === 100">
						<b-button variant="success" size="sm" class="me-1 mb-1 mb-xl-0 disabled icons-center">
						  <BIconCheck class="me-1" />
						  Completed
						</b-button>
						<router-link :to="{ name: 'student.course.details', params: { slug: item.slug } }" class="btn btn-sm btn-light me-1 icons-center">
						  <BIconArrowRepeat class="me-1" />
						  Restart
						</router-link>
					  </template>
					  <template v-else>
						<router-link :to="{ name: 'student.course.details', params: { slug: item.slug } }" class="btn btn-sm btn-primary-soft me-1 mb-1 mb-md-0 icons-center">
						  <BIconPlayCircle class="me-1" />
						  Continue
						</router-link>
					  </template>
					</td>
				  </tr>
				</tbody>
			  </table>
			</div>
  
			<div v-if="filteredCourses.length > 0" class="d-sm-flex justify-content-sm-between align-items-sm-center mt-4 mt-sm-3">
			  <p class="mb-0 text-center text-sm-start">Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredCourses.length) }} of {{ filteredCourses.length }} entries</p>
			  <nav class="d-flex justify-content-center mb-0" aria-label="navigation">
				<ul class="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
				  <li class="page-item mb-0" :class="{ disabled: currentPage === 1 }">
					<a class="page-link" href="#" @click.prevent="currentPage--" tabindex="-1">
					  <font-awesome-icon :icon="faAngleLeft" />
					</a>
				  </li>
				  <li v-for="page in totalPages" :key="page" class="page-item mb-0" :class="{ active: currentPage === page }">
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
		  </b-card-body>
		</b-card>
	  </b-col>
	</StudentLayout>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import StudentLayout from '@/layouts/StudentLayout.vue';
  import { faSearch, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
  import { BIconPlayCircle, BIconCheck, BIconArrowRepeat } from 'bootstrap-icons-vue';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores/auth';
  
  // Access auth store
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore); // Reactive user object
  
  // Compute myCourses from user.enrollments
  const myCourses = computed(() => {
	if (!user.value?.enrollments?.length) {
	  return [];
	}
	return user.value.enrollments.map(enrollment => ({
	  slug: enrollment.course.slug, // For routing
	  image: enrollment.course.cover || '/path/to/default-image.jpg', // Fallback image
	  title: enrollment.course.title,
	  progress: enrollment.completion_percentage,
	  lectures: (enrollment.course.total_videos || 0) + 
				(enrollment.course.total_documents || 0) + 
				(enrollment.course.total_quizzes || 0),
	  completed: Math.round(
		(enrollment.completion_percentage / 100) * 
		((enrollment.course.total_videos || 0) + 
		 (enrollment.course.total_documents || 0) + 
		 (enrollment.course.total_quizzes || 0))
	  ),
	  enrolled_at: enrollment.course.created_at, // For sorting by Newest
	  price: enrollment.course.price || 0 // For sorting by Free
	}));
  });
  
  // Search and sort
  const searchQuery = ref('');
  const sortBy = ref('');
  const filteredCourses = computed(() => {
	let courses = [...myCourses.value];
	if (searchQuery.value) {
	  courses = courses.filter(course => 
		course.title.toLowerCase().includes(searchQuery.value.toLowerCase())
	  );
	}
	if (sortBy.value) {
	  courses.sort((a, b) => {
		if (sortBy.value === 'Free') {
		  return (a.price || 0) - (b.price || 0);
		} else if (sortBy.value === 'Newest') {
		  return new Date(b.enrolled_at).getTime() - new Date(a.enrolled_at).getTime();
		} else if (sortBy.value === 'Most popular') {
		  return (b.course?.enrollment_count || 0) - (a.course?.enrollment_count || 0); // Requires backend support
		} else if (sortBy.value === 'Most Viewed') {
		  return (b.course?.view_count || 0) - (a.course?.view_count || 0); // Requires backend support
		}
		return 0;
	  });
	}
	return courses;
  });
  
  // Pagination
  const currentPage = ref(1);
  const itemsPerPage = ref(8);
  const totalPages = computed(() => Math.ceil(filteredCourses.value.length / itemsPerPage.value));
  const paginatedCourses = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage.value;
	return filteredCourses.value.slice(start, start + itemsPerPage.value);
  });
  </script>