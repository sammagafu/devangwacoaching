<template>
    <div class="grid">
      <div class="col-12">
        <div class="card">
          <Toolbar class="mb-4">
            <template v-slot:start>
              <div class="my-2">
                <h4 class="text-2xl font-raleway font-bold text-devanga-primary">
                  {{ eventDetails.title }}
                </h4>
              </div>
            </template>
            <template v-slot:end>
              <!-- Button to open new course dialog -->
              <Button label="Add Module" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
            </template>
          </Toolbar>

          
      <div class="container mx-auto font-raleway py-32">
      <img :src="eventDetails.cover" alt="" class=" lg:mb-10 mb-6 block w-full">
      <div class="grid grid-cols-12 gap-[30px]">
        <div class="lg:col-span-8 col-span-12">
          <div class="lg:my-6 my-4">
            <div v-html="eventDetails.title"></div>
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
            </div>
          </div>
        </div>
      </div>
    </div>

        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from 'vue';
  import apiService from '@/service/apiService';
  import { useRouter, useRoute } from 'vue-router';
  import { useToast } from 'primevue/usetoast';
  
  const eventDetails = ref([])
  const route = useRoute()
  const toast = useToast();
  const slug = route.params.slug
  const createmoduleDialogue = ref(false)
  const submitted = ref(false)
  const deletemoduleDialogue = ref(false)
  const videoDialog = ref(false)
  const fileDialog = ref(false)
  const module = ref({})
  const moduleID = ref(0)
  
  // video data
  const videoname = ref('')
  const videourl = ref('')
  
  // video data
  const documentname = ref('')
  const file = ref('')
  
  
  // module contents
  const modulename = ref('')
  const description = ref('')
  
  
  const getCoursesDetail = () => {
    apiService.get(`coaching/events/${slug}/`)
      .then(response => {
        eventDetails.value = response.data
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Course Deleted', life: 3000 });
      })
      .catch(error => {
        console.error('Error deleting course:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting course', life: 3000 });
      });
  };
  
  const addCourseModule = () => {
    apiService.post('course/modules/', {
      'title': modulename.value,
      'description': description.value,
      'course': eventDetails.value.id
    }).then(response => {
      toast.add({ severity: 'success', summary: 'Successful', detail: 'Module added', life: 3000 });
      getCoursesDetail(); // Refresh the course details after adding a module
    })
      .catch(error => {
        console.error('Error adding module:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error adding module', life: 3000 });
      });
  }
  
  const addFileToModule = () => {
    submitted.value = true;
    const formData = new FormData();
    formData.append('title', documentname.value);
    formData.append('module', moduleID.value);
  
    apiService.post('course/documents/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Course saved successfully', life: 3000 });
        getCourses();
        productDialog.value = false;
        resetForm();
  
      })
      .catch(error => {
        console.error('Error saving course:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error saving course', life: 3000 });
      });
  }
  
  
  const addVideoToModule = () => {
    const formData = {
      'title': videoname.value,
      'video_url': videourl.value,
      'module': moduleID.value
    }
    apiService.post('course/videos/', formData)
      .then(response => {
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Course saved successfully', life: 3000 });
        getCourses();
        productDialog.value = false;
        resetForm();
  
      })
      .catch(error => {
        console.error('Error saving course:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error saving course', life: 3000 });
      });
  
    videoname.value = ''
    videourl.value = ''
    videoDialog.value = false;
  };
  
  const deleteModule = (id) => {
    console.log(id);
  }
  
  // Method to open new course dialog
  const openNew = () => {
    module.value = {};
    submitted.value = false;
    createmoduleDialogue.value = true;
  };
  
  const openVideoDialog = (id) => {
    submitted.value = false;
    videoDialog.value = true;
    moduleID.value = id
  }
  const openDocumentDialog = (id) => {
    submitted.value = false;
    fileDialog.value = true;
    moduleID.value = id
  }
  
  // Method to hide dialog
  const hideDialog = () => {
    createmoduleDialogue.value = false;
    deletemoduleDialogue.value = false;
    videoDialog.value = false;
    fileDialog.value = false;
    submitted.value = false;
    resetForm();
  };
  
  onBeforeMount(() => {
    getCoursesDetail();
  });
  
  </script>
  