<script setup>
import Slider from '@/components/Slider.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
    <Slider/>
    <section class="bg-white py-[120px]" data-aos="fade-up">
            <div class="container mx-auto px-8 xl:pr-0 xl:pl-[4%] 2xl:pl-[6%] 3xl:pl-[17%]">
                <div class="flex flex-col xl:flex-row gap-x-[55px] 2xl:gap-x-[100px] 3xl:gap-x-[165px]">

                    <div class="font-bold font-Syne leading-none flex flex-wrap flex-col gap-y-2 md:text-center xl:text-left mb-10">
                        <span class="text-orange text-xl">Testimonial</span>
                        <h3 class="inline-block text-black-800 text-4xl lg:text-5xl xl:text-[64px] tracking-[-1.5px]">
                            <span class="relative z-[1] before:rounded-full before:bg-primary before:block before:absolute before:top-[4px] before:left-[-2px] before:-z-[1] before:w-[36px] lg:before:w-[48px] xl:before:w-[64px] before:h-[36px] lg:before:h-[48px] xl:before:h-[64px]">Cl</span>ient
                            <br class="hidden xl:inline-block"> feedback
                        </h3>
                    </div>
<!-- 

                    <div class="swiper w-full swiper-initialized swiper-horizontal swiper-backface-hidden">
                        <div class="swiper-wrapper" id="swiper-wrapper-a8bfd955e6609843" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(-381.333px, 0px, 0px); transition-delay: 0ms;">
                            <div class="swiper-slide swiper-slide-prev" style="width: 336.333px; margin-right: 45px;" role="group" aria-label="1 / 4">
                                <span class="inline-block mb-5 sm:mb-8">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.75 13.5L21.75 30C21.7475 32.3862 20.7985 34.6739 19.1112 36.3612C17.4239 38.0485 15.1362 38.9975 12.75 39C12.3522 39 11.9706 38.842 11.6893 38.5607C11.408 38.2794 11.25 37.8978 11.25 37.5C11.25 37.1022 11.408 36.7206 11.6893 36.4393C11.9706 36.158 12.3522 36 12.75 36C14.3413 36 15.8674 35.3679 16.9926 34.2426C18.1179 33.1174 18.75 31.5913 18.75 30V28.5H7.5C6.70435 28.5 5.94129 28.1839 5.37868 27.6213C4.81607 27.0587 4.5 26.2956 4.5 25.5L4.5 13.5C4.5 12.7044 4.81607 11.9413 5.37868 11.3787C5.94129 10.8161 6.70435 10.5 7.5 10.5L18.75 10.5C19.5456 10.5 20.3087 10.8161 20.8713 11.3787C21.4339 11.9413 21.75 12.7044 21.75 13.5ZM40.5 10.5H29.25C28.4544 10.5 27.6913 10.8161 27.1287 11.3787C26.5661 11.9413 26.25 12.7044 26.25 13.5L26.25 25.5C26.25 26.2956 26.5661 27.0587 27.1287 27.6213C27.6913 28.1839 28.4544 28.5 29.25 28.5H40.5V30C40.5 31.5913 39.8679 33.1174 38.7426 34.2426C37.6174 35.3679 36.0913 36 34.5 36C34.1022 36 33.7206 36.158 33.4393 36.4393C33.158 36.7206 33 37.1022 33 37.5C33 37.8978 33.158 38.2794 33.4393 38.5607C33.7206 38.842 34.1022 39 34.5 39C36.8862 38.9975 39.1739 38.0485 40.8612 36.3612C42.5485 34.6739 43.4975 32.3862 43.5 30V13.5C43.5 12.7044 43.1839 11.9413 42.6213 11.3787C42.0587 10.8161 41.2957 10.5 40.5 10.5Z" fill="#080808" fill-opacity="0.9"></path>
                                    </svg>
                                </span>
                                <p class="text-black-text-800 text-[16px] sm:text-lg xl:text-xl font-bold font-Syne leading-7 mb-4">
                                    “Energistically
                                    build
                                    alternative scenarios
                                    via cross-unit applications. Credibly exploit
                                    one-to-one strategic theme areas and clicks-and-mortar services”</p>
                                <h4 class="flex flex-wrap items-center gap-4 text-black-800 text-[16px] sm:text-lg font-extrabold font-Syne leading-7">
                                    <span><svg width="48" height="2" viewBox="0 0 48 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 1H48" stroke="#080808" stroke-opacity="0.4"></path>
                                        </svg>
                                    </span> Jhon Smith
                                </h4>
                            </div>
                            <div class="swiper-slide swiper-slide-active" style="width: 336.333px; margin-right: 45px;" role="group" aria-label="2 / 4">
                                <span class="inline-block mb-5 sm:mb-8">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.75 13.5L21.75 30C21.7475 32.3862 20.7985 34.6739 19.1112 36.3612C17.4239 38.0485 15.1362 38.9975 12.75 39C12.3522 39 11.9706 38.842 11.6893 38.5607C11.408 38.2794 11.25 37.8978 11.25 37.5C11.25 37.1022 11.408 36.7206 11.6893 36.4393C11.9706 36.158 12.3522 36 12.75 36C14.3413 36 15.8674 35.3679 16.9926 34.2426C18.1179 33.1174 18.75 31.5913 18.75 30V28.5H7.5C6.70435 28.5 5.94129 28.1839 5.37868 27.6213C4.81607 27.0587 4.5 26.2956 4.5 25.5L4.5 13.5C4.5 12.7044 4.81607 11.9413 5.37868 11.3787C5.94129 10.8161 6.70435 10.5 7.5 10.5L18.75 10.5C19.5456 10.5 20.3087 10.8161 20.8713 11.3787C21.4339 11.9413 21.75 12.7044 21.75 13.5ZM40.5 10.5H29.25C28.4544 10.5 27.6913 10.8161 27.1287 11.3787C26.5661 11.9413 26.25 12.7044 26.25 13.5L26.25 25.5C26.25 26.2956 26.5661 27.0587 27.1287 27.6213C27.6913 28.1839 28.4544 28.5 29.25 28.5H40.5V30C40.5 31.5913 39.8679 33.1174 38.7426 34.2426C37.6174 35.3679 36.0913 36 34.5 36C34.1022 36 33.7206 36.158 33.4393 36.4393C33.158 36.7206 33 37.1022 33 37.5C33 37.8978 33.158 38.2794 33.4393 38.5607C33.7206 38.842 34.1022 39 34.5 39C36.8862 38.9975 39.1739 38.0485 40.8612 36.3612C42.5485 34.6739 43.4975 32.3862 43.5 30V13.5C43.5 12.7044 43.1839 11.9413 42.6213 11.3787C42.0587 10.8161 41.2957 10.5 40.5 10.5Z" fill="#080808" fill-opacity="0.9"></path>
                                    </svg>
                                </span>
                                <p class="text-black-text-800 text-[16px] sm:text-lg xl:text-xl font-bold font-Syne leading-7 mb-4">
                                    “Energistically
                                    build
                                    “Unleash energistically build alternative scenarios via cross-unit build
                                    efficient
                                    initiatives for distinctive vortals. Synergistically strategize via adaptiv“
                                </p>
                                <h4 class="flex flex-wrap items-center gap-4 text-black-800 text-[16px] sm:text-lg font-extrabold font-Syne leading-7">
                                    <span><svg width="48" height="2" viewBox="0 0 48 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 1H48" stroke="#080808" stroke-opacity="0.4"></path>
                                        </svg>
                                    </span> Jhon Smith
                                </h4>
                            </div>
                            <div class="swiper-slide swiper-slide-next" style="width: 336.333px; margin-right: 45px;" role="group" aria-label="3 / 4">
                                <span class="inline-block mb-5 sm:mb-8">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.75 13.5L21.75 30C21.7475 32.3862 20.7985 34.6739 19.1112 36.3612C17.4239 38.0485 15.1362 38.9975 12.75 39C12.3522 39 11.9706 38.842 11.6893 38.5607C11.408 38.2794 11.25 37.8978 11.25 37.5C11.25 37.1022 11.408 36.7206 11.6893 36.4393C11.9706 36.158 12.3522 36 12.75 36C14.3413 36 15.8674 35.3679 16.9926 34.2426C18.1179 33.1174 18.75 31.5913 18.75 30V28.5H7.5C6.70435 28.5 5.94129 28.1839 5.37868 27.6213C4.81607 27.0587 4.5 26.2956 4.5 25.5L4.5 13.5C4.5 12.7044 4.81607 11.9413 5.37868 11.3787C5.94129 10.8161 6.70435 10.5 7.5 10.5L18.75 10.5C19.5456 10.5 20.3087 10.8161 20.8713 11.3787C21.4339 11.9413 21.75 12.7044 21.75 13.5ZM40.5 10.5H29.25C28.4544 10.5 27.6913 10.8161 27.1287 11.3787C26.5661 11.9413 26.25 12.7044 26.25 13.5L26.25 25.5C26.25 26.2956 26.5661 27.0587 27.1287 27.6213C27.6913 28.1839 28.4544 28.5 29.25 28.5H40.5V30C40.5 31.5913 39.8679 33.1174 38.7426 34.2426C37.6174 35.3679 36.0913 36 34.5 36C34.1022 36 33.7206 36.158 33.4393 36.4393C33.158 36.7206 33 37.1022 33 37.5C33 37.8978 33.158 38.2794 33.4393 38.5607C33.7206 38.842 34.1022 39 34.5 39C36.8862 38.9975 39.1739 38.0485 40.8612 36.3612C42.5485 34.6739 43.4975 32.3862 43.5 30V13.5C43.5 12.7044 43.1839 11.9413 42.6213 11.3787C42.0587 10.8161 41.2957 10.5 40.5 10.5Z" fill="#080808" fill-opacity="0.9"></path>
                                    </svg>
                                </span>
                                <p class="text-black-text-800 text-[16px] sm:text-lg xl:text-xl font-bold font-Syne leading-7 mb-4">
                                    “Energistically
                                    build
                                    “Aliquam vehicula nunc facilisis tincidunt feugiat. Pellentesque sed viverra
                                    nisi. Fusce
                                    et
                                    laoreet augue. Quisque pretium, ligula lectus semper urna. Aliquam vehicula.”

                                </p>
                                <h4 class="flex flex-wrap items-center gap-4 text-black-800 text-[16px] sm:text-lg font-extrabold font-Syne leading-7">
                                    <span><svg width="48" height="2" viewBox="0 0 48 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 1H48" stroke="#080808" stroke-opacity="0.4"></path>
                                        </svg>
                                    </span> Jhon Smith
                                </h4>
                            </div>
                            <div class="swiper-slide" style="width: 336.333px; margin-right: 45px;" role="group" aria-label="4 / 4">
                                <span class="inline-block mb-5 sm:mb-8">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.75 13.5L21.75 30C21.7475 32.3862 20.7985 34.6739 19.1112 36.3612C17.4239 38.0485 15.1362 38.9975 12.75 39C12.3522 39 11.9706 38.842 11.6893 38.5607C11.408 38.2794 11.25 37.8978 11.25 37.5C11.25 37.1022 11.408 36.7206 11.6893 36.4393C11.9706 36.158 12.3522 36 12.75 36C14.3413 36 15.8674 35.3679 16.9926 34.2426C18.1179 33.1174 18.75 31.5913 18.75 30V28.5H7.5C6.70435 28.5 5.94129 28.1839 5.37868 27.6213C4.81607 27.0587 4.5 26.2956 4.5 25.5L4.5 13.5C4.5 12.7044 4.81607 11.9413 5.37868 11.3787C5.94129 10.8161 6.70435 10.5 7.5 10.5L18.75 10.5C19.5456 10.5 20.3087 10.8161 20.8713 11.3787C21.4339 11.9413 21.75 12.7044 21.75 13.5ZM40.5 10.5H29.25C28.4544 10.5 27.6913 10.8161 27.1287 11.3787C26.5661 11.9413 26.25 12.7044 26.25 13.5L26.25 25.5C26.25 26.2956 26.5661 27.0587 27.1287 27.6213C27.6913 28.1839 28.4544 28.5 29.25 28.5H40.5V30C40.5 31.5913 39.8679 33.1174 38.7426 34.2426C37.6174 35.3679 36.0913 36 34.5 36C34.1022 36 33.7206 36.158 33.4393 36.4393C33.158 36.7206 33 37.1022 33 37.5C33 37.8978 33.158 38.2794 33.4393 38.5607C33.7206 38.842 34.1022 39 34.5 39C36.8862 38.9975 39.1739 38.0485 40.8612 36.3612C42.5485 34.6739 43.4975 32.3862 43.5 30V13.5C43.5 12.7044 43.1839 11.9413 42.6213 11.3787C42.0587 10.8161 41.2957 10.5 40.5 10.5Z" fill="#080808" fill-opacity="0.9"></path>
                                    </svg>
                                </span>
                                <p class="text-black-text-800 text-[16px] sm:text-lg xl:text-xl font-bold font-Syne leading-7 mb-4">
                                    “Energistically
                                    build
                                    “Aliquam vehicula nunc facilisis tincidunt feugiat. Pellentesque sed viverra
                                    nisi. Fusce
                                    et
                                    laoreet augue. Quisque pretium, ligula lectus semper urna. Aliquam vehicula.”

                                </p>
                                <h4 class="flex flex-wrap items-center gap-4 text-black-800 text-[16px] sm:text-lg font-extrabold font-Syne leading-7">
                                    <span><svg width="48" height="2" viewBox="0 0 48 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 1H48" stroke="#080808" stroke-opacity="0.4"></path>
                                        </svg>
                                    </span> Jhon Smith
                                </h4>
                            </div>
                        </div>

                    <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div> -->

                </div>
            </div>
    </section>
    <section class="bg-devanga-primary py-40" id="projects">
      <div class="xl:max-w-[1350px] lg:max-w-[960px] md:max-w-2xl sm:max-w-xl xl mx-auto px-3">
        <!-- heading -->
        <div class="text-center max-w-[920px] mx-auto md:mb-[60px] sm:mb-[50px] mb-[45px]">
          <p class="text-2xl font-caveat text-devanga-yellow relative flex justify-center items-center sm:gap-6 gap-[14px] mx-auto mb-[30px]" data-aos="fade-down" data-aos-duration="1000">
            <span class="sm:w-20 w-[50px] h-[1px] bg-devanga-yellow"></span>
            Our Courses & Publications
            <span class="sm:w-20 w-[50px] h-[1px] bg-devanga-yellow"></span>
          </p>
          <h2 class="font-raleway font-medium lg:text-6xl md:text-5xl sm:text-4xl text-[29px] text-white lg:leading-[120%] md:leading-tight leading-9" data-aos="fade-up" data-aos-duration="1200">
            Look At My Portfolio And Give Me Your Feedback
          </h2>
        </div>
        <!-- heading -->

        <div class="md:columns-2 col-span-1 xxl:gap-[58px] lg:gap-12 md:gap-[30px]">
          <!-- card 1 -->
          <div class="project__item overflow-hidden group xl:mb-[60px] lg:mb-[50px] mb-[30px] aos-init" data-aos="fade-up" data-aos-duration="1000">
            <a href="@/assets/images/placeholder/project1.png" class="imgc overflow-hidden lg:mb-[30px] mb-[20px] block w-full cursor-pointer">
              <img src="@/assets/images/placeholder/project1.png" alt="img" class="w-full overflow-hidden duration-500 rounded-[10px] group-hover:scale-105">
            </a>
            <div class="content flex items-center justify-between gap-1">
              <a href="./protfolio.html" class="left__cont">
                <span class="text-devanga-yellow xl:mb-4 mb-2 block uppercase xl:text-lg text-base">
                  PRODUCT DESIGN
                </span>
                <h3 class="xl:text-[30px] sm:text-2xl text-xl font-semibold text-white">
                  Brand Identity &amp; Motion Design
                </h3>
              </a>
              <a href="@/assets/images/placeholder/project1.png" class="imgc h-[45px] w-[45px] sm:w-[60px] sm:h-[60px] rounded-md bg-white flex justify-center items-center duration-500 group-hover:bg-devanga-yellow cursor-pointer">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z" fill="currentColor" fill-opacity="0.9"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z" fill="currentColor" fill-opacity="0.9"></path>
                 </svg>
              </a>
            </div>
          </div>
          <!-- card 1 -->

          <!-- card 2 -->
          <div class="overflow-hidden group xl:mb-[60px] lg:mb-[50px] mb-[30px] aos-init" data-aos="fade-up" data-aos-duration="1000">
            <a href="@/assets/images/placeholder/project1.png" class="imgc overflow-hidden lg:mb-[30px] mb-[20px] block w-full cursor-pointer">
              <img src="@/assets/images/placeholder/project1.png" alt="img" class="w-full overflow-hidden duration-500 rounded-[10px] group-hover:scale-105">
            </a>

            <div class="content flex items-center justify-between gap-1">
              <a href="./protfolio.html" class="left__cont">
                <span class="text-devanga-yellow xl:mb-4 mb-2 block uppercase xl:text-lg text-base">
                  UI/UX DESIGN
                </span>
                <h3 class="xl:text-[30px] sm:text-2xl text-xl font-semibold text-white">
                  Mobile Application Development
                </h3>
              </a>
              <a href="@/assets/images/placeholder/project1.png" class="imgc h-[45px] w-[45px] sm:w-[60px] sm:h-[60px] rounded-md bg-white flex justify-center items-center duration-500 group-hover:bg-devanga-yellow cursor-pointer">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z" fill="currentColor" fill-opacity="0.9"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z" fill="currentColor" fill-opacity="0.9"></path>
                 </svg>
              </a>
            </div>
          </div>
          <!-- card 2 -->

          <!-- card 3 -->
          <div class="overflow-hidden group aos-init" data-aos="fade-up" data-aos-duration="1000">
            <a href="@/assets/images/placeholder/project1.png" class="imgc overflow-hidden lg:mb-[30px] mb-[20px] block w-full cursor-pointer">
              <img src="@/assets/images/placeholder/project1.png" alt="img" class="w-full overflow-hidden duration-500 rounded-[10px] group-hover:scale-105">
            </a>
            <div class="content flex items-center justify-between gap-1">
              <a href="./protfolio.html" class="left__cont">
                <span class="text-devanga-yellow xl:mb-4 mb-2 block uppercase xl:text-lg text-base">
                  PRODUCT DESIGN
                </span>
                <h3 class="xl:text-[30px] sm:text-2xl text-xl font-semibold text-white">
                  Design &amp; Branding Mokeup
                </h3>
              </a>
              <a href="@/assets/images/placeholder/project1.png" class="imgc h-[45px] w-[45px] sm:w-[60px] sm:h-[60px] rounded-md bg-white flex justify-center items-center duration-500 group-hover:bg-devanga-yellow cursor-pointer">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z" fill="currentColor" fill-opacity="0.9"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z" fill="currentColor" fill-opacity="0.9"></path>
                 </svg>
              </a>
            </div>
          </div>
          <!-- card 3 -->

          <!-- card 4 -->
          <div class="project__item overflow-hidden group xl:mb-[60px] lg:mb-[50px] mb-[30px] aos-init" data-aos="fade-up" data-aos-duration="1000">
            <a href="@/assets/images/placeholder/project1.png" class="imgc overflow-hidden lg:mb-[30px] mb-[20px] block w-full cursor-pointer">
              <img src="@/assets/images/placeholder/project1.png" alt="img" class="w-full overflow-hidden duration-500 rounded-[10px] group-hover:scale-105">
            </a>
            <div class="content flex items-center justify-between gap-1">
              <a href="./protfolio.html" class="left__cont">
                <span class="text-devanga-yellow xl:mb-4 mb-2 block uppercase xl:text-lg text-base">
                  UI/UX DESIGN
                </span>
                <h3 class="xl:text-[30px] sm:text-2xl text-xl font-semibold text-white">
                  Mobile Application Development
                </h3>
              </a>
              <a href="@/assets/images/placeholder/project1.png" class="imgc h-[45px] w-[45px] sm:w-[60px] sm:h-[60px] rounded-md bg-white flex justify-center items-center duration-500 group-hover:bg-devanga-yellow cursor-pointer">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z" fill="currentColor" fill-opacity="0.9"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z" fill="currentColor" fill-opacity="0.9"></path>
                 </svg>
              </a>
            </div>
          </div>
          <!-- card 4 -->

          <!-- card 5 -->
          <div class="project__item overflow-hidden group xl:mb-[60px] lg:mb-[50px] mb-[30px] aos-init" data-aos="fade-up" data-aos-duration="1000">
            <a href="@/assets/images/placeholder/project1.png" class="imgc overflow-hidden lg:mb-[30px] mb-[20px] block w-full cursor-pointer">
              <img src="@/assets/images/placeholder/project1.png" alt="img" class="w-full overflow-hidden duration-500 rounded-[10px] group-hover:scale-105">
            </a>
            <div class="content flex items-center justify-between gap-1">
              <a href="./protfolio.html" class="left__cont">
                <span class="text-devanga-yellow xl:mb-4 mb-2 block uppercase xl:text-lg text-base">
                  UI/UX DESIGN
                </span>
                <h3 class="xl:text-[30px] sm:text-2xl text-xl font-semibold text-white">
                  Mobile Application Development
                </h3>
              </a>
              <a href="@/assets/images/placeholder/project1.png" class="imgc h-[45px] w-[45px] sm:w-[60px] sm:h-[60px] rounded-md bg-white flex justify-center items-center duration-500 group-hover:bg-devanga-yellow cursor-pointer">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z" fill="currentColor" fill-opacity="0.9"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z" fill="currentColor" fill-opacity="0.9"></path>
                 </svg>
              </a>
            </div>
          </div>
          <!-- card 5 -->

          <!-- card 6 -->
          <div class="project__item overflow-hidden group aos-init" data-aos="fade-up" data-aos-duration="1000">
            <a href="@/assets/images/placeholder/project1.png" class="imgc overflow-hidden lg:mb-[30px] mb-[20px] block w-full cursor-pointer">
              <img src="@/assets/images/placeholder/project1.png" alt="img" class="w-full overflow-hidden duration-500 rounded-[10px] group-hover:scale-105">
            </a>
            <div class="content flex items-center justify-between gap-1">
              <a href="./protfolio.html" class="left__cont">
                <span class="text-devanga-yellow xl:mb-4 mb-2 block uppercase xl:text-lg text-base">
                  UI/UX DESIGN
                </span>
                <h3 class="xl:text-[30px] sm:text-2xl text-xl font-semibold text-white">
                  Mobile Application Development
                </h3>
              </a>
              <a href="@/assets/images/placeholder/project1.png" class="imgc h-[45px] w-[45px] sm:w-[60px] sm:h-[60px] rounded-md bg-white flex justify-center items-center duration-500 group-hover:bg-devanga-yellow cursor-pointer">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z" fill="currentColor" fill-opacity="0.9"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z" fill="currentColor" fill-opacity="0.9"></path>
                 </svg>
              </a>
            </div>
          </div>
          <!-- card 6 -->
        </div>

        <!-- -------- Cricle box -->
        <div class="mt-[100px] flex justify-center">
          <a href="" class="md:w-52 md:h-52 w-32 h-32 bg-devanga-yellow rounded-full flex justify-center items-center text-center relative before:w-full before:h-full before:rounded-full before:border before:border-devanga-yellow before:content-[''] before:absolute before:top-[10px] before:-left-[7px] before:duration-500 hover:before:-top-[10px] aos-init" data-aos="zoom-out-down" data-aos-duration="2000">
            <span class="relative z-10">
              <i class="bi-arrow-right mb-[1px] md:text-[28px] text-base text-center flex justify-center text-clr_title transition-all">
              </i>
              <span class="text-[#282828] md:text-lg text-sm font-medium leading-[30px] capitalize transition-all">
                Click More Work
              </span>
            </span>
          </a>
        </div>
        <!-- -------- Cricle box -->
      </div>
    </section>
    <Footer></Footer>
</template>
