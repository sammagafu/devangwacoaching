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
        <div class="card">
          <Panel toggleable v-for="modules in courseDetails.modules" :key="modules.index" class="my-4">
            <template #header>
              <div class="flex items-center gap-2">
                <span class="font-bold">{{ modules.title }}</span>
              </div>
            </template>
            <template #footer>
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                  <Button icon="pi pi-video" rounded label="Add Video" @click="openVideoDialog(modules.id)"></Button>
                  <Button icon="pi pi-file" label="Add File" rounded @click="openDocumentDialog(modules.id)"></Button>
                  <Button icon="pi pi-trash" severity="danger" rounded label="Delete Module"
                    @click="deleteModule(modules.id)" />
                </div>
                <vue-moments-ago prefix="posted" suffix="ago" date="2018-05-02T20:22:22.285Z" lang="en"></vue-moments-ago>

                <!-- <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span> -->
              </div>
            </template>
            <!-- <template #icons>
              <Button icon="pi pi-trash" severity="secondary" rounded label="Delete Module" @click="toggle" />
            </template> -->
            <div v-html="modules.description"></div>
            <!-- video  -->
            <div class="card pt-6">
              <div class="py-2" v-for="videos in modules.videos" :key="videos">
                <div class="flex flex-row gap-2 justify-between">
                  <p class="text-lg">{{ videos.title }}</p>
                  <hr>
                  <div class="flex gap-2">
                    <Button icon="pi pi-pencil" rounded outlined></Button>
                    <Button icon="pi pi-trash" rounded outlined severity="danger"></Button>
                </div>
                </div>
              </div>
            </div>
          </Panel>
        </div>
        <!-- video Dialog -->
        <Dialog v-model:visible="videoDialog" modal header="Header" :style="{ width: '40rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <template #header>
            <div class="text-center">
              <h3 class="font-bold whitespace-nowrap">Create Or Add New Video</h3>
            </div>
          </template>
          <form @submit.prevent="addVideoToModule">

            <div class="flex flex-col gap-4 mb-4">
              <label for="videoname" class="font-raleway">Enter Video Name</label>
              <InputText v-model="videoname" id="videoname" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex flex-col gap-4 mb-4">
              <label for="videoname" class="font-raleway">Paste Video Url</label>
              <InputText v-model="videourl" id="videoname" class="flex-auto" autocomplete="off" type="text" />
            </div>
            <div class="flex justify-items-end">
              <Button label="Cancel" text severity="secondary" @click="createmoduleDialogue = false" autofocus />
              <Button label="Save" outlined severity="primary" type="submit" autofocus />
            </div>
          </form>
        </Dialog>
        <!-- ends here -->

        <Dialog v-model:visible="fileDialog" modal header="Header" :style="{ width: '40rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <template #header>
            <div class="text-center">
              <h3 class="font-bold whitespace-nowrap">Create Or Add New Video</h3>
            </div>
          </template>
          <form @submit.prevent="addFileToModule">

            <div class="flex flex-col gap-4 mb-4">
              <label for="modulename" class="font-raleway">Module Name</label>
              <InputText v-model="modulename" id="modulename" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex flex-col gap-4 mb-4">
              <label for="modulename" class="font-raleway">Module Description</label>
              <input type="file" name="cover" accept="image/*" @change="onUpload" ref="files">

            </div>
            <div class="flex justify-items-end">
              <Button label="Cancel" text severity="secondary" @click="createmoduleDialogue = false" autofocus />
              <Button label="Save" outlined severity="primary" type="submit" autofocus />
            </div>
          </form>
        </Dialog>
        <!-- ends here -->

        <Dialog v-model:visible="createmoduleDialogue" modal header="Header" :style="{ width: '40rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
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
  apiService.get(`course/courses/${slug}/`)
    .then(response => {
      courseDetails.value = response.data
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
    'course': courseDetails.value.id
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
