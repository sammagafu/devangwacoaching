<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="New" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
                            <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                                :disabled="!selectedProducts || !selectedProducts.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import"
                            chooseLabel="Import" class="mr-2 inline-block" />
                        <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable ref="dt" :value="users" paginator :rows="10">

                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Manage Users</h5>
                        </div>
                    </template>

                    <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
                    <Column field="full_name" header="Full Name" :sortable="true" headerStyle="width:30%; min-width:10rem;">
                    </Column>

                    <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
                    <Column field="email" header="Email" :sortable="true" headerStyle="width:15%; min-width:10rem;">
                    </Column>

                    <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
                    <Column field="is_active" header="Is active" :sortable="true" headerStyle="width:15%; min-width:10rem;">
                        <!-- <Tag :value="apiData ? 'Primary' : ''" :severity="apiData ? 'success' : 'danger'">
                                {{ is_active ? 'active' : 'not active' }}
                         </Tag> -->
                    </Column>

                    <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
                    <Column field="is_company" header="Company" :sortable="true" headerStyle="width:15%; min-width:10rem;">
                         <template #body="slotProps">
                            <Tag :severity="slotProps.data.is_company ? 'success':'danger'">{{ slotProps.data.is_company ? 'Company' : 'Not Company' }}</Tag>
                        </template>
                    </Column>

                    <Column field="is_individual" header="Individual" :sortable="true" headerStyle="width:15%; min-width:10rem;">
                         <template #body="slotProps">
                            <Tag :severity="slotProps.data.is_individual ? 'success':'danger'">{{ slotProps.data.is_individual ? 'Individual' : 'Not Individual' }}</Tag>
                        </template>
                    </Column>

                    <Column headerStyle="min-width:10rem;" header="Actions">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded
                                @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded
                                @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import apiService from '@/service/apiService'

const users = ref([])
const getUsers = () => {
    apiService.get('auth/users/').then(response => {
        users.value = response.data
        console.log(response);
    }).catch(error => {
        console.log(error);
    })
}
onBeforeMount(() => {
    getUsers();
});
</script>