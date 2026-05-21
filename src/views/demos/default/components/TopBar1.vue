<template>
  <StickyHeader class-name="navbar-light navbar-sticky">
    <nav class="navbar navbar-expand-xl z-index-9">
      <b-container>
        <LogoBox />
        <MobileNavbarToggler />
        <b-collapse class="navbar-collapse" id="navbarCollapse">
          <b-col xxl="6">
            <div class="nav my-3 my-xl-0 px-4 flex-nowrap align-items-center">
              <div class="nav-item w-100">
                <b-form class="rounded position-relative" @submit.prevent="submitSearch">
                  <b-form-input
                    v-model="searchTerm"
                    class="pe-5 bg-secondary bg-opacity-10 border-0"
                    type="search"
                    placeholder="Search courses"
                    aria-label="Search courses"
                  />
                  <button
                    class="btn btn-link bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                    type="submit"
                    aria-label="Submit search"
                  >
                    <font-awesome-icon :icon="faSearch" class="fs-6 text-primary" />
                  </button>
                </b-form>
              </div>
            </div>
          </b-col>

          <ul class="navbar-nav navbar-nav-scroll ms-auto">
            <li class="nav-item">
              <router-link :to="{ name: 'courses' }" class="nav-link" active-class="active">Courses</router-link>
            </li>
            <li v-if="!authStore.isAuthenticated" class="nav-item">
              <router-link :to="{ name: 'auth.sign-in' }" class="nav-link">Sign in</router-link>
            </li>
            <li v-if="!authStore.isAuthenticated" class="nav-item">
              <router-link :to="{ name: 'auth.sign-up' }" class="nav-link">Create account</router-link>
            </li>
            <li v-if="authStore.isAuthenticated" class="nav-item">
              <router-link :to="{ name: 'student.dashboard' }" class="nav-link">Dashboard</router-link>
            </li>
          </ul>
        </b-collapse>

        <ul class="nav flex-row align-items-center list-unstyled ms-xl-auto">
          <li v-if="!authStore.isAuthenticated" class="nav-item ms-2 d-none d-md-block">
            <router-link :to="{ name: 'auth.sign-up' }" class="btn btn-primary btn-sm mb-0">
              Get started
            </router-link>
          </li>
          <ProfileDropdown className="nav-item ms-2" v-show="authStore.isAuthenticated" />
        </ul>
      </b-container>
    </nav>
  </StickyHeader>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LogoBox from '@/components/LogoBox.vue'
import StickyHeader from '@/components/StickyHeader.vue'
import ProfileDropdown from '@/components/ProfileDropdown.vue'
import MobileNavbarToggler from '@/components/MobileNavbarToggler.vue'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const searchTerm = ref('')

const submitSearch = () => {
  const q = searchTerm.value.trim()
  router.push({ name: 'courses', query: q ? { q } : {} })
}
</script>
