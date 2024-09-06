<template>
<Breadcrum>
  <template #breadcrum>
    <Breadcrumb :home="home" :model="items" />
  </template>
</Breadcrum>

<section>
    <div class="container-fluid">
        <div class="container mx-autooverflow-x-hidden">
            <div style="transition-duration: 1s; transform: translateX(0px) translateZ(0px);">
                <h1
                    class="text-devangwa-yellow webkit-text-stroke-width-1 text-devanga-primary opacity-20 xl:text-[324px]  lg:text-[200px] md:text-[170px] sm:text-[140px] text-[100px] whitespace-nowrap font-extrabold leading-135 ">
                    Devangwa</h1>
            </div>
        </div>
        <div class="container relative mx-auto">
            <div
                class="xl:-mt-52 -mt-16 xl:ml-12.5 lg:ml-9 md:ml-7 ml-3 after:contents-[&quot;&quot;] after:absolute after:left-[12px] after:top-0 after:w-[1px] after:h-full after:bg-devanga-primary">
                <h2
                    class="[font-size:_clamp(48px,7vw,130px)] font-extrabold leading-110 text-devanga-primary font-raleway">
                    one who was called!
</h2><span class="block w-[300px] h-[1px] bg-devanga-primary"></span>
                <div class="flex md:flex-row flex-col justify-between md:items-center">
                    <h5
                        class="text-devanga-primary lg:text-[35px] sm:text-3xl text-2xl font-semibold mt-4 md:mb-0 mb-7 !leading-160 font-raleway">
                        This is more than a name; it's a journey born from witnessing the struggles of loved ones and a deep-seated belief in the sanctity of marriage. I saw marriages falter, hearts break, and promises fade. It sparked a question: Why aren't people living the joy they promised each other ?</h5>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-32">
	<div class="bg-devanga-primary xl:mt-[220px] lg:mt-25 md:mt-44 mt-[540px] xl:mb-20 my-12 font-raleway">
            <div class="container mx-auto py-32">
                <div class="flex lg:flex-row flex-col items-center justify-between gap-[66px]">
                    <div class="md:-mt-25 -mt-[370px] -mb-25">
                        <div style="opacity: 1; transform: none;"><img alt="about-bg" loading="lazy" width="584"
                                height="823" decoding="async" data-nimg="1"
                                src="@/assets/images/hero/about.jpg" style="color: transparent;"></div>
                    </div>
                    <div class="max-w-[633px] lg:pt-0 pt-20 lg:pb-0 pb-10">
                        <p class=" text-devanga-ken text-2xl">This is more than a name; it's a journey born from witnessing the struggles of loved ones and a deep-seated belief in the sanctity of marriage. I saw marriages falter, hearts break, and promises fade. It sparked a question: Why aren't people living the joy they promised each other ?</p>
                        <p class="text-devanga-ken text-2xl mt-7">Imagine a marriage where laughter fills the air, where disagreements are stepping stones to deeper understanding, and where love grows stronger with each passing day. This is not a fairy tale; it's the reality countless couples have discovered through Devangwa Coaching.</p>
						<p class="text-devanga-ken text-2xl mt-7">I've seen women blossom into their full potential, men embrace vulnerability, and relationships heal from the deepest wounds. I've witnessed the transformation of marriages from battlegrounds to havens of peace.</p>
                    </div>
                </div>
            </div>
        </div>
</section>
</template>

<script setup>
import Breadcrum from '@/components/Breadcrum.vue';
import Breadcrumb from 'primevue/breadcrumb';
import { ref } from "vue";

const home = ref({
    icon: 'pi pi-home'
});
const items = ref([
    { label: 'Electronics' }, 
    { label: 'Computer' }, 
    { label: 'Accessories' }, 
    { label: 'Keyboard' }, 
    { label: 'Wireless' }
]);

</script>