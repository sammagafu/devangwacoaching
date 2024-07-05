<template>
      <Breadcrum></Breadcrum>
      <div class="container mx-auto font-raleway py-32">
      <img :src="eventDetails.cover" alt="" class=" lg:mb-10 mb-6 block w-full">
      <div class="grid grid-cols-12 gap-[30px]">
        <div class="lg:col-span-8 col-span-12">
          <h3 class="font-bold uppercase text-devanga-alternative">
            {{eventDetails.title}}
          </h3>
          <div class="lg:my-6 my-4" v-html="eventDetails.description">
    
          </div>

          <div class=" py-6">
            Among the major reasons why Python is “slow”, it really boils down to 2 — Python is interpreted as opposed to compiled,
            ultimately leading to slower execution times; and the fact that it is dynamically typed. Take, for example, TensorFlow,
            a Machine Learning library available in Python. These libraries were actually written in C++ and made available in
            Python, sort of forming a Python implementation. The same goes for Numpy and, to an extent, even Caer.
          </div>
          <div class="flex justify-between border-y border-[#ECECEC] py-4 md:mt-12 mt-10">
            <div class=" text-black font-semibold">Previous</div>
            <ul class="flex space-x-3 lg:justify-end items-center  ">
              <li>
                <a href="#" class="flex h-8 w-8">
                  <span><i class="pi pi-facebook"></i></span>

                </a>
              </li>
              <li>
                <a href="#" class="flex h-8 w-8">
                  <span><i class="pi pi-twitter"></i></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="lg:col-span-4 col-span-12 relative lg:-mt-20 bg-devanga-primary rounded-lg">
          <div class="sidebarWrapper max-w-[90%] mx-auto space-y-[30px] py-12 text-white">
            <div class="custom-text space-y-5 ">
              <h4 class=" widget-title">Event Details</h4>
              <ul class="list space-y-6  ">

                <li class=" flex space-x-3 ">
                  <div class="flex-1 space-x-3 flex">
                        <span><i class="pi pi-clock"></i></span>
                        <div>4:00 pm - 6:00 pm</div>
                  </div>
                </li>

                <li class=" flex space-x-3 ">
                  <div class="flex-1 space-x-3 flex">
                    <span><i class="pi pi-calendar"></i></span>
                    <div>03 March, 2022</div>
                  </div>
                </li>

                <li class=" flex space-x-3 ">
                  <div class="flex-1 space-x-3 flex">
                    <span><i class="pi pi-map-marker"></i></span>
                    <div>12/A, NewYork Sydney City</div>
                  </div>
                </li>

                <li class=" flex space-x-3 ">
                  <div class="flex-1 space-x-3 flex">
                    <span><i class="pi pi-map-marker"></i></span>
                    <div>yourmail@gmail.com</div>
                  </div>
                </li>

                <li class=" flex space-x-3 ">
                  <div class="flex-1 space-x-3 flex">
                    <span><i class="pi pi-phone"></i></span>
                    <div>+88018 2829 98267</div>
                  </div>
                </li>

              </ul>
              <!-- <a href="#" class=" btn btn-primary btn-md text-lg">Book A Seat</a> -->
              <router-link class="btn bg-devanga-secondary block text-center py-2 rounded">Book A Seat</router-link>

            </div>

            <div class="wdiget">
              <h4 class=" widget-title">Special Guests</h4>
              <ul class="list space-y-6">
                <li class=" flex space-x-4 border-[#ECECEC] ">
                  <div class="flex-none ">
                    <div class="h-20 w-20   rounded-full">
                      <!-- <img src="assets/images/all-img/rc-1.png" alt="" class=" w-full h-full object-cover rounded-full"> -->
                    </div>
                  </div>
                  <div class="flex-1 ">

                    <div class="mb-1 font-bold text-black capitalize">
                      Sofia d. Flora

                    </div>
                    <span class=" text-primary font-semibold">UI/UX Designer</span>
                  </div>
                </li>
                <li class=" flex space-x-4 border-[#ECECEC] ">
                  <div class="flex-none ">
                    <div class="h-20 w-20   rounded-full">
                      <!-- <img src="assets/images/all-img/rc-2.png" alt="" class=" w-full h-full object-cover rounded-full"> -->
                    </div>
                  </div>
                  <div class="flex-1 ">

                    <div class="mb-1 font-bold text-black capitalize">
                      Jhonson Steven

                    </div>
                    <span class=" text-primary font-semibold">UI/UX Designer</span>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import Breadcrum from '@/components/Breadcrum.vue';
import { ref, onBeforeMount } from 'vue';
import apiService from '@/service/apiService';
import { useRouter, useRoute } from 'vue-router';


const eventDetails = ref([])
const route = useRoute()
const slug = route.params.slug



const getCoursesDetail = () => {
  apiService.get(`coaching/events/${slug}/`)
    .then(response => {
      eventDetails.value = response.data
    })
    .catch(error => {
      console.error('Error deleting course:', error);
    });
};
onBeforeMount(() => {
  getCoursesDetail();
});
</script>
