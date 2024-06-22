<script setup>
import { ref, onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';
import apiService from '@/service/apiService'; // Import your API service
import { FileUpload } from 'primevue/fileupload';
import { Editor } from 'primevue/editor';
import { Toolbar } from 'primevue/toolbar';
import { Button } from 'primevue/button';
import { InputText } from 'primevue/inputtext';
import { InputNumber } from 'primevue/inputnumber';
import { Dialog } from 'primevue/dialog';
import { DataView } from 'primevue/dataview';

const toast = useToast();

// Define your refs
const courses = ref([]);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref([]);
const dt = ref(null);
const submitted = ref(false);
const fleetype = ref([]);

// Form fields
const fomu = ref(null);
const coursename = ref('');
const courseprice = ref(null);
const coursedescription = ref(null);
const courseimage = ref(null);

// Sort options
const sortField = ref(null);
const sortOrder = ref(1);
const sortOptions = ref([
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' },
]);

// Lifecycle hook to fetch courses
onBeforeMount(() => {
    getCourses();
});

// Method to fetch courses from API
const getCourses = () => {
    apiService.get('coaching/events/')
        .then(response => {
            courses.value = response.data;
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
};


// Method to handle file upload
const onUpload = (event) => {
    courseimage.value = event.files[0]; // Store the selected file object
};

// Method to save course
const saveCourse = () => {
    submitted.value = true;
    if (!coursename.value || !courseprice.value || !coursedescription.value || !courseimage.value) {
        return;
    }

    const formData = new FormData(fomu.value);
    formData.append('title', coursename.value);
    formData.append('price', courseprice.value.toFixed(2));
    formData.append('event_type', coursedescription.value);
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
    submitted.value = false;
    resetForm();
};

// Method to delete course
const deleteCourse = () => {
    apiService.delete(`course/${product.value.id}`)
        .then(response => {
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Course Deleted', life: 3000 });
            getCourses();
            deleteProductDialog.value = false;
        })
        .catch(error => {
            console.error('Error deleting course:', error);
            toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting course', life: 3000 });
        });
};

// Method to confirm delete course
const confirmDeleteCourse = (courseToDelete) => {
    product.value = courseToDelete;
    deleteProductDialog.value = true;
};

</script>
<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <h4 class="text-2xl font-raleway font-bold text-devanga-primary">Manage Events</h4>
                        </div>
                    </template>

                    <template v-slot:end>
                        <Button label="New" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
                        <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV" />
                    </template>
                </Toolbar>

                <DataView :value="courses" :sortOrder="sortOrder" :sortField="sortField">
                    <!-- <template #header>
                        <Select v-model="sortKey" :options="sortOptions" optionLabel="label"
                            placeholder="Sort By Price" @change="onSortChange($event)" />
                    </template> -->
                    <template #list="slotProps">
                        <div class="grid grid-nogutter">
                            <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                                <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
                                    :class="{ 'border-top-1 surface-border': index !== 0 }">

                                    <div
                                        class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                                        <div
                                            class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                                            <div>
                                                <span class="font-medium text-secondary text-sm">Car Plate Number</span>
                                                <div class="text-lg font-medium text-900 mt-2">{{ item.coursename }}
                                                </div>
                                                <div class="text-lg font-medium text-900">Carrying Capacity{{
                                                    item.capacity }} Tons</div>

                                            </div>
                                        </div>
                                        <div class="flex flex-column md:align-items-end gap-5">
                                            <!-- <span class="text-xl font-semibold text-900">Carrying Capacity{{ item.capacity }} Tons</span> -->
                                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                                <Button icon="pi pi-search" outlined></Button>
                                                <Button icon="pi pi-shopping-cart" label="Buy Now"
                                                    :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                                                    class="flex-auto md:flex-initial white-space-nowrap"></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </DataView>

                <Dialog v-model:visible="productDialog" :style="{ width: '650px' }" header="Create Course" :modal="true"
                    class="p-fluid">
                    <form @submit.prevent="saveCourse" ref="fomu">
                        <div class="field py-2">
                            <label for="event">Event Name</label>
                            <InputText id="event" v-model.trim="event" required autofocus
                                :class="{ 'p-invalid': submitted && !event }" placeholder="Enter Course name"
                                name="event" />
                            <small class="p-invalid" v-if="submitted && !event">Course name is required.</small>
                        </div>
                        <input type="number" name="" id="">
                        <div class="field py-2">
                            <label for="courseprice">Course Price in TZS</label>
                            <InputNumber v-model="courseprice" inputId="currency-us" mode="currency" currency="TZS"
                                locale="en-TZ" type="number" placeholder="120,000"  />
                            <small class="p-invalid" v-if="submitted && !courseprice">Course price is required.</small>
                        </div>

                        <div class="flex justify-start py-4">
                            <FileUpload mode="basic" name="cover" accept="image/*" v-model="courseimage" @upload="onUpload" />
                        </div>

                        <div class="field py-2">
                            <label for="capacity">Course Description</label>
                            <Editor v-model="coursedescription" editorStyle="height: 200px" />
                        </div>

                    
                        <div class="mt-3">
                            <Button label="Save the course" icon="pi pi-check" type="submit" class="m-2" />
                            <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" class="m-2" severity="contrast" outlined />
                            
                        </div>
                    </form>
                </Dialog>

                <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm"
                    :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" severity="contrast" outlined />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm"
                    :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span>Are you sure you want to delete the selected products?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>