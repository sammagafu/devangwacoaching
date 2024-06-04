<template>
    <Breadcrum></Breadcrum>
    <div class="container mx-auto py-36">
        <div class="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-[30px]">

            <router-link :to="{ name: 'coaching-detail' }" class="bg-white rounded-[8px] transition shadow-box7 duration-150 border-b-4 hover:border-devanga-primary border-transparent
            hover:shadow-box6 flex p-8 space-x-6" v-for="index in 10" :key="index">
                <div class="flex-none">
                    <div class="w-[159px] h-[159px]  rounded  relative">
                        <img src="@/assets/images/placeholder/c1.png" alt=""
                            class=" w-full h-full object-cover rounded">
                    </div>
                </div>
                <div class="course-content flex-1">
                    <div class="text-devanga-primary font-bold text-2xl mb-2 flex justify-between">
                        <span class=" inline-block">$29.28</span>
                    </div>
                    <h4 class=" text-2xl leading-[36px] mb-4 font-bold">Basic Fundamentals of Interior &amp; Graphics
                        Design</h4>
                    <div class="flex   space-x-6">
                        <span class=" flex items-center space-x-2">
                            <i class="pi pi-book"></i>
                            <span>2 Lessons</span>
                        </span>
                        <span class=" flex items-center space-x-2">
                            <i class="pi pi-time"></i>
                            <span>4h:30m</span>
                        </span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import Breadcrum from '@/components/Breadcrum.vue';
import { ref } from 'vue';

const courses = ref()
</script>