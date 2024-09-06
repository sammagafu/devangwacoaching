<script setup>
  import Slider from '@/components/Slider.vue';
  import Footer from '@/components/Footer.vue';
  import apiService from '@/service/apiService'; // Import your API service

  // swipper
  import {
    Swiper,
    SwiperSlide
  } from 'swiper/vue';
  import {
    ref,
    onMounted
  } from 'vue';
  import {
    Autoplay,
    Pagination,
    Navigation,
    EffectFade
  } from "swiper/modules";
  import 'swiper/css';
  const modules = [Autoplay, Pagination, Navigation, EffectFade];
  const onSwiper = (swiper) => {
    console.log(swiper);
  };

  const onSlideChange = () => {
    console.log('slide change');
  };

  const events = ref([])
  const getEvents = () => {
    apiService.get('coaching/events/').then(response => {
      events.value = response.data
    }).catch(error => {
      console.log(error);
    })
  };

  const courses = ref([])
  const getCourses = () => {
    apiService.get('course/courses/').then(response => {
      courses.value = response.data
    }).catch(error => {
      console.log(error);
    })
  };


  onMounted(() => {
    getEvents();
    getCourses();
  });
</script>

<template>
  <Slider />

  <section class="relative font-raleway py-32">
    <div class="xl:max-w-[1350px] lg:max-w-[960px] md:max-w-2xl sm:max-w-xl xl mx-auto">
      <div class="grid grid-cols-1 py-8">
        <h3
          class="font-raleway font-bold lg:text-8xl md:text-5xl sm:text-4xl text-devanga-primary lg:leading-[120%] md:leading-tight py-6 lowercase">
          Our Transformative <br> Coaching Services</h3>
        <p class="lg:text-3xl md:text-2xl sm:text-xl text-devanga-primary">empowering relationships, strengthening
          marriages, and building lasting connections</p>
      </div>
      <!--end grid-->
      <div class="grid md:grid-cols-3 grid-cols-1 mt-8 gap-[24px] lowercase">
        <!-- Personal Relationship Coaching -->
        <div
          class="group relative overflow-hidden p-8 rounded-lg shadow dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 bg-devanga-ken dark:bg-slate-900 text-center duration-500">
          <img src="@/assets/images/icons/one.svg" class="h-32 w-32 mx-auto" alt="Personal Coaching Icon">

          <div class="content mt-7">
            <h2 class="title text-xl font-semibold">Personal Relationship Coaching</h2>
            <p class="text-slate-400 mt-3">Empower your personal connections with tailored guidance that fosters love,
              communication, and mutual respect in every relationship.</p>
          </div>

          <div class="opacity-0 group-hover:opacity-100 duration-500">
            <div class="absolute inset-0">
              <img src="@/assets/images/services/personal.jpg" alt="Personal Relationship Coaching">
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            </div>

            <div class="absolute bottom-0 start-0 end-0 mb-6">
              <a href="" class="text-white text-xl font-bold">Personal Relationship Coaching</a>
            </div>
          </div>
        </div>
        <!--end feature content-->

        <!-- Pre-Marital and Personalized Counseling -->
        <div
          class="group relative overflow-hidden p-6 rounded-lg shadow dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 bg-devanga-ken dark:bg-slate-900 text-center duration-500">
          <img src="@/assets/images/icons/executive-01.svg" class="h-32 w-32 mx-auto"
            alt="Pre-Marital Counseling Icon">

          <div class="content mt-7">
            <h2 class="title text-xl font-semibold">Pre-Marital & Personalized Counseling</h2>
            <p class="text-slate-400 mt-3">Prepare for a strong start or refine your relationship journey with
              customized sessions designed to meet your specific needs.</p>
          </div>

          <div class="opacity-0 group-hover:opacity-100 duration-500">
            <div class="absolute inset-0">
              <img src="@/assets/images/services/pre-marital.jpg" alt="Pre-Marital Counseling">
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            </div>

            <div class="absolute bottom-0 start-0 end-0 mb-6">
              <a href="" class="text-white text-xl font-bold">Pre-Marital & Personalized Counseling</a>
            </div>
          </div>
        </div>
        <!--end feature content-->

        <!-- Corporate Relationship Coaching -->
        <div
          class="group relative overflow-hidden p-6 rounded-lg shadow dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 bg-devanga-ken dark:bg-slate-900 text-center duration-500">
          <img src="@/assets/images/icons/group.svg" class="h-32 w-32 mx-auto" alt="Corporate Coaching Icon">

          <div class="content mt-7">
            <h2 class="title text-xl font-semibold">Corporate Relationship Coaching</h2>
            <p class="text-slate-400 mt-3">Boost communication and collaboration within your team, creating a productive
              and harmonious work environment through expert coaching.</p>
          </div>

          <div class="opacity-0 group-hover:opacity-100 duration-500">
            <div class="absolute inset-0">
              <img src="@/assets/images/services/corporate.jpg" alt="Corporate Coaching">
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            </div>

            <div class="absolute bottom-0 start-0 end-0 mb-6">
              <a href="" class="text-white text-xl font-bold">Corporate Relationship Coaching</a>
            </div>
          </div>
        </div>
        <!--end feature content-->
      </div>

    </div>
    <!--end container-->
  </section>

  <section id="content-section-1">
                <!-- Section Spacer -->
                <div class="pb-20 xl:pb-[150px]">
                    <!-- Section Container -->
                    <div class="container">
                        <div class="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:gap-28 xxl:gap-32">
                            <!-- Content Left Block -->
                            <div class="order-2 overflow-hidden rounded-md md:order-1">
                                <img src="@/assets/images/hero/about-service.jpg" alt="content-image-1" width="526" height="450" class="h-auto w-full">
                            </div>
                            <!-- Content Left Block -->
                            <!-- Content Right Block -->
                            <div class="order-1 md:order-2 jos" data-jos_animation="fade-right" >
                                <!-- Section Content Block -->
                                <div class="mb-6">
                                    <h2 class="text-devanga-primary font-raleway font-bold text-8xl">the witness</h2>
                                </div>
                                <!-- Section Content Block -->
                                <div class="leading-[1.4] font-raleway text-devanga-primary text-2xl">
                                    <p class="mb-7 last:mb-0">
                                      <span class="font-bold block text-3xl mb-4">I sat in a women's seminar, a simple question hanging in the air: </span>
                                      "Can you tell your leader they're wrong, especially about marriage?" The debate that followed was a revelation. So many marriages were suffering, yet so few knew how to heal them.
                                    </p>
                                    <p class="mb-7 last:mb-0">
                                      It was a turning point. I looked at my own marriage – a source of strength, joy, and unwavering support – and realized it was a gift I needed to share. <br><br>Devangwa Coaching was born from that realization, a promise to guide others towards the love they deserve.
                                    </p>
                                </div>
                            </div>
                            <!-- Content Right Block -->
                        </div>
                    </div>
                    <!-- Section Container -->
                </div>
                <!-- Section Spacer -->
            </section>

  <section class="py-40" id="projects">
    <div class="xl:max-w-[1350px] lg:max-w-[960px] md:max-w-2xl sm:max-w-xl xl mx-auto">
      <div class="py-8">
        <h2
          class="font-raleway font-bold lg:text-8xl md:text-5xl sm:text-4xl text-devanga-primary lg:leading-[120%] md:leading-tight lowercase text-center"
          data-aos="fade-up" data-aos-duration="1200">
          Interactive Learning for Real-Life Transformation
        </h2>
      </div>
      <!-- heading -->

      <div class="md:columns-2 col-span-1 xxl:gap-[58px] lg:gap-12 md:gap-[30px] lowercase">
        <!-- card 1 -->
        <div class="project__item overflow-hidden group xl:mb-[60px] lg:mb-[50px] mb-[30px] aos-init" data-aos="fade-up"
          data-aos-duration="1000" v-for="courses in courses" :key="courses.id">
          <template v-if="courses.cover === 'http://localhost:8000/media/cover-img.jpg'">
            <router-link class="overflow-hidden lg:mb-[30px] mb-[20px] block w-full cursor-pointer">
              <img src="@/assets/images/placeholder/placeholder.jpg" alt="img"
                class="w-full overflow-hidden duration-500 rounded-[10px] group-hover:scale-105">
            </router-link>
          </template>

          <template v-else>
            <a href="@/assets/images/placeholder/placeholder.jpg"
              class="imgc overflow-hidden lg:mb-[30px] mb-[20px] block w-full cursor-pointer">
              <img :src="courses.cover" alt="img"
                class="w-full overflow-hidden duration-500 rounded-[10px] group-hover:scale-105">
            </a>
          </template>

          <div class="content flex items-center justify-between gap-1">
            <a href="./protfolio.html" class="left__cont">
              <span class="text-devanga-yellow xl:mb-4 mb-2 block uppercase xl:text-lg text-base">
                PRODUCT DESIGN
              </span>
              <h3 class="xl:text-[30px] sm:text-2xl text-xl font-semibold text-devanga-primary">
                {{ courses.title }}
              </h3>
            </a>

            <a href="@/assets/images/placeholder/placeholder.jpg"
              class="imgc h-[45px] w-[45px] sm:w-[60px] sm:h-[60px] rounded-md bg-devanga-ken flex justify-center items-center duration-500 group-hover:bg-devanga-yellow cursor-pointer">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z"
                  fill="currentColor" fill-opacity="0.9"></path>
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z"
                  fill="currentColor" fill-opacity="0.9"></path>
              </svg>
            </a>
          </div>
        </div>
        <!-- card 1 -->

      </div>

      <!-- -------- Cricle box -->
      <div class="mt-[100px] flex justify-center lowercase">
        <router-link :to="{name: 'coaching'}" class="md:w-52 md:h-52 w-32 h-32 bg-devanga-yellow rounded-full flex justify-center items-center text-center relative before:w-full before:h-full before:rounded-full before:border before:border-devanga-yellow before:content-[''] before:absolute before:top-[10px] before:-left-[7px] before:duration-500 hover:before:-top-[10px] aos-init"
        data-aos="zoom-out-down" data-aos-duration="2000">
        <span class="relative z-10">
            <i
              class="bi-arrow-right mb-[1px] md:text-[28px] text-base text-center flex justify-center text-clr_title transition-all">
            </i>
            <span class="text-[#282828] md:text-lg text-sm font-medium leading-[30px] transition-all">
              Click More Work
            </span>
          </span>
        </router-link>
      </div>
      <!-- -------- Cricle box -->
    </div>

<!-- Pricing Table -->
<div class="xl:max-w-[1350px] lg:max-w-[960px] md:max-w-2xl sm:max-w-xl xl mx-auto px-3">
  <div class="container mx-auto pt-32">
    <div class="grid grid-cols-3 md:grid-cols-3 gap-0 lowercase">
      <!-- One on One Coaching Plan -->
      <div class="w-full max-w-sm p-8 bg-devanga-primary border border-gray-200 rounded-lg shadow sm:p-8 text-white">
        <h5 class="mb-4 text-xl font-medium text-devanga-ken">One on One Coaching</h5>
        <div class="flex items-baseline text-devanga-ken">
          <span class="text-3xl font-semibold">$</span>
          <span class="text-5xl font-extrabold tracking-tight">99</span>
          <span class="ms-1 text-xl font-normal text-devanga-ken">/month</span>
        </div>
        <ul role="list" class="space-y-5 my-7">
          <li class="flex items-center">
            <svg class="flex-shrink-0 w-4 h-4 text-devanga-ken" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-devanga-ken ms-3">Personalized coaching sessions</span>
          </li>
          <li class="flex items-center">
            <svg class="flex-shrink-0 w-4 h-4 text-devanga-ken" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-devanga-ken ms-3">Access to exclusive resources</span>
          </li>
          <li class="flex items-center">
            <svg class="flex-shrink-0 w-4 h-4 text-devanga-ken" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-devanga-ken ms-3">Monthly progress tracking</span>
          </li>
          <li class="flex items-center">
            <svg class="flex-shrink-0 w-4 h-4 text-devanga-ken" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-devanga-ken ms-3">Direct email support</span>
          </li>
        </ul>
        <button type="button" class="text-devanga-ken bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
      </div>

      <!-- Group Coaching Plan -->
      <div class="w-full max-w-sm p-4 bg-devanga-secondary border border-gray-200 rounded-lg shadow sm:p-8">
        <h5 class="mb-4 text-xl font-medium text-devanga-ken">Group Coaching</h5>
        <div class="flex items-baseline text-devanga-ken">
          <span class="text-3xl font-semibold">$</span>
          <span class="text-5xl font-extrabold tracking-tight">79</span>
          <span class="ms-1 text-xl font-normal text-devanga-ken">/month</span>
        </div>
        <ul role="list" class="space-y-5 my-7">
          <li class="flex items-center">
            <svg class="flex-shrink-0 w-4 h-4 text-devanga-ken" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-devanga-ken ms-3">Weekly group coaching sessions</span>
          </li>
          <li class="flex items-center">
            <svg class="flex-shrink-0 w-4 h-4 text-devanga-ken" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-devanga-ken ms-3">Access to group resources and community</span>
          </li>
          <li class="flex items-center">
            <svg class="flex-shrink-0 w-4 h-4 text-devanga-ken" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-devanga-ken ms-3">Interactive Q&A sessions</span>
          </li>
          <li class="flex items-center">
            <svg class="flex-shrink-0 w-4 h-4 text-devanga-ken" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-devanga-ken ms-3">Supportive peer environment</span>
          </li>
        </ul>
        <button type="button" class="text-devanga-ken bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
      </div>

      <!-- Corporate Relationship Coaching Plan -->
      <div class="w-full max-w-sm p-4 bg-devanga-primary border border-gray-200 rounded-lg shadow sm:p-8">
        <h5 class="mb-4 text-xl font-medium text-devanga-ken">Corporate Coaching</h5>
        <div class="flex items-baseline text-devanga-ken">
          <span class="text-3xl font-semibold">$</span>
          <span class="text-5xl font-extrabold tracking-tight">149</span>
          <span class="ms-1 text-xl font-normal text-devanga-ken">/month</span>
        </div>
        <ul role="list" class="space-y-5 my-7">
          <li class="flex items-center">
            <svg class="flex-shrink-0 w-4 h-4 text-devanga-ken" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-devanga-ken ms-3">Customized corporate training sessions</span>
          </li>
          <li class="flex items-center">
            <svg class="flex-shrink-0 w-4 h-4 text-devanga-ken" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-devanga-ken ms-3">Team-building workshops</span>
          </li>
          <li class="flex items-center">
            <svg class="flex-shrink-0 w-4 h-4 text-devanga-ken" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-devanga-ken ms-3">Conflict resolution strategies</span>
          </li>
          <li class="flex items-center">
            <svg class="flex-shrink-0 w-4 h-4 text-devanga-ken" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="text-base font-normal leading-tight text-devanga-ken ms-3">On-demand consulting support</span>
          </li>
        </ul>
        <button type="button" class="text-devanga-ken bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Choose plan</button>
      </div>
    </div>
  </div>
</div>
<!-- End of Pricing Table -->

  </section>


<!-- Testimonials Section -->
<section class="bg-devanga-ken text-devanga-primary py-[120px]" data-aos="fade-up">
  <div class="container mx-auto px-8 xl:pr-0 xl:pl-[4%] 2xl:pl-[6%] 3xl:pl-[17%]">
    <div class="flex flex-col xl:flex-row gap-x-[55px] 2xl:gap-x-[100px] 3xl:gap-x-[165px]">
      <div class="font-bold font-raleway leading-none flex flex-wrap flex-col gap-y-2 md:text-center xl:text-left mb-10">
        <span class="text-orange text-xl">Testimonial</span>
        <h3 class="inline-block text-black-800 text-4xl lg:text-5xl xl:text-[64px] tracking-[-1.5px]">
          <span class="relative z-[1] before:rounded-full before:bg-primary before:block before:absolute before:top-[4px] before:left-[-2px] before:-z-[1] before:w-[36px] lg:before:w-[48px] xl:before:w-[64px] before:h-[36px] lg:before:h-[48px] xl:before:h-[64px]">
            Client
          </span>
          <br class="hidden xl:inline-block"> feedback
        </h3>
      </div>
      <swiper :slides-per-view="3" :space-between="20" @swiper="onSwiper" @slideChange="onSlideChange" :modules="modules" :autoplay="true">
        <swiper-slide>
          <div class="swiper-slide swiper-slide-prev" role="group" aria-label="1 / 4">
            <span class="inline-block mb-5 sm:mb-8">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.75 13.5L21.75 30C21.7475 32.3862 20.7985 34.6739 19.1112 36.3612C17.4239 38.0485 15.1362 38.9975 12.75 39C12.3522 39 11.9706 38.842 11.6893 38.5607C11.408 38.2794 11.25 37.8978 11.25 37.5C11.25 37.1022 11.408 36.7206 11.6893 36.4393C11.9706 36.158 12.3522 36 12.75 36C14.3413 36 15.8674 35.3679 16.9926 34.2426C18.1179 33.1174 18.75 31.5913 18.75 30V28.5H7.5C6.70435 28.5 5.94129 28.1839 5.37868 27.6213C4.81607 27.0587 4.5 26.2956 4.5 25.5L4.5 13.5C4.5 12.7044 4.81607 11.9413 5.37868 11.3787C5.94129 10.8161 6.70435 10.5 7.5 10.5L18.75 10.5C19.5456 10.5 20.3087 10.8161 20.8713 11.3787C21.4339 11.9413 21.75 12.7044 21.75 13.5ZM40.5 10.5H29.25C28.4544 10.5 27.6913 10.8161 27.1287 11.3787C26.5661 11.9413 26.25 12.7044 26.25 13.5L26.25 25.5C26.25 26.2956 26.5661 27.0587 27.1287 27.6213C27.6913 28.1839 28.4544 28.5 29.25 28.5H40.5V30C40.5 31.5913 39.8679 33.1174 38.7426 34.2426C37.6174 35.3679 36.0913 36 34.5 36C34.1022 36 33.7206 36.158 33.4393 36.4393C33.158 36.7206 33 37.1022 33 37.5C33 37.8978 33.158 38.2794 33.4393 38.5607C33.7206 38.842 34.1022 39 34.5 39C36.8862 38.9975 39.1739 38.0485 40.8612 36.3612C42.5485 34.6739 43.4975 32.3862 43.5 30V13.5C43.5 12.7044 43.1839 11.9413 42.6213 11.3787C42.0587 10.8161 41.2957 10.5 40.5 10.5Z"
                  fill="#080808" fill-opacity="0.9"></path>
              </svg>
            </span>
            <p class="text-black-text-800 text-[16px] sm:text-lg xl:text-xl font-bold font-raleway leading-7 mb-4">
              “The personalized relationship coaching sessions were a game-changer for me. They taught me how to better communicate and understand my partner, turning our disagreements into constructive conversations. I highly recommend these services to anyone looking to strengthen their personal connections.”
            </p>
            <h4 class="flex flex-wrap items-center gap-4 text-black-800 text-[16px] sm:text-lg font-extrabold font-raleway leading-7">
              <span><svg width="48" height="2" viewBox="0 0 48 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1H48" stroke="#080808" stroke-opacity="0.4"></path>
                </svg>
              </span> Sarah Mayunga
            </h4>
          </div>
        </swiper-slide>

        <swiper-slide>
          <div class="swiper-slide swiper-slide-prev" role="group" aria-label="1 / 4">
            <span class="inline-block mb-5 sm:mb-8">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.75 13.5L21.75 30C21.7475 32.3862 20.7985 34.6739 19.1112 36.3612C17.4239 38.0485 15.1362 38.9975 12.75 39C12.3522 39 11.9706 38.842 11.6893 38.5607C11.408 38.2794 11.25 37.8978 11.25 37.5C11.25 37.1022 11.408 36.7206 11.6893 36.4393C11.9706 36.158 12.3522 36 12.75 36C14.3413 36 15.8674 35.3679 16.9926 34.2426C18.1179 33.1174 18.75 31.5913 18.75 30V28.5H7.5C6.70435 28.5 5.94129 28.1839 5.37868 27.6213C4.81607 27.0587 4.5 26.2956 4.5 25.5L4.5 13.5C4.5 12.7044 4.81607 11.9413 5.37868 11.3787C5.94129 10.8161 6.70435 10.5 7.5 10.5L18.75 10.5C19.5456 10.5 20.3087 10.8161 20.8713 11.3787C21.4339 11.9413 21.75 12.7044 21.75 13.5ZM40.5 10.5H29.25C28.4544 10.5 27.6913 10.8161 27.1287 11.3787C26.5661 11.9413 26.25 12.7044 26.25 13.5L26.25 25.5C26.25 26.2956 26.5661 27.0587 27.1287 27.6213C27.6913 28.1839 28.4544 28.5 29.25 28.5H40.5V30C40.5 31.5913 39.8679 33.1174 38.7426 34.2426C37.6174 35.3679 36.0913 36 34.5 36C34.1022 36 33.7206 36.158 33.4393 36.4393C33.158 36.7206 33 37.1022 33 37.5C33 37.8978 33.158 38.2794 33.4393 38.5607C33.7206 38.842 34.1022 39 34.5 39C36.8862 38.9975 39.1739 38.0485 40.8612 36.3612C42.5485 34.6739 43.4975 32.3862 43.5 30V13.5C43.5 12.7044 43.1839 11.9413 42.6213 11.3787C42.0587 10.8161 41.2957 10.5 40.5 10.5Z"
                  fill="#080808" fill-opacity="0.9"></path>
              </svg>
            </span>
            <p class="text-black-text-800 text-[16px] sm:text-lg xl:text-xl font-bold font-raleway leading-7 mb-4">
              “Our pre-marital counseling sessions were incredibly insightful. The personalized approach helped us navigate tough conversations and build a solid foundation for our future together. We feel more connected and prepared for the next chapter of our lives.”
            </p>
            <h4 class="flex flex-wrap items-center gap-4 text-black-800 text-[16px] sm:text-lg font-extrabold font-raleway leading-7">
              <span><svg width="48" height="2" viewBox="0 0 48 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1H48" stroke="#080808" stroke-opacity="0.4"></path>
                </svg>
              </span> Samuel and Neema
            </h4>
          </div>
        </swiper-slide>

        <swiper-slide>
          <div class="swiper-slide swiper-slide-prev" role="group" aria-label="1 / 4">
            <span class="inline-block mb-5 sm:mb-8">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.75 13.5L21.75 30C21.7475 32.3862 20.7985 34.6739 19.1112 36.3612C17.4239 38.0485 15.1362 38.9975 12.75 39C12.3522 39 11.9706 38.842 11.6893 38.5607C11.408 38.2794 11.25 37.8978 11.25 37.5C11.25 37.1022 11.408 36.7206 11.6893 36.4393C11.9706 36.158 12.3522 36 12.75 36C14.3413 36 15.8674 35.3679 16.9926 34.2426C18.1179 33.1174 18.75 31.5913 18.75 30V28.5H7.5C6.70435 28.5 5.94129 28.1839 5.37868 27.6213C4.81607 27.0587 4.5 26.2956 4.5 25.5L4.5 13.5C4.5 12.7044 4.81607 11.9413 5.37868 11.3787C5.94129 10.8161 6.70435 10.5 7.5 10.5L18.75 10.5C19.5456 10.5 20.3087 10.8161 20.8713 11.3787C21.4339 11.9413 21.75 12.7044 21.75 13.5ZM40.5 10.5H29.25C28.4544 10.5 27.6913 10.8161 27.1287 11.3787C26.5661 11.9413 26.25 12.7044 26.25 13.5L26.25 25.5C26.25 26.2956 26.5661 27.0587 27.1287 27.6213C27.6913 28.1839 28.4544 28.5 29.25 28.5H40.5V30C40.5 31.5913 39.8679 33.1174 38.7426 34.2426C37.6174 35.3679 36.0913 36 34.5 36C34.1022 36 33.7206 36.158 33.4393 36.4393C33.158 36.7206 33 37.1022 33 37.5C33 37.8978 33.158 38.2794 33.4393 38.5607C33.7206 38.842 34.1022 39 34.5 39C36.8862 38.9975 39.1739 38.0485 40.8612 36.3612C42.5485 34.6739 43.4975 32.3862 43.5 30V13.5C43.5 12.7044 43.1839 11.9413 42.6213 11.3787C42.0587 10.8161 41.2957 10.5 40.5 10.5Z"
                  fill="#080808" fill-opacity="0.9"></path>
              </svg>
            </span>
            <p class="text-black-text-800 text-[16px] sm:text-lg xl:text-xl font-bold font-raleway leading-7 mb-4">
              “The corporate coaching sessions significantly improved our team dynamics. We noticed a boost in collaboration and communication among our staff, leading to a more positive and productive work environment. This service is a must for any organization looking to enhance team performance.”
            </p>
            <h4 class="flex flex-wrap items-center gap-4 text-black-800 text-[16px] sm:text-lg font-extrabold font-raleway leading-7">
              <span><svg width="48" height="2" viewBox="0 0 48 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1H48" stroke="#080808" stroke-opacity="0.4"></path>
                </svg>
              </span> Abraham Marealle, <br> HR Manager at Neotelabs
            </h4>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</section>
<!-- Ends Testimonials Section -->
  <!-- blog & Updates -->
  <section class="bg-devanga-ken py-[120px]">
    <div class="container mx-auto">

      <div class="grid grid-cols-12 text-devanga-primary lowercase">
        <div class="col-span-12 aos-init aos-animate" data-aos="fade-up">
          <div class="font-bold font-raleway text-center leading-none flex flex-wrap flex-col gap-y-2 mb-10">
            <h3 class="text-black-800 text-4xl lg:text-5xl xl:text-[64px] tracking-[-1.5px]">
              Stay Updated 
            </h3>
          </div>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-devanga-primary">

        <!-- Blog Item Start -->
        <div data-aos="fade-up" class="aos-init aos-animate">
          <div class="rounded-[20px] overflow-hidden mb-6">
            <img class="w-full" src="@/assets/images/blog/blog1.png" alt="blog image">
          </div>
          <div class="flex flex-wrap flex-col gap-3">
            <ul class="flex flex-wrap text-sm font-normal font-Inter leading-tight">
              <li
                class="relative z-[1] before:rounded-full before:bg-black-800 before:block before:absolute before:top-[50%] before:translate-y-[-50%] before:left-[15px] before:-z-[1] before:w-[8px] before:h-[8px] pl-[30px]">
                <a class="text-black-text-800" href="#">UI Design</a>
              </li>
              <li
                class="relative z-[1] before:rounded-full before:bg-orange before:block before:absolute before:top-[50%] before:translate-y-[-50%] before:left-[15px] before:-z-[1] before:w-[8px] before:h-[8px] pl-[30px]">
                <a class="text-orange" href="#">03 May 2019</a>
              </li>

            </ul>
            <div class="flex justify-between items-end text-black-800 hover:text-orange group">
              <h4 class="font-bold font-raleway transition-all leading-8 text-[18px] md:text-[20px] 2xl:text-[22px]">
                <a href="blog-details.html">Right-lo-left
                  behind development in mobile web design</a>
              </h4>
              <a href="blog-details.html" class="group-hover:animate-arrow-move-up">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z"
                    fill="currentColor" fill-opacity="0.9"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z"
                    fill="currentColor" fill-opacity="0.9"></path>
                </svg>

              </a>
            </div>
          </div>
        </div>
        <!-- Blog Item End -->

        <!-- Blog Item Start -->
        <div class="sm:mt-10 aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
          <div class="rounded-[20px] overflow-hidden mb-6">
            <img class="w-full" src="@/assets/images/blog/blog2.png" alt="blog image">
          </div>
          <div class="flex flex-wrap flex-col gap-3">
            <ul class="flex flex-wrap text-sm font-normal font-Inter leading-tight">
              <li
                class="relative z-[1] before:rounded-full before:bg-black-800 before:block before:absolute before:top-[50%] before:translate-y-[-50%] before:left-[15px] before:-z-[1] before:w-[8px] before:h-[8px] pl-[30px]">
                <a class="text-black-text-800" href="#">UI Design</a>
              </li>
              <li
                class="relative z-[1] before:rounded-full before:bg-orange before:block before:absolute before:top-[50%] before:translate-y-[-50%] before:left-[15px] before:-z-[1] before:w-[8px] before:h-[8px] pl-[30px]">
                <a class="text-orange" href="#">03 May 2019</a>
              </li>

            </ul>
            <div class="flex justify-between items-end text-black-800 hover:text-orange group">
              <h4 class="font-bold font-raleway transition-all leading-8 text-[18px] md:text-[20px] 2xl:text-[22px]">
                <a href="blog-details.html">Connect
                  craft: Reading
                  the smart experience</a>
              </h4>
              <a href="blog-details.html" class="group-hover:animate-arrow-move-up">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z"
                    fill="currentColor" fill-opacity="0.9"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z"
                    fill="currentColor" fill-opacity="0.9"></path>
                </svg>

              </a>
            </div>
          </div>
        </div>
        <!-- Blog Item End -->

        <!-- Blog Item Start -->
        <div data-aos="fade-up" data-aos-delay="500" class="aos-init aos-animate">
          <div class="rounded-[20px] overflow-hidden mb-6">
            <img class="w-full" src="@/assets/images/blog/blog3.png" alt="blog image">
          </div>
          <div class="flex flex-wrap flex-col gap-3">
            <ul class="flex flex-wrap text-sm font-normal font-Inter leading-tight">
              <li
                class="relative z-[1] before:rounded-full before:bg-black-800 before:block before:absolute before:top-[50%] before:translate-y-[-50%] before:left-[15px] before:-z-[1] before:w-[8px] before:h-[8px] pl-[30px]">
                <a class="text-black-text-800" href="#">UI Design</a>
              </li>
              <li
                class="relative z-[1] before:rounded-full before:bg-orange before:block before:absolute before:top-[50%] before:translate-y-[-50%] before:left-[15px] before:-z-[1] before:w-[8px] before:h-[8px] pl-[30px]">
                <a class="text-orange" href="#">03 May 2019</a>
              </li>

            </ul>
            <div class="flex justify-between items-end text-black-800 hover:text-orange group">
              <h4 class="font-bold font-raleway transition-all leading-8 text-[18px] md:text-[20px] 2xl:text-[22px]">
                <a href="blog-details.html">Ecoglow: Sustainable
                  skincare a brighter tomorrow</a>
              </h4>
              <a href="blog-details.html" class="group-hover:animate-arrow-move-up">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z"
                    fill="currentColor" fill-opacity="0.9"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z"
                    fill="currentColor" fill-opacity="0.9"></path>
                </svg>

              </a>
            </div>
          </div>
        </div>
        <!-- Blog Item End -->

        <!-- Blog Item Start -->
        <div class="sm:mt-10 aos-init aos-animate" data-aos="fade-up" data-aos-delay="700">
          <div class="rounded-[20px] overflow-hidden mb-6">
            <img class="w-full" src="@/assets/images/blog/blog4.png" alt="blog image">
          </div>
          <div class="flex flex-wrap flex-col gap-3">
            <ul class="flex flex-wrap text-sm font-normal font-Inter leading-tight">
              <li
                class="relative z-[1] before:rounded-full before:bg-black-800 before:block before:absolute before:top-[50%] before:translate-y-[-50%] before:left-[15px] before:-z-[1] before:w-[8px] before:h-[8px] pl-[30px]">
                <a class="text-black-text-800" href="#">UI Design</a>
              </li>
              <li
                class="relative z-[1] before:rounded-full before:bg-orange before:block before:absolute before:top-[50%] before:translate-y-[-50%] before:left-[15px] before:-z-[1] before:w-[8px] before:h-[8px] pl-[30px]">
                <a class="text-orange" href="#">03 May 2019</a>
              </li>

            </ul>
            <div class="flex justify-between items-end text-black-800 hover:text-orange group">
              <h4 class="font-bold font-raleway transition-all leading-8 text-[18px] md:text-[20px] 2xl:text-[22px]">
                <a href="blog-details.html">Right-lo-left behind
                  development in mobile web design</a>
              </h4>
              <a href="blog-details.html" class="group-hover:animate-arrow-move-up">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z"
                    fill="currentColor" fill-opacity="0.9"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z"
                    fill="currentColor" fill-opacity="0.9"></path>
                </svg>

              </a>
            </div>
          </div>
        </div>
        <!-- Blog Item End -->

      </div>

    </div>
  </section>

</template>