<template>
    <Breadcrum></Breadcrum>
    <!-- events start here -->
    <div class="xl:max-w-[1350px] lg:max-w-[960px] md:max-w-2xl sm:max-w-xl xl mx-auto px-3 py-20">
    <div class="container mx-auto py-24">
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
            <div class=" bg-gray-100 shadow rounded-[8px] transition duration-100 hover:shadow-box3"
                v-for="index in 12" :key="index">
                <router-link :to="{name:'event-detail'}">
                <div class="course-thumb h-[297px] rounded-t-[8px]  relative">
                    <img src="@/assets/images/placeholder/e8.png" alt=""
                        class=" w-full h-full object-cover rounded-t-[8px]">
                </div>
            </router-link>
                <div class="course-content p-8">
                    <h4 class=" text-xl mb-5 font-bold">
                        <router-link :to="{name:'event-detail'}" class="hover:text-devanga-primary transition duration-15">Event Name</router-link>
                    </h4>
                    <ul class=" list space-y-3 mb-6">
                        <li class=" flex space-x-2">
                            <span class="text-lg  text-devanga-secondary">
                                <i class="pi pi-calendar "></i>
                            </span>
                            <span>Thu, Oct 5, 2023 03:48 PM</span>
                        </li>
                        <li class=" flex space-x-2">
                            <span class="text-lg text-devanga-secondary">
                                <i class="pi pi-map-marker"></i>
                            </span>
                            <span>Humberg City, Germany</span>
                        </li>
                    </ul>
                    <router-link :to="{name:'event-detail'}" class="btn px-8 py-[11px] bg-devanga-primary text-white hover:bg-primary">Book A Seat</router-link>
                </div>
            
            </div>
        </div>
    </div>
</div>
    <!-- ends here -->
</template>
<script setup>
import Breadcrum from '@/components/Breadcrum.vue';
</script>