<template>
	<section class="pb-0 py-lg-5">
	  <b-container>
		<b-row>
		  <DetailTabs :course="course" />
		  <b-col lg="4" class="pt-5 pt-lg-0">
			<b-row class="mb-5 mb-lg-0">
			  <b-col md="6" lg="12">
				<b-card no-body class="shadow p-2 mb-4 z-index-9">
				  <div class="overflow-hidden rounded-3">
					<img :src="course.image || defaultAvatar" class="card-img" alt="course img">
					<div class="bg-overlay bg-dark opacity-6"></div>
					<div class="card-img-overlay d-flex align-items-start flex-column p-3">
					  <div class="m-auto">
						<CustomGLightbox
						  :link="course.video || 'https://www.youtube.com/embed/tXHviS-4ygo'"
						  class="btn btn-lg text-danger btn-round btn-white-shadow mb-0"
						>
						  <font-awesome-icon :icon="faPlay" />
						</CustomGLightbox>
					  </div>
					</div>
				  </div>
  
				  <b-card-body class="px-3">
					<div class="d-flex justify-content-between align-items-center">
					  <div>
						<div class="d-flex align-items-center">
						  <h3 class="fw-bold mb-0 me-2">{{ currency }}{{ course.final_price || course.price }}</h3>
						  <span v-if="course.discount_percentage > 0" class="text-decoration-line-through mb-0 me-2">
							{{ currency }}{{ course.price }}
						  </span>
						  <span v-if="course.discount_percentage > 0" class="badge text-bg-orange mb-0">
							{{ course.discount_percentage }}% off
						  </span>
						</div>
						<p v-if="course.discount_deadline" class="mb-0 text-danger">
						  <font-awesome-icon :icon="faStopwatch" class="me-2" />
						  Discount ends {{ formatDate(course.discount_deadline) }}
						</p>
					  </div>
  
					  <b-dropdown end variant="link" toggle-class="btn btn-sm btn-light rounded small"
						menu-class="dropdown-w-sm dropdown-menu-end shadow rounded" no-caret>
						<template #button-content>
						  <font-awesome-icon :icon="faShareAlt" class="fa-fw" />
						</template>
						<b-dropdown-item href="#">
						  <font-awesome-icon :icon="faTwitterSquare" class="me-2" />
						  Twitter
						</b-dropdown-item>
						<b-dropdown-item href="#">
						  <font-awesome-icon :icon="faFacebookSquare" class="me-2" />
						  Facebook
						</b-dropdown-item>
						<b-dropdown-item href="#">
						  <font-awesome-icon :icon="faLinkedinIn" class="me-2" />
						  LinkedIn
						</b-dropdown-item>
						<b-dropdown-item href="#">
						  <font-awesome-icon :icon="faCopy" class="me-2" />
						  Copy link
						</b-dropdown-item>
					  </b-dropdown>
					</div>
  
					<div class="mt-3 d-sm-flex justify-content-sm-between">
					  <a href="#" class="btn btn-outline-primary mb-0">Free trial</a>
					  <a href="#" class="btn btn-success mb-0">Buy course</a>
					</div>
				  </b-card-body>
				</b-card>
  
				<b-card no-body class="card-body shadow p-4 mb-4">
				  <h4 class="mb-3">This course includes</h4>
				  <ul class="list-group list-group-borderless">
					<li class="list-group-item d-flex justify-content-between align-items-center">
					  <span class="h6 fw-light mb-0">
						<font-awesome-icon :icon="faBookOpen" class="fa-fw text-primary" />
						Lectures
					  </span>
					  <span>{{ course.total_modules || 'N/A' }}</span>
					</li>
					<li class="list-group-item d-flex justify-content-between align-items-center">
					  <span class="h6 fw-light mb-0">
						<font-awesome-icon :icon="faClock" class="fa-fw text-primary" />
						Duration
					  </span>
					  <span>{{ course.duration || `${course.total_videos || 10}h 0m` }}</span>
					</li>
					<li class="list-group-item d-flex justify-content-between align-items-center">
					  <span class="h6 fw-light mb-0">
						<font-awesome-icon :icon="faSignal" class="fa-fw text-primary" />
						Skills
					  </span>
					  <span>{{ course.level || 'Beginner' }}</span>
					</li>
					<li class="list-group-item d-flex justify-content-between align-items-center">
					  <span class="h6 fw-light mb-0">
						<font-awesome-icon :icon="faGlobe" class="fa-fw text-primary" />
						Language
					  </span>
					  <span>{{ course.language || 'English' }}</span>
					</li>
					<li class="list-group-item d-flex justify-content-between align-items-center">
					  <span class="h6 fw-light mb-0">
						<font-awesome-icon :icon="faUserClock" class="fa-fw text-primary" />
						Deadline
					  </span>
					  <span>{{ formatDate(course.discount_deadline) || 'N/A' }}</span>
					</li>
					<li class="list-group-item d-flex justify-content-between align-items-center">
					  <span class="h6 fw-light mb-0">
						<font-awesome-icon :icon="faMedal" class="fa-fw text-primary" />
						Certificate
					  </span>
					  <span>{{ course.certificate ? 'Yes' : 'No' }}</span>
					</li>
				  </ul>
				</b-card>
			  </b-col>
  
			  <b-col md="6" lg="12">
				<b-card no-body class="card-body shadow p-4 mb-4">
				  <h4 class="mb-3">Popular Tags</h4>
				  <ul class="list-inline mb-0">
					<li class="list-inline-item" v-for="tag in course.tags" :key="tag">
					  <a class="btn btn-outline-light btn-sm" href="#">{{ tag }}</a>
					</li>
					<li v-if="!course.tags.length" class="list-inline-item">
					  <a class="btn btn-outline-light btn-sm" href="#">general</a>
					</li>
				  </ul>
				</b-card>
			  </b-col>
			</b-row>
		  </b-col>
		</b-row>
	  </b-container>
	</section>
  </template>
  
  <script setup lang="ts">
  import { defineProps, watch } from 'vue';
  import { currency } from '@/helpers/constants';
  import CustomGLightbox from '@/components/CustomGLightbox.vue';
  import DetailTabs from '@/views/pages/course/detail-classic/components/DetailTabs.vue';
  import { faShareAlt, faPlay, faStopwatch, faCopy, faBookOpen, faClock, faSignal, faGlobe, faUserClock, faMedal, faStar } from '@fortawesome/free-solid-svg-icons';
  import { faTwitterSquare, faFacebookSquare, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
  import avatar01 from '@/assets/images/avatar/01.jpg';
  
  const defaultAvatar = avatar01;
  
  defineProps({
	course: {
	  type: Object,
	  required: true,
	},
  });
  
  watch(
	() => course,
	(newCourse) => {
	  console.log('PageContent course updated:', newCourse);
	},
	{ deep: true }
  );
  
  const formatDate = (dateString) => {
	if (!dateString) return 'N/A';
	return new Date(dateString).toLocaleDateString('en-US', {
	  year: 'numeric',
	  month: 'short',
	  day: 'numeric',
	});
  };
  </script>