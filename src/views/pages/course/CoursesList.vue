<template>
    <Breadcrum></Breadcrum>
    <div class="container mx-auto py-36">
        <!-- <div class="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-[30px]">

            <router-link :to="{ name: 'coaching-detail' }" class="bg-white rounded-[8px] transition shadow-box7 duration-150 border-b-4 hover:border-devanga-primary border-transparent
            hover:shadow-box6 flex p-8 space-x-6" v-for="courses in courses" :key="courses.id">
                <div class="flex-none">
                    <div class="w-[159px] h-[159px]  rounded  relative">
                        <img src="@/assets/images/placeholder/c1.png" alt=""
                            class=" w-full h-full object-cover rounded">
                    </div>
                </div>
                <div class="course-content flex-1">
                    <div class="text-devanga-primary font-bold text-2xl mb-2 flex justify-between">
                        <span class=" inline-block">Tsh 29.28</span>
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
        </div> -->
        <DataView :value="courses" :layout="layout">
          <!-- Header template with layout switcher -->
          <template #header>
            <div class="flex justify-end">
              <SelectButton v-model="layout" :options="options" :allowEmpty="false">
                <template #option="{ option }">
                  <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
                </template>
              </SelectButton>
            </div>
          </template>

          <!-- Template for list layout -->
          <template #list="slotProps">
            <div class="flex flex-col">
              <div v-for="(item, index) in slotProps.items" :key="index">
                <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{
                  'border-t border-surface-200 dark:border-surface-700':
                    index !== 0,
                }">
                  <div class="md:w-40 relative">
                    <!-- Replace with actual image source -->
                    <img class="block xl:block mx-auto rounded w-full" :src="item.cover" :alt="item.title" />
                    <!-- Replace with actual tag component -->
                    <Tag :value="item.inventoryStatus" class="absolute dark:!bg-surface-900"
                      style="left: 4px; top: 4px"></Tag>
                  </div>
                  <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                      <div>
                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                        <div class="text-lg font-medium mt-2">{{ item.title }}</div>
                      </div>
                      <div class="bg-surface-100 p-1" style="border-radius: 30px">
                        <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="
                              border-radius: 30px;
                              box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                                0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                            ">
                          <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                          <i class="pi pi-star-fill text-yellow-500"></i>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col md:items-end gap-8">
                      <span class="text-xl font-semibold">Tsh {{ item.price }}</span>
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                        <router-link :to="{ name: 'coaching-detail', params: { slug: item.slug } }"><Button
                          icon="pi pi-eye" severity="info" label="View Course"></Button></router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- Template for grid layout -->
          <template #grid="slotProps">
            <div class="grid grid-cols-12 gap-4">
              <div v-for="(item, index) in slotProps.items" :key="index"
                class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-4 p-2">
                <div
                  class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                  <div class="bg-surface-50 flex justify-center rounded p-4">
                    <div class="relative mx-auto">
                      <!-- Replace with actual image source -->
                      <img class="rounded w-full" :src="item.cover" :alt="item.title" style="max-width: 300px" />
                      <!-- Replace with actual tag component -->
                      <Tag :value="item.event_type" class="absolute dark:!bg-surface-900" style="left: 4px; top: 4px">
                      </Tag>
                    </div>
                  </div>
                  <div class="pt-6">
                    <div class="flex flex-row justify-between items-start gap-2">
                      <div>
                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">
                          <div class="text-clip" v-html="item.description"></div>
                        </span>
                        <div class="text-lg font-medium mt-1">{{ item.title }}</div>
                      </div>
                      <div class="bg-surface-100 p-1" style="border-radius: 30px">
                        <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="
                              border-radius: 30px;
                              box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                                0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                            ">
                          <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                          <i class="pi pi-star-fill text-yellow-500"></i>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col gap-6 mt-6">
                      <span class="text-2xl font-semibold">Tsh {{ item.price }}</span>
                      <div class="flex gap-2 justify-center">
                        <router-link :to="{ name: 'coaching-detail', params: { slug: item.slug } }"><Button
                          icon="pi pi-eye" severity="info" label="View Course"></Button></router-link>
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>

    </div>
</template>

<script setup>
import Breadcrum from '@/components/Breadcrum.vue';
import apiService from '@/service/apiService'; // Import your API service
import { ref,onMounted } from 'vue';

const courses = ref({})
const layout = ref('grid');
const options = ref(['list', 'grid']);

const getCourses = () => {
  apiService.get('course/courses/').then(response => {
    courses.value = response.data
  }).catch(error => {
    console.log(error);
  })
};

onMounted(() => {
//   getEvents();
  getCourses();
});

</script>