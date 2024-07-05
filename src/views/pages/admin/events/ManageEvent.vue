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
            <Button label="New" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
            <!-- Placeholder for export button -->
            <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV" />
          </template>
        </Toolbar>

        <!-- DataView component to display events -->
        <DataView :value="events" :layout="layout">
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
                      <span class="text-xl font-semibold">${{ item.price }}</span>
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                        <router-link :to="{ name: 'event-detail', params: { slug: item.slug } }"><Button
                            icon="pi pi-eye" severity="info"></Button></router-link>
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
                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.description
                          }}</span>
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
                      <span class="text-2xl font-semibold">${{ item.price }}</span>
                      <div class="flex gap-2">
                        <router-link :to="{ name: 'event-detail', params: { slug: item.slug } }"><Button
                          icon="pi pi-eye" severity="info"></Button></router-link>
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
        <Dialog v-model:visible="eventDialog" :style="{ width: '650px' }" header="Create Course" :modal="true"
          class="p-fluid">
          <form @submit.prevent="saveCourse">
            <div class="field py-2">
              <label for="eventname">Event Name</label>
              <InputText id="eventname" v-model.trim="eventname" required autofocus
                :class="{ 'p-invalid': submitted && !eventname }" placeholder="Enter Course name" name="eventname" />
              <small class="p-invalid" v-if="submitted && !eventname">Course name is required.</small>
            </div>

            <div class="field py-2">
              <label for="eventprice">Event Price in TZS</label>
              <InputNumber v-model="eventprice" inputId="currency-us" mode="currency" currency="TZS" locale="en-TZ"
                placeholder="120,000" />
              <small class="p-invalid" v-if="submitted && !eventprice">Event price is required.</small>
            </div>
            <div class="field py-2">
              <label for="eventdescription">Event Description</label>
              <Editor v-model="eventdescription" editorStyle="height: 200px" />
            </div>

            <div class="field py-2">
              <label for="eventname">Event Type</label>
              <select id="countries" v-model="eventtype"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Choose event type</option>
                <option value="online">Online Event</option>
                <option value="on_premises">On Premises Event</option>
              </select>

            </div>

            <div class="field py-2" v-if="eventtype =='on_premises'">
              <label for="eventname">Event Location</label>
              <InputText id="eventname" v-model.trim="eventname" required autofocus
                :class="{ 'p-invalid': submitted && !eventname }" placeholder="Enter Course name" name="eventname" />
              <small class="p-invalid" v-if="submitted && !eventname">Course name is required.</small>
            </div>

            <div class="flex space-x-4 justify-between">
              <div class="field py-2">
                <label for="eventstartdate">Event Start Date</label>
                <DatePicker id="eventstartdate" v-model="eventstartdate" showTime hourFormat="24" />
                <small class="p-invalid" v-if="submitted && !eventstartdate">Event start date is required.</small>
              </div>

              <div class="field py-2">
                <label for="eventendtdate">Event End Date</label>
                <DatePicker id="eventendtdate" v-model="eventendtdate" showTime hourFormat="24" />
                <small class="p-invalid" v-if="submitted && !eventendtdate">Event End date is required.</small>
              </div>
            </div>

            <div class="field py-2">
              <label for="registrationDeadline">Registration Deadline</label>
              <DatePicker id="registrationDeadline" v-model="registrationDeadline" showTime hourFormat="24" />
              <small class="p-invalid" v-if="submitted && !registrationDeadline">Registration date is required.</small>
            </div>

            <div class="field py-2">
              <label for="eventcover">Course Image</label>
              <input type="file" name="cover" accept="image/*" @change="onUpload" ref="files">
              <small class="p-invalid" v-if="submitted && !eventcover">Event cover image is required.</small>
            </div>

            <div class="mt-3">
              <Button label="Save the course" icon="pi pi-check" type="submit" class="m-2" />
              <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" class="m-2" severity="contrast"
                outlined />
            </div>
          </form>
        </Dialog>

        <!-- Dialog to confirm deleting a course -->
        <Dialog v-model:visible="deleteEventDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
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
import DatePicker from 'primevue/datepicker';

const toast = useToast();
const router = useRouter();

const events = ref([]);
const eventDialog = ref(false);
const deleteEventDialog = ref(false);
const product = ref({});
const eventcover = ref(null);
const eventdescription = ref('');
const eventtype = ref('')
const eventname = ref('');
const eventprice = ref(null)
const eventstartdate = ref(null)
const eventendtdate = ref(null)
const registrationDeadline = ref(null)
const submitted = ref(false);

const layout = ref('grid');
const options = ref(['list', 'grid']);

onBeforeMount(() => {
  getCourses();
});

const getCourses = () => {
  apiService.get('coaching/events/')
    .then(response => {
      events.value = response.data;
    })
    .catch(error => {
      console.error('Error fetching events:', error);
    });
};

const saveCourse = () => {
  submitted.value = true;
  if (!eventname.value || !eventprice.value || !eventdescription.value || !eventcover.value) {
    return;
  }

  const formData = new FormData();
  formData.append('title', eventname.value);
  formData.append('price', eventprice.value.toFixed(2));
  formData.append('description', eventdescription.value);
  formData.append('event_type', eventtype.value);

  const convertToISOString = (dateValue) => {
    if (!dateValue) {
      return null;
    }
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date.toISOString();
  };

  const startTime = convertToISOString(eventstartdate.value);
  const endTime = convertToISOString(eventendtdate.value);
  const registrationDeadlineTime = convertToISOString(registrationDeadline.value);

  if (!startTime || !endTime || !registrationDeadlineTime) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Invalid date value', life: 3000 });
    return;
  }

  formData.append('start_time', startTime);
  formData.append('end_time', endTime);
  formData.append('registration_deadline', registrationDeadlineTime);
  formData.append('location', eventtype.value);
  formData.append('cover', eventcover.value);

  apiService.post('coaching/events/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      toast.add({ severity: 'success', summary: 'Successful', detail: 'Course saved successfully', life: 3000 });
      getCourses();
      eventDialog.value = false;
      resetForm();
    })
    .catch(error => {
      console.error('Error saving course:', error);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error saving course', life: 3000 });
    });
};

const onUpload = (event) => {
  if (event.target.files.length > 0) {
    eventcover.value = event.target.files[0];
  }
};

const resetForm = () => {
  eventname.value = '';
  eventprice.value = null;
  eventdescription.value = '';
  eventcover.value = null;
  eventstartdate.value = null;
  eventendtdate.value = null;
  registrationDeadline.value = null;
  submitted.value = false;
};

const openNew = () => {
  product.value = {};
  submitted.value = false;
  eventDialog.value = true;
};

const hideDialog = () => {
  eventDialog.value = false;
  deleteEventDialog.value = false;
  submitted.value = false;
  resetForm();
};

const confirmDeleteProduct = (productToDelete) => {
  product.value = productToDelete;
  deleteEventDialog.value = true;
};

const deleteProduct = () => {
  apiService.delete(`course/${product.value.id}`)
    .then(response => {
      toast.add({ severity: 'success', summary: 'Successful', detail: 'Course Deleted', life: 3000 });
      getCourses();
      deleteEventDialog.value = false;
    })
    .catch(error => {
      console.error('Error deleting course:', error);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting course', life: 3000 });
    });
};

const exportCSV = () => {
  // Implement if needed
};
</script>