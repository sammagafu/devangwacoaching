<template>
    <div :style="{ backgroundImage: 'url(' + slide0 + ')' }" class="relative w-full h-[500px] md:h-[600px] xl:h-[650px] 3xl:h-[950px] bg-cover bg-center">
    <div class="absolute inset-0 bg-devanga-secondary opacity-80"></div> <!-- Overlay -->
    <div class="grid items-center justify-center text-  devanga-yellow relative h-full">
      <div class="container mx-auto">
        <div class="mb-8 md:mb-9 lg:mb-11 xl:mb-12">
          <h1 class="text-xl sm:text-3xl md:text-4xl lg:text-6xl 3xl:text-6xl font-bold leading-[40px] md:leading-[50px] 3xl:leading-[70px] font-raleway text-devanga-yellow">Welcome to Devangwa Coaching</h1>
          <!-- <h4 class="text-xl my-4 mx-40">Karibu</h4> -->
        </div>
        <!-- <router-link :to="{name:'home'}"><button
            class="w-[185px] h-[48px] lg:h-[56px] bg-khaki relative before:w-8 before:h-[1px] before:bg-khaki before:absolute before:left-0 before:top-16 
            text-base
           font-Garamond
            font-medium mt-[-6px] bg-secondary after:bg-bg-black after:rounded-none hover:before:bg-normalBlack uppercase">Discover
            More</button></router-link> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import slide0 from "@/assets/images/branding/2.svg"
</script>