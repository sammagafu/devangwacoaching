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
                <b-form class="rounded position-relative">
                  <b-form-input class="pe-5 bg-secondary bg-opacity-10 border-0" type="search" placeholder="Search"
                    aria-label="Search" />
                  <button
                    class="btn btn-link bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                    type="submit">
                    <font-awesome-icon :icon="faSearch" class="fs-6 text-primary" />
                  </button>
                </b-form>
              </div>
            </div>
          </b-col>

          <ul class="navbar-nav navbar-nav-scroll ms-auto">
            <li class="nav-item"><router-link :to="{name:'courses'}" class="nav-link">Course</router-link></li>
            <li class="nav-item"><router-link :to="{name:'auth.sign-in'}" class="nav-link">Sign In</router-link></li>
            <li class="nav-item"><router-link :to="{name:'auth.sign-up'}" class="nav-link">Create Account</router-link></li>
          </ul>
        </b-collapse>

        <ul class="nav flex-row align-items-center list-unstyled ms-xl-auto">

          <li class="nav-item ms-0 ms-sm-2 d-none d-sm-block">
            <router-link :to="{name:'shop.checkout'}" class="btn btn-light btn-round mb-0 flex-centered">
              <BIconCart class="fa-fw" />
            </router-link>
          </li>
          <ProfileDropdown className="nav-item ms-3" v-show="authStore.isAuthenticated"/>
        </ul>
      </b-container>
    </nav>
  </StickyHeader>
</template>
<script setup lang="ts">
import LogoBox from '@/components/LogoBox.vue';
import StickyHeader from '@/components/StickyHeader.vue';
import ProfileDropdown from '@/components/ProfileDropdown.vue';
import DropDown from '@/components/DropDown.vue';
import MobileNavbarToggler from '@/components/MobileNavbarToggler.vue';
import { BIconCart, BIconBell, BIconGridFill } from 'bootstrap-icons-vue';
import { faSearch, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import avatar03 from '@/assets/images/avatar/03.jpg';
import { useAuthStore } from '@/stores/auth';
import { vShow } from 'vue';
const authStore = useAuthStore();
const menuItems = [
  { label: 'Development', children: ['Web Development', 'Data Science', 'Mobile Development', 'Programming Language', 'Software Testing', 'Software Engineering', 'Software Development Tools'] },
  { label: 'Finance & Accounting' },
  { label: 'Personal Development' },
  { label: 'IT & Software' },
  { label: 'Personal Development' },
];
</script>