<template>
    <AdminLayout>
      <h1>Admin Communities</h1>
      <CommunityList />
    </AdminLayout>
  </template>
  
  <script setup>
  import AdminLayout from '@/layouts/AdminLayout.vue';
  import CommunityList from '@/views/admin/community/CommunityList.vue';
  </script>