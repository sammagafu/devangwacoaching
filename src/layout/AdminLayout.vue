
  <script setup>  
    import PanelMenu from 'primevue/panelmenu';
    import AdminTopBar from '@/components/dashboard/admin/AdminTopBar.vue';
    import AdminSideBar from '@/components/dashboard/admin/AdminSideBar.vue';
  </script>

<template>
  <AdminTopBar />
  <div class="">
    <div class="grid grid-cols-4 h-screen">
      <!-- Side menu -->
      <div class="col-span-1 bg-gray-200 p-4">
        <router-link :to="{ name: 'admin-dashboard' }"><img src="@/assets/images/logo/devangwa-logo.svg" class="h-24" alt=""></router-link>
        <AdminSideBar />
      </div>

      <!-- Main content -->
      <div class="col-span-3 bg-gray-100 p-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

