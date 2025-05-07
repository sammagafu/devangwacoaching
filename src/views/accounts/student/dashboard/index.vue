<template>
	<StudentLayout>
	  <b-col xl="9">
		<b-row class="mb-4">
		  <b-col sm="6" lg="4" class="mb-3 mb-lg-0">
			<div class="d-flex justify-content-center align-items-center p-4 bg-orange bg-opacity-15 rounded-3">
			  <span class="display-6 lh-1 text-orange mb-0">
				<font-awesome-icon :icon="faTv" class="fa-fw" />
			  </span>
			  <div class="ms-4">
				<div class="d-flex">
				  <NumberAnimation :from="0" :to="totalCourses" :duration="3" :format="format" :delay="0.5"
					class="purecounter mb-0 fw-bold h5" />
				</div>
				<p class="mb-0 h6 fw-light">Total Courses</p>
			  </div>
			</div>
		  </b-col>
		  <b-col sm="6" lg="4" class="mb-3 mb-lg-0">
			<div class="d-flex justify-content-center align-items-center p-4 bg-purple bg-opacity-15 rounded-3">
			  <span class="display-6 lh-1 text-purple mb-0">
				<font-awesome-icon :icon="faClipboardCheck" class="fa-fw" />
			  </span>
			  <div class="ms-4">
				<div class="d-flex">
				  <NumberAnimation :from="0" :to="completeLessons" :duration="3" :format="format" :delay="0.5"
					class="purecounter mb-0 fw-bold h5" />
				</div>
				<p class="mb-0 h6 fw-light">Complete Lessons</p>
			  </div>
			</div>
		  </b-col>
		  <b-col sm="6" lg="4" class="mb-3 mb-lg-0">
			<div class="d-flex justify-content-center align-items-center p-4 bg-success bg-opacity-10 rounded-3">
			  <span class="display-6 lh-1 text-success mb-0">
				<font-awesome-icon :icon="faMedal" class="fa-fw" />
			  </span>
			  <div class="ms-4">
				<div class="d-flex">
				  <NumberAnimation :from="0" :to="achievedCertificates" :duration="3" :format="format" :delay="0.5"
					class="purecounter mb-0 fw-bold h5" />
				</div>
				<p class="mb-0 h6 fw-light">Achieved Certificates</p>
			  </div>
			</div>
		  </b-col>
		</b-row>
  
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
  
			<!-- Handle empty enrollments -->
			<div v-if="filteredCourses.length === 0" class="text-center py-4">
			  <p class="text-muted">You are not enrolled in any courses yet.</p>
			  <a href="/courses" class="btn btn-primary">Explore Courses</a>
			</div>
  
			<!-- Courses table -->
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
						  <h6><a href="#">{{ item.title }}</a></h6>
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
						  Complete
						</b-button>
						<a href="#" class="btn btn-sm btn-light me-1 icons-center">
						  <BIconArrowRepeat class="me-1" />
						  Restart
						</a>
					  </template>
					  <template v-else>
						<a href="#" class="btn btn-sm btn-primary-soft me-1 mb-1 mb-md-0 icons-center">
						  <BIconPlayCircle class="me-1" />
						  Continue
						</a>
					  </template>
					</td>
				  </tr>
				</tbody>
			  </table>
			</div>
  
			<!-- Pagination (shown only if there are courses) -->
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
  import { ref, computed, onMounted } from 'vue';
  import NumberAnimation from "vue-number-animation";
  import StudentLayout from '@/layouts/StudentLayout.vue';
  import { faTv, faClipboardCheck, faMedal, faSearch, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
  import { BIconPlayCircle, BIconCheck, BIconArrowRepeat } from 'bootstrap-icons-vue';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores/auth'; // Adjust path to your auth store
  import { api } from '@/services/authService';
  
  // Access auth store
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore); // Reactive user object from store.auth
  
  // Fetch user data from API
  onMounted(async () => {
	try {
	  const response = await api.get('auth/users/me/'); // Adjust endpoint as needed
	  authStore.updateUser(response.data); // Update store with user data
	} catch (error) {
	  console.error('Failed to fetch user data:', error);
	}
  });
  
  // Compute myCourses from user.enrollments
  const myCourses = computed(() => {
	if (!user.value?.enrollments?.length) {
	  return [];
	}
	return user.value.enrollments.map(enrollment => ({
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
	  enrolled_at: enrollment.enrolled_at // For sorting by Newest
	}));
  });
  
  // Dashboard statistics
  const totalCourses = computed(() => myCourses.value.length);
  const completeLessons = computed(() => 
	myCourses.value.reduce((sum, course) => sum + course.completed, 0)
  );
  const achievedCertificates = computed(() => 
	user.value?.enrollments?.filter(enrollment => enrollment.certificate_issued).length || 0
  );
  
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
		  return (a.course?.price || 0) - (b.course?.price || 0); // Assumes price in course
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
  
  // Formatting function
  const format = (value: number) => Math.round(value);
  </script>