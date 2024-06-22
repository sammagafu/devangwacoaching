<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <h4 class="text-2xl font-raleway font-bold text-devanga-primary">
                {{ courseDetails.title }}
              </h4>
            </div>
          </template>
          <template v-slot:end>
            <!-- Button to open new course dialog -->
            <Button label="Add Module" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
          </template>
        </Toolbar>

        <Dialog v-model:visible="createmoduleDialogue" modal header="Header" :style="{ width: '40rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
                <div class="text-center">
                    <h3 class="font-bold whitespace-nowrap">Create New Module</h3>
                </div>
            </template>
            <form @submit.prevent="addCourseModule">
            <div class="flex flex-col gap-4 mb-4">
                <label for="modulename" class="font-raleway">Module Name</label>
                <InputText v-model="modulename" id="modulename" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex flex-col gap-4 mb-4">
                <label for="modulename" class="font-raleway">Module Description</label>
                <Editor v-model="description" editorStyle="height: 220px" />
            </div>
            <div class="flex justify-items-end">
              <Button label="Cancel" text severity="secondary" @click="createmoduleDialogue = false" autofocus />
                <Button label="Save" outlined severity="primary" type="submit" autofocus />
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import apiService from '@/service/apiService';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const courseDetails = ref([])
const route = useRoute()
const toast = useToast();
const slug = route.params.slug
const createmoduleDialogue = ref(false)
const submitted = ref(false)
const deletemoduleDialogue = ref(false)
const module = ref({})

// module contents
const modulename = ref('')
const description = ref('')


const getCoursesDetail = () => {
  apiService.get(`course/${slug}`)
    .then(response => {
      courseDetails.value = response.data
      // toast.add({ severity: 'success', summary: 'Successful', detail: 'Course Deleted', life: 3000 });
    })
    .catch(error => {
      console.error('Error deleting course:', error);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting course', life: 3000 });
    });
};

const addCourseModule = () =>{
  apiService.post('course/modules/',{
    'title':modulename.value,
    'description':description.value
  }).then(response =>{
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Module added', life: 3000 });
  })
  .catch(error => {
      console.error('Error deleting course:', error);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting course', life: 3000 });
    });
}

// Method to open new course dialog
const openNew = () => {
  module.value = {};
  submitted.value = false;
  createmoduleDialogue.value = true;
};

// Method to hide dialog
const hideDialog = () => {
  createmoduleDialogue.value = false;
  deletemoduleDialogue.value = false;
  submitted.value = false;
  resetForm();
};

onBeforeMount(() => {
  getCoursesDetail();
});

</script>
