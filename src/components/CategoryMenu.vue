<template>
  <ul class="navbar-nav navbar-nav-scroll" :class="ulClass">
    <li class="nav-item dropdown dropdown-menu-shadow-stacked">
      <a class="nav-link d-flex align-items-center" :class="linkClass" href="#" id="categoryMenu"
        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <template v-if="showIcon">
          <BIconGrid3x3GapFill class="me-3 fs-5 me-xl-1 d-xl-none" />
          <BIconGrid3x3GapFill class="me-2 d-none d-xl-inline-block" />
          <span class="d-none d-xl-inline-block">Category</span>
        </template>
        <template v-else>
          <BIconUiRadiosGrid class="me-2" />
          <span>Category</span>
        </template>
      </a>
      <ul class="dropdown-menu" aria-labelledby="categoryMenu">

        <template v-for="(item, idx) in menuItems" :key="idx">
          <MenuItemWithChildren v-if="item.children" :item="item" />
          <li class="dropdown-submenu dropend" v-else-if="item.label === 'Marketing'">

            <a class="dropdown-item dropdown-toggle d-flex arrow-none" href="#">Marketing
              <font-awesome-icon :icon="faEllipsis" class="ms-auto fa-sm" />
            </a>
            <div class="dropdown-menu dropdown-menu-start dropdown-width-lg" data-bs-popper="none">
              <b-row class="p-4">
                <b-col xl="6" xxl="4" class="mb-4 mb-xl-0">
                  <h6 class="mb-0">Get started</h6>
                  <hr>
                  <ul class="list-unstyled">
                    <li v-for="(item, idx) in course" :key="idx">
                      <a class="dropdown-item" href="#">{{ item }}</a>
                    </li>
                  </ul>
                </b-col>

                <b-col xl="6" xxl="4" class="mb-4 mb-xl-0">
                  <h6 class="mb-0">Degree</h6>
                  <hr>
                  <div class="d-flex mb-4 position-relative" v-for="(item, idx) in degrees" :key="idx">
                    <img :src="item.logo" class="icon-md" alt="">
                    <div class="ms-3">
                      <a class="stretched-link h6 mb-0" href="#">{{ item.name }}</a>
                      <p class="mb-0 small">{{ item.degree }}</p>
                    </div>
                  </div>
                </b-col>

                <b-col xl="6" xxl="4">
                  <h6 class="mb-0">Certificate</h6>
                  <hr>
                  <div class="d-flex mb-4 position-relative" v-for="(item, idx) in certificates" :key="idx">
                    <v-icon name="fc-google" class="fa-fw" :class="item.iconClass" scale="2" v-if="!idx" />
                    <h2 class="mb-0" v-else>
                      <font-awesome-icon class="fa-fw" :class="item.iconClass" :icon="item.icon" />
                    </h2>
                    <div class="ms-2">
                      <a class="stretched-link h6 mb-0" href="#">{{ item.title }}</a>
                      <p class="mb-0 small">{{ item.caption }}</p>
                    </div>
                  </div>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-card no-body class="bg-blue rounded-0 rounded-bottom p-3 position-relative overflow-hidden"
                    :style="`background:url(${pattern05}) no-repeat center center; background-size:cover;`">
                    <figure class="position-absolute bottom-0 end-0 mb-n4 d-none d-md-block">
                      <svg width="92.6px" height="135.2px">
                        <path class="fill-white"
                          d="M71.5,131.4c0.2,0.1,0.4,0.1,0.6-0.1c0,0,0.6-0.7,1.6-1.9c0.2-0.2,0.1-0.5-0.1-0.7c-0.2-0.2-0.5-0.1-0.7,0.1 c-1,1.2-1.6,1.8-1.6,1.8c-0.2,0.2-0.2,0.5,0,0.7C71.4,131.3,71.4,131.4,71.5,131.4z">
                        </path>
                        <path class="fill-white"
                          d="M76,125.5c-0.2-0.2-0.3-0.5-0.1-0.7c1-1.4,1.9-2.8,2.8-4.2c0.1-0.2,0.4-0.3,0.7-0.2c0.2,0.1,0.3,0.4,0.2,0.7 c-0.9,1.4-1.8,2.9-2.8,4.2C76.6,125.6,76.3,125.6,76,125.5C76.1,125.5,76.1,125.5,76,125.5z M81.4,116.9 c-0.2-0.1-0.3-0.4-0.2-0.7c0.2-0.5,0.5-0.9,0.7-1.4c0.5-1.1,1-2.1,1.5-3.2c0.1-0.3,0.4-0.4,0.6-0.3c0.3,0.1,0.4,0.4,0.3,0.6 c-0.5,1.1-1,2.1-1.5,3.2c-0.2,0.5-0.5,0.9-0.7,1.4C81.9,117,81.6,117,81.4,116.9C81.4,116.9,81.4,116.9,81.4,116.9z M85.1,107.1 c0.5-1.6,1-3.2,1.3-4.8c0.1-0.3,0.3-0.4,0.6-0.4c0.3,0.1,0.4,0.3,0.4,0.6c-0.4,1.6-0.8,3.3-1.3,4.9c-0.1,0.3-0.4,0.4-0.6,0.3 c0,0,0,0-0.1,0C85.1,107.6,85,107.3,85.1,107.1z M47.3,83c-1.5-1.1-2.5-2.5-3.1-4.2c-0.1-0.3,0-0.5,0.3-0.6 c0.3-0.1,0.5,0,0.6,0.3c0.5,1.5,1.5,2.7,2.8,3.7c0.2,0.2,0.3,0.5,0.1,0.7C47.9,83.1,47.6,83.1,47.3,83C47.4,83,47.4,83,47.3,83z  M51.7,84.6c0-0.3,0.3-0.5,0.5-0.4c1.4,0.2,2.9-0.3,4.3-1.4c0.2-0.2,0.5-0.1,0.7,0.1c0.2,0.2,0.1,0.5-0.1,0.7 c-1.6,1.2-3.4,1.8-5,1.6c-0.1,0-0.1,0-0.2,0C51.8,85,51.7,84.8,51.7,84.6z M87.2,97.4c0.2-1.7,0.2-3.3,0.2-5 c0-0.3,0.2-0.5,0.5-0.5c0.3,0,0.5,0.2,0.5,0.5c0.1,1.7,0,3.4-0.2,5.1c0,0.3-0.3,0.5-0.5,0.4c-0.1,0-0.1,0-0.2,0 C87.3,97.8,87.1,97.6,87.2,97.4z M43.7,73.6c0.2-1.6,0.7-3.2,1.5-4.8l0.1-0.1c0.1-0.2,0.4-0.3,0.7-0.2c0,0,0,0,0,0 c0.2,0.1,0.3,0.4,0.2,0.7l-0.1,0.1c-0.7,1.5-1.2,3-1.4,4.5c0,0.3-0.3,0.5-0.6,0.4c-0.1,0-0.1,0-0.2,0 C43.8,74,43.7,73.8,43.7,73.6z M60,79.8c-0.2-0.1-0.3-0.5-0.1-0.7c0.4-0.6,0.8-1.3,1.1-2c0.4-0.8,0.7-1.6,1-2.4 c0.1-0.3,0.4-0.4,0.6-0.3c0.3,0.1,0.4,0.4,0.3,0.6c-0.3,0.9-0.7,1.7-1.1,2.5c-0.4,0.7-0.8,1.4-1.2,2.1C60.5,79.9,60.2,80,60,79.8 C60,79.9,60,79.8,60,79.8z M86.8,87.5c-0.3-1.6-0.7-3.2-1.2-4.8c-0.1-0.3,0.1-0.5,0.3-0.6c0.3-0.1,0.5,0.1,0.6,0.3 c0.5,1.6,1,3.3,1.2,4.9c0,0.3-0.1,0.5-0.4,0.6c-0.1,0-0.2,0-0.3,0C87,87.7,86.9,87.6,86.8,87.5z M48.2,65.1 c-0.2-0.2-0.2-0.5,0-0.7c1.2-1.3,2.5-2.4,3.9-3.4c0.2-0.1,0.5-0.1,0.7,0.1c0.1,0.2,0.1,0.5-0.1,0.7c-1.4,0.9-2.6,2-3.7,3.2 c-0.2,0.2-0.4,0.2-0.6,0.1C48.3,65.2,48.3,65.1,48.2,65.1z M63.3,70c0.3-1.6,0.5-3.3,0.5-4.9c0-0.3,0.2-0.5,0.5-0.5 c0.3,0,0.5,0.2,0.5,0.5c-0.1,1.7-0.2,3.4-0.5,5.1c0,0.3-0.3,0.4-0.6,0.4c0,0-0.1,0-0.1,0C63.3,70.4,63.2,70.2,63.3,70z M83.8,78 c-0.7-1.5-1.5-3-2.4-4.3c-0.1-0.2-0.1-0.5,0.1-0.7c0.2-0.1,0.5-0.1,0.7,0.2c0.9,1.4,1.7,2.9,2.5,4.4c0.1,0.2,0,0.5-0.2,0.7 c-0.1,0.1-0.3,0.1-0.4,0C83.9,78.2,83.8,78.1,83.8,78z M56.5,59.6c-0.1-0.3,0.1-0.5,0.4-0.6c1.7-0.4,3.4-0.5,5.2-0.3 c0.3,0,0.5,0.3,0.4,0.5c0,0.3-0.3,0.5-0.5,0.4c-1.7-0.2-3.3-0.1-4.8,0.3c-0.1,0-0.2,0-0.3,0C56.6,59.8,56.5,59.7,56.5,59.6z  M78.4,69.7c-1.1-1.3-2.2-2.5-3.4-3.6c-0.2-0.2-0.2-0.5,0-0.7c0.2-0.2,0.5-0.2,0.7,0c1.2,1.1,2.4,2.4,3.5,3.7 c0.2,0.2,0.1,0.5-0.1,0.7c-0.2,0.1-0.4,0.1-0.5,0.1C78.5,69.8,78.4,69.7,78.4,69.7z M63.6,60.1c-0.2-1.6-0.4-3.3-0.8-4.9 c-0.1-0.3,0.1-0.5,0.4-0.6c0.3-0.1,0.5,0.1,0.6,0.4c0.4,1.7,0.7,3.4,0.8,5c0,0.3-0.2,0.5-0.4,0.5c-0.1,0-0.2,0-0.3,0 C63.7,60.4,63.6,60.2,63.6,60.1z M71,63.1c-1.4-0.9-2.9-1.7-4.4-2.3c-0.3-0.1-0.4-0.4-0.3-0.6c0.1-0.3,0.4-0.4,0.6-0.3 c1.5,0.6,3.1,1.4,4.6,2.3c0.2,0.1,0.3,0.5,0.1,0.7C71.6,63.1,71.3,63.2,71,63.1C71.1,63.1,71.1,63.1,71,63.1z M61.3,50.4 c-0.6-1.5-1.3-3-2.1-4.5c-0.1-0.2-0.1-0.5,0.2-0.7c0.2-0.1,0.5-0.1,0.7,0.2c0.9,1.5,1.6,3.1,2.2,4.6c0.1,0.3,0,0.5-0.3,0.6 c-0.1,0.1-0.3,0-0.4,0C61.5,50.6,61.4,50.5,61.3,50.4z M56.5,41.8c-1-1.3-2.1-2.6-3.2-3.8c-0.2-0.2-0.2-0.5,0-0.7 c0.2-0.2,0.5-0.2,0.7,0c1.2,1.3,2.3,2.6,3.3,3.9c0.2,0.2,0.1,0.5-0.1,0.7c-0.2,0.1-0.4,0.1-0.5,0C56.6,41.9,56.5,41.8,56.5,41.8z  M49.7,34.5c-1.2-1.1-2.5-2.1-3.9-3.2c-0.2-0.2-0.3-0.5-0.1-0.7c0.2-0.2,0.5-0.3,0.7-0.1c1.4,1,2.7,2.1,3.9,3.2 c0.2,0.2,0.2,0.5,0,0.7c-0.2,0.2-0.4,0.2-0.6,0.1C49.7,34.6,49.7,34.5,49.7,34.5z M41.7,28.5c-1.4-0.9-2.8-1.8-4.3-2.6 c-0.2-0.1-0.3-0.4-0.2-0.7c0.1-0.2,0.4-0.3,0.7-0.2c1.5,0.8,2.9,1.7,4.3,2.6c0.2,0.1,0.3,0.5,0.1,0.7 C42.2,28.6,42,28.6,41.7,28.5C41.7,28.5,41.7,28.5,41.7,28.5z">
                        </path>
                        <path class="fill-white"
                          d="M30.7,22.6C30.7,22.6,30.7,22.6,30.7,22.6c0,0,0.9,0.4,2.3,1c0.2,0.1,0.5,0,0.7-0.2c0.1-0.2,0-0.5-0.2-0.7 c0,0,0,0,0,0c-1.4-0.7-2.2-1-2.3-1c-0.3-0.1-0.5,0-0.6,0.3C30.3,22.2,30.4,22.5,30.7,22.6z">
                        </path>
                        <path class="fill-warning"
                          d="M22.6,23.6l-1.1-4.1c0,0-11.7-7.5-11.9-7.6c-0.1-0.2-4.9-6.5-4.9-6.5l8.2,3.5l12.2,8.4L22.6,23.6z">
                        </path>
                        <polygon class="fill-warning opacity-6" points="31.2,12.3 4.7,5.4 25.1,17.2"></polygon>
                        <polygon class="fill-warning opacity-6" points="21.5,19.5 15,24.8 4.7,5.4 "></polygon>
                      </svg>
                    </figure>
                    <b-card-body>
                      <b-card-title tag="h5" class="text-white mb-2">Access 25K Online courses from 120 institutions,
                        Start today! </b-card-title>
                      <p class="text-white text-opacity-75">Here is the description of premium features which will allow
                        users to get benefits and save a lot of money</p>
                      <a href="#" class="btn btn-sm btn-dark mb-0">Purchase Premium</a>
                    </b-card-body>
                  </b-card>
                </b-col>
              </b-row>
            </div>
          </li>
          <MenuItem v-else :item="item" />
        </template>
        <li>
          <hr class="dropdown-divider">
        </li>
        <li>
          <a class="dropdown-item bg-primary text-primary bg-opacity-10 rounded-2 mb-0" href="#">
            View all categories
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script setup lang="ts">
import MenuItem from '@/components/navbar/AppMenu/AppMenuItem.vue';
import MenuItemWithChildren from '@/components/navbar/AppMenu/AppMenuItemWithChildren.vue';
import { CATEGORY_MENU_ITEMS } from '@/assets/data/menu-items';

import { faGoogle, faLinkedinIn, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faBasketballBall, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { BIconUiRadiosGrid, BIconGrid3x3GapFill } from 'bootstrap-icons-vue';

import pattern05 from '@/assets/images/pattern/05.png';
import unilogo01 from '@/assets/images/client/uni-logo-01.svg';
import unilogo02 from '@/assets/images/client/uni-logo-02.svg';
import unilogo03 from '@/assets/images/client/uni-logo-03.svg';
import unilogo04 from '@/assets/images/client/uni-logo-04.svg';

const course = ['Market Research', 'Advertising', 'Consumer Behavior', 'Digital Marketing', 'Marketing Ethics', 'Social Media Marketing', 'Public Relations', 'Advertising', 'Decision Science', 'SEO', 'Business Marketing'];

const degrees = [
  { logo: unilogo01, name: 'American Century University, New Mexico', degree: 'Bachelor of computer science' },
  { logo: unilogo02, name: 'Indiana College of - Bloomington', degree: 'Masters of computer science' },
  { logo: unilogo03, name: 'College of South Florida', degree: 'Medical science college' },
  { logo: unilogo01, name: 'Anderson Campus', degree: 'Bachelor of computer science' },
  { logo: unilogo04, name: 'University of South California', degree: 'Masters of business development' },
];

const certificates = [
  { title: 'Google SEO certificate', caption: 'No prerequisites', icon: faGoogle, iconClass: 'text-google-icon' },
  { title: 'Business Development Executive(BDE)', caption: 'No prerequisites', icon: faLinkedinIn, iconClass: 'text-linkedin' },
  { title: 'Facebook social media marketing', caption: 'Expert advice', icon: faFacebook, iconClass: 'text-facebook' },
  { title: 'Creative graphics design', caption: 'No prerequisites', icon: faBasketballBall, iconClass: 'text-dribbble' },
];

const getMenuItems = () => {
  // NOTE - You can fetch from server and return here as well
  return CATEGORY_MENU_ITEMS;
};

const menuItems = getMenuItems();

type AppMenuProps = {
  showIcon?: boolean;
  linkClass?: string;
  ulClass?: string;
};

defineProps<AppMenuProps>();
</script>