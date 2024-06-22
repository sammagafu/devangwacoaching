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
                icon: 'pi pi-file-edit',
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
        shortcut: '⌘+R',
        items: [
            {
                label: 'Manage Course',
                icon: 'pi pi-chart-line',
                to: '/admin/courses/'
            },
            {
                label: 'Products',
                icon: 'pi pi-list',
                badge: 6
            }
        ]
    },
    {
        label: 'Events',
        icon: 'pi pi-calendar',
        shortcut: '⌘+W',
        items: [
            {
                label: 'Manage Events',
                icon: 'pi pi-cog',
                to: '/admin/event/'
            },
            {
                label: 'Privacy',
                icon: 'pi pi-shield',
                shortcut: '⌘+P'
            }
        ]
    }
]);
</script>
