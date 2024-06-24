<template>
    <div class="grid">
      <div class="col-12">
        <div class="card">
          <!-- Toolbar with buttons -->
          <Toolbar class="mb-4">
            <template v-slot:start>
              <div class="my-2">
                <h4 class="text-2xl font-raleway font-bold text-devanga-primary">
                  Manage Events
                </h4>
              </div>
            </template>
            <template v-slot:end>
              <!-- Button to open new course dialog -->
              <Button
                label="New"
                icon="pi pi-plus"
                class="mr-2"
                severity="success"
                @click="openNew"
              />
              <!-- Placeholder for export button -->
              <Button
                label="Export"
                icon="pi pi-upload"
                severity="help"
                @click="exportCSV"
              />
            </template>
          </Toolbar>
  
          <!-- DataView component to display courses -->
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
                  <div
                    class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                    :class="{
                      'border-t border-surface-200 dark:border-surface-700':
                        index !== 0,
                    }"
                  >
                    <div class="md:w-40 relative">
                      <!-- Replace with actual image source -->
                      <img
                        class="block xl:block mx-auto rounded w-full"
                        :src="item.cover"
                        :alt="item.title"
                      />
                      <!-- Replace with actual tag component -->
                      <Tag
                        :value="item.inventoryStatus"
                        class="absolute dark:!bg-surface-900"
                        style="left: 4px; top: 4px"
                      ></Tag>
                    </div>
                    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                      <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                        <div>
                          <span
                            class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                            >{{ item.category }}</span
                          >
                          <div class="text-lg font-medium mt-2">{{ item.title }}</div>
                        </div>
                        <div class="bg-surface-100 p-1" style="border-radius: 30px">
                          <div
                            class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                            style="
                              border-radius: 30px;
                              box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                                0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                            "
                          >
                            <span
                              class="text-surface-900 font-medium text-sm"
                              >{{ item.rating }}</span
                            >
                            <i class="pi pi-star-fill text-yellow-500"></i>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-col md:items-end gap-8">
                        <span class="text-xl font-semibold">${{ item.price }}</span>
                        <div class="flex flex-row-reverse md:flex-row gap-2">
                            <router-link :to="{name:'admin-course-detail',params: { slug: item.slug }}"><Button icon="pi pi-eye" severity="info"></Button></router-link>
                            <Button icon="pi pi-pencil"></Button>
                            <Button icon="pi pi-trash" severity="danger"></Button>   
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
                <div
                  v-for="(item, index) in slotProps.items"
                  :key="index"
                  class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-4 p-2"
                >
                  <div
                    class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col"
                  >
                    <div class="bg-surface-50 flex justify-center rounded p-4">
                      <div class="relative mx-auto">
                        <!-- Replace with actual image source -->
                        <img
                          class="rounded w-full"
                          :src="item.cover"
                          :alt="item.title"
                          style="max-width: 300px"
                        />
                        <!-- Replace with actual tag component -->
                        <Tag
                          :value="item.event_type"
                          class="absolute dark:!bg-surface-900"
                          style="left: 4px; top: 4px"
                        ></Tag>
                      </div>
                    </div>
                    <div class="pt-6">
                      <div class="flex flex-row justify-between items-start gap-2">
                        <div>
                          <span
                            class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                            >{{ item.category }}</span
                          >
                          <div class="text-lg font-medium mt-1">{{ item.title }}</div>
                        </div>
                        <div class="bg-surface-100 p-1" style="border-radius: 30px">
                          <div
                            class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                            style="
                              border-radius: 30px;
                              box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                                0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                            "
                          >
                            <span
                              class="text-surface-900 font-medium text-sm"
                              >{{ item.rating }}</span
                            >
                            <i class="pi pi-star-fill text-yellow-500"></i>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-col gap-6 mt-6">
                        <span class="text-2xl font-semibold">${{ item.price }}</span>
                        <div class="flex gap-2">
                            <router-link :to="{name:'admin-course-detail',params: { slug: item.slug }}"><Button icon="pi pi-eye" severity="info"></Button></router-link>
                            <Button icon="pi pi-pencil"></Button>
                            <Button icon="pi pi-trash" severity="danger"></Button>  
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </DataView>
  
          <!-- Dialog for creating a new course -->
          <Dialog v-model:visible="productDialog" :style="{ width: '650px' }" header="Create Course" :modal="true" class="p-fluid">
            <form @submit.prevent="saveCourse">
              <div class="field py-2">
                <label for="coursename">Course Name</label>
                <InputText id="coursename" v-model.trim="coursename" required autofocus :class="{ 'p-invalid': submitted && !coursename }" placeholder="Enter Course name" name="coursename" />
                <small class="p-invalid" v-if="submitted && !coursename">Course name is required.</small>
              </div>
  
              <div class="field py-2">
                <label for="courseprice">Course Price in TZS</label>
                <InputNumber v-model="courseprice" inputId="currency-us" mode="currency" currency="TZS" locale="en-TZ" placeholder="120,000" />
                <small class="p-invalid" v-if="submitted && !courseprice">Course price is required.</small>
              </div>
  
              <div class="field py-2">
                <label for="courseimage">Course Image</label>
                <input type="file" name="cover" accept="image/*" @change="onUpload" ref="files">
                <small class="p-invalid" v-if="submitted && !courseimage">Course image is required.</small>
              </div>
  
              <div class="field py-2">
                <label for="coursedescription">Course Description</label>
                <Editor v-model="coursedescription" editorStyle="height: 200px" />
              </div>
  
              <div class="mt-3">
                <Button label="Save the course" icon="pi pi-check" type="submit" class="m-2" />
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" class="m-2" severity="contrast" outlined />
              </div>
            </form>
          </Dialog>
  
          <!-- Dialog to confirm deleting a course -->
          <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="confirmation-content">
              <p>Are you sure you want to delete this course?</p>
            </div>
            <div class="p-dialog-footer">
              <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
              <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="deleteProduct" />
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from 'vue';
  import { useToast } from 'primevue/usetoast';
  import { useRouter } from 'vue-router';
  import apiService from '@/service/apiService'; // Import your API service
  
  const toast = useToast();
  const router = useRouter();

  
  // Refs for data
  const courses = ref([]);
  const productDialog = ref(false);
  const deleteProductsDialog = ref(false);
  const product = ref({});
  const courseimage = ref(null);
  const coursedescription = ref('');
  const coursename = ref('');
  const courseprice = ref(null);
  const submitted = ref(false);

// layouts
const layout = ref('grid');
const options = ref(['list', 'grid']);
  // Lifecycle hook to fetch courses
  onBeforeMount(() => {
      getCourses();
  });
  
  // Method to fetch courses from API
  const getCourses = () => {
      apiService.get('course/')
          .then(response => {
              courses.value = response.data;
          })
          .catch(error => {
              console.error('Error fetching courses:', error);
          });
  };
  
  // Method to save course
  const saveCourse = () => {
      submitted.value = true;
      if (!coursename.value || !courseprice.value || !coursedescription.value || !courseimage.value) {
          return;
      }
  
      const formData = new FormData();
      formData.append('title', coursename.value);
      formData.append('price', courseprice.value.toFixed(2));
      formData.append('description', coursedescription.value);
      formData.append('cover', courseimage.value);
  
      apiService.post('course/', formData, {
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
  };
  
  // Method to handle file upload
  const onUpload = (event) => {
    if (event.target.files.length > 0) {
    courseimage.value = event.target.files[0]; // Store the selected file object
    console.log(courseimage.value); // Verify if the file is correctly assigned
  }
  };
  
  // Method to reset form fields
  const resetForm = () => {
      coursename.value = '';
      courseprice.value = null;
      coursedescription.value = '';
      courseimage.value = null;
      submitted.value = false;
  };
  
  // Method to open new course dialog
  const openNew = () => {
      product.value = {};
      submitted.value = false;
      productDialog.value = true;
  };
  
  // Method to hide dialog
  const hideDialog = () => {
      productDialog.value = false;
      deleteProductsDialog.value = false;
      submitted.value = false;
      resetForm();
  };
  
  // Method to confirm delete course
  const confirmDeleteProduct = (productToDelete) => {
      product.value = productToDelete;
      deleteProductsDialog.value = true;
  };

  
  // Method to delete course
  const deleteProduct = () => {
      apiService.delete(`course/${product.value.id}`)
          .then(response => {
              toast.add({ severity: 'success', summary: 'Successful', detail: 'Course Deleted', life: 3000 });
              getCourses();
              deleteProductsDialog.value = false;
          })
          .catch(error => {
              console.error('Error deleting course:', error);
              toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting course', life: 3000 });
          });
  };
  
  // Method to export CSV (if needed)
  const exportCSV = () => {
      // Implement if needed
  };
  
  </script>

  