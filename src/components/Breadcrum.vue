<template>
    <div :style="{ backgroundImage: 'url(' + slide0 + ')' }"
        class="relative w-full h-[200px] md:h-[250px] xl:h-[350px] 3xl:h-[450px] bg-cover bg-center">
        <div class="absolute inset-0 bg-devanga-secondary opacity-90"></div> <!-- Overlay -->
        <div class="grid items-center justify-center text-  devanga-yellow relative h-full">
            <div class="container mx-auto">
                <template>
                    <div class="card flex justify-content-center">
                        <slot name="breadcrum">
                        </slot>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup>
import slide0 from "@/assets/images/branding/2.svg"
</script>