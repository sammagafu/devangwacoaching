<template>
    <div class="flex justify-center">
      <PanelMenu :model="items" class="w-full md:w-80">
        <template #item="{ item }">
          <router-link v-if="item.to" :to="item.to" class="flex items-center px-4 py-2 cursor-pointer group">
            <span :class="[item.icon, 'text-primary group-hover:text-inherit']" />
            <span :class="['ml-2', { 'font-semibold': item.items }]">{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
          </router-link>
          <a v-else class="flex items-center px-4 py-2 cursor-pointer group">
            <span :class="[item.icon, 'text-primary group-hover:text-inherit']" />
            <span :class="['ml-2', { 'font-semibold': item.items }]">{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
          </a>
        </template>
      </PanelMenu>
    </div>
  </template>
  

<script setup>
import { ref } from "vue";
import PanelMenu from 'primevue/panelmenu';

const items = ref([
    {
        label: 'Users',
        icon: 'pi pi-user',
        // badge: 5,
        items: [
            {
                label: 'Manage Users',
                icon: 'pi pi-user',
                to: '/admin/users/'
            },
            // {
            //     label: 'Inbox',
            //     icon: 'pi pi-inbox',
            //     badge: 5
            // },
            // {
            //     label: 'Sent',
            //     icon: 'pi pi-send',
            //     shortcut: '⌘+S'
            // },
            // {
            //     label: 'Trash',
            //     icon: 'pi pi-trash',
            //     shortcut: '⌘+T'
            // }
        ]
    },
    {
        label: 'Course',
        icon: 'pi pi-desktop',
        items: [
            {
                label: 'Manage Course',
                icon: 'pi pi-folder-open',
                to: '/admin/courses/'
            },
        ]
    },
    {
        label: 'Coaching',
        icon: 'pi pi-calendar',
        shortcut: '⌘+W',
        items: [
            {
                label: 'Events',
                icon: 'pi pi-calendar-times',
                to: '/admin/event/'
            },
        ]
    },
    {
        label: 'Community',
        icon: 'pi pi-users',
        shortcut: '⌘+W',
        items: [
            {
                label: 'Events',
                icon: 'pi pi-calendar-times',
                to: '/admin/event/'
            },
        ]
    },
]);
</script>
