<template>
  <Breadcrum></Breadcrum>
  <div class="xl:max-w-[1350px] lg:max-w-[960px] md:max-w-2xl sm:max-w-xl xl mx-auto px-3 py-20">
    <div class="container mx-auto">
      <div class="grid grid-cols-12 gap-[30px]">
        <div class="lg:col-span-8 col-span-12">
          <div class="single-course-details">
            <div class="xl:h-[470px] h-[350px] mb-10 course-main-thumb">
              <img src="@/assets/images/placeholder/single-course-thumb.png" alt=""
                class=" rounded-md object-fut w-full h-full block">
            </div>
            <div class=" mb-6">
              <span class="bg-devanga-secondary py-1 px-3  font-raleway font-semibold rounded text-white ">Data
                Science</span>
            </div>

            <div class="enrolled mb-6 h-48 w-32">
                <AvatarGroup class="mr--4">
                  <!-- <Avatar :image="avatar" size="normal" shape="circle" /> -->
                  <Avatar :image="avatar" size="normal" shape="circle" />
                  <Avatar :label="courses?.enrollments?.length + 'Enrollment(s)'" shape="circle" size="large" />
              </AvatarGroup>
            </div>


            <h2 class="font-raleway text-4xl font-semibold">{{ courses.title }}</h2>


            <!-- course meta data -->
            <div class="author-meta mt-6 sm:flex  lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
              <div class="flex space-x-4 items-center group">
                <div class="flex-1">
                  <span class="text-devanga-secondary">Trainer
                    <a href="#" class=" text-black">
                      : {{ courses.instructor.full_name }}</a>
                  </span>
                </div>
              </div>
              <div>
                <span class=" text-secondary  ">Last Update:
                  {{ courses.updated_at }}
                </span>
              </div>
            </div>

            <div id="tab1" class="tab-content" style="">

              <div class="py-4">
                <h3 class="font-bold font-raleway text-2xl">Course Description</h3>
                <div class="" v-html="courses.description"></div>
              </div>
            </div>

          </div>
        </div>
        <div class="lg:col-span-4 col-span-12">


          <div class="sidebarWrapper space-y-[30px]">
            <div class="wdiget custom-text space-y-5 ">
              <!-- <a class="h-[220px]  rounded relative block" href="#">
                <img src="@/assets/images/placeholder/c1.png" alt="" class=" block w-full h-full object-cover rounded ">
                <div class=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <img src="@/assets/images/icons/play.svg" alt="">
                </div>
              </a> -->
              <h3 class="font-bold font-raleway text-2xl">Tsh {{ courses.price }}</h3>
              <div class="">
                <button class="btn bg-devanga-secondary text-white p-4 rounded-sm w-full text-center text-xl font-bold" @click="enrollCourse">
                Enroll Now
              </button>
              </div>
              <ul class="list">

                <li class=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                  <div class="flex-1 space-x-3 flex">
                    <img src="" alt="">
                    <div class=" text-black font-semibold">Instructor</div>
                  </div>
                  <div class="flex-none">
                    {{ courses.instructor.full_name }}
                  </div>
                </li>

                <li class=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                  <div class="flex-1 space-x-3 flex">
                    <img src="" alt="">
                    <div class=" text-black font-semibold">Modules</div>
                  </div>
                  <div class="flex-none">
                    {{ courses.modules.length }}
                  </div>
                </li>

                <!-- <li class=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                  <div class="flex-1 space-x-3 flex">
                    <img src="" alt="">
                    <div class=" text-black font-semibold">Duration</div>
                  </div>
                  <div class="flex-none">
                    2Hr 36Minutes
                  </div>
                </li> -->

                <li class=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                  <div class="flex-1 space-x-3 flex">
                    <img src="" alt="">
                    <div class=" text-black font-semibold">Enrolled</div>
                  </div>
                  <div class="flex-none">
                    {{ courses.enrollments.length }}
                  </div>
                </li>

                <li class=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                  <div class="flex-1 space-x-3 flex">
                    <img src="" alt="">
                    <div class=" text-black font-semibold">Course level</div>
                  </div>
                  <div class="flex-none">
                    Intermediate
                  </div>
                </li>

                <li class=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                  <div class="flex-1 space-x-3 flex">
                    <img src="" alt="">
                    <div class=" text-black font-semibold">Language</div>
                  </div>
                  <div class="flex-none">
                    English
                  </div>
                </li>
              </ul>
            </div>

        
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrum from '@/components/Breadcrum.vue';
import { ref,onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import apiService from '@/service/apiService';
import avatar from "@/assets/images/account.png"
const toast = useToast();

const route = useRoute()
const slug = route.params.slug
const courses = ref([])
const isLoading = ref(false)

const getCoursesDetail = () => {
  apiService.get(`course/courses/${slug}/`)
    .then(response => {
      courses.value = response.data
      toast.add({ severity: 'success', summary: 'Successful', detail: 'Course Deleted', life: 3000 });
    })
    .catch(error => {
      console.error('Error deleting course:', error);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting course', life: 3000 });
    });
};

const enrollCourse = async () => {
  isLoading.value = true;

  try {
    const response = await apiService.post(`/course/${slug}/enroll/`, {});
    console.log('Enrollment successful:', response.data);
    // Optionally update state or show a success message
  } catch (error) {
    console.error('Enrollment failed:', error);
    enrollmentError.value = 'Failed to enroll. Please try again later.';
    // Handle errors, e.g., show an error message
  } finally {
    isLoading.value = false;
  }
};


onBeforeMount(() => {
  getCoursesDetail();
});
</script>