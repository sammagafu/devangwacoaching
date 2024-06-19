import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layout/AdminLayout.vue';
import UserLayout from '@/layout/UserLayout.vue';
import DefaultLayout from '@/layout/DefaultLayout.vue';
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: DefaultLayout,
      children:[
        {
          path:'',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/pages/AboutView.vue')
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('../views/pages/Contact.vue')
        },
        {
          path: '/coaching',
          name: 'coaching',
          // component: () => import('../views/pages/Contact.vue')
          children : [
            {
              path: '',
              name: 'coaching-list',
              component: () => import('@/views/pages/course/CoursesList.vue')
            },
            {
              path: 'details',
              name: 'coaching-detail',
              component: () => import('@/views/pages/course/CourseDetail.vue')
            },
          ]
        },
        {
          path: '/event',
          name: 'main-event',
          // component: () => import('../views/pages/Contact.vue')
          children : [
            {
              path: '',
              name: 'event-list',
              component: () => import('@/views/pages/event/EventList.vue')
            },
            {
              path: 'details',
              name: 'event-detail',
              component: () => import('@/views/pages/event/EventDetails.vue')
            },
          ]
        },

        {
          path: '/auth',
          name: 'auth',
          // component: () => import('../views/pages/Contact.vue')
          children : [
            {
              path: 'login',
              name: 'login',
              component: () => import('@/views/pages/auth/Login.vue')
            },
            {
              path: 'register',
              name: 'register',
              component: () => import('@/views/pages/auth/Register.vue')
            },
            {
              path: 'forget-password',
              name: 'forget-password',
              component: () => import('@/views/pages/auth/ForgotPassword.vue')
            },
          ]
        },

        {
          path: '/community',
          name: 'community',
          // component: () => import('../views/pages/Contact.vue')
          children : [
            {
              path: '',
              name: 'community-index',
              component: () => import('@/views/pages/community/Community.vue')
            },
            {
              path: ':id',
              name: 'community-details',
              component: () => import('@/views/pages/community/CommunityDetails.vue')
            },
            // {
            //   path: 'forget-password',
            //   name: 'forget-password',
            //   component: () => import('@/views/pages/auth/ForgotPassword.vue')
            // },
          ]
        },

      ]
    },
// admin urls
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout, 
      children:[
        {
          path: '',
          name:'admin-dashboard',
          component : ()=>import('@/views/pages/admin/dashboard/Dashboard.vue')
        },
        {
          path:'courses/',
          name: 'admin-create-course',
          // component : ()=>import('@/views/pages/admin/courses/CreateCourse.vue')
          children:[
            {
              path:'',
              name:'create-course',
              component : ()=>import('@/views/pages/admin/courses/CreateCourse.vue')
            },
            {
              path:':slug',
              name:'create-detail',
              component : ()=>import('@/views/pages/admin/courses/CreateCourse.vue')
            },
          ]
        }
      ]
    }
  ]
})

export default router
