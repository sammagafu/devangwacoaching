import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
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
})

export default router
