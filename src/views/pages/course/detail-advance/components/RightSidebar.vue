<template>
  <b-col xl="4">
    <CustomStickyElement data-sticky data-margin-top="80" data-sticky-for="768">
      <b-row class="g-4">
        <b-col md="6" xl="12">
          <b-card no-body class="card-body border p-4">
            <div class="d-flex justify-content-between align-items-center">
              <h3 class="fw-bold mb-0 me-2">{{ currency }}{{ price }}</h3>
              <b-dropdown end variant="link" toggle-class="btn btn-sm btn-light rounded mb-0 small"
                menu-class="dropdown-w-sm dropdown-menu-end shadow rounded" no-caret>
                <template #button-content>
                  <font-awesome-icon :icon="faShareAlt" class="fa-fw" />
                </template>
                <b-dropdown-item href="#">
                  <font-awesome-icon :icon="faTwitterSquare" class="me-2" />
                  Twitter
                </b-dropdown-item>
                <b-dropdown-item href="#">
                  <font-awesome-icon :icon="faFacebookSquare" class="me-2" />
                  Facebook
                </b-dropdown-item>
                <b-dropdown-item href="#">
                  <font-awesome-icon :icon="faLinkedinIn" class="me-2" />
                  LinkedIn
                </b-dropdown-item>
                <b-dropdown-item href="#">
                  <font-awesome-icon :icon="faCopy" class="me-2" />
                  Copy link
                </b-dropdown-item>
              </b-dropdown>
            </div>

            <div class="mt-3 d-grid">
              <a href="#" class="btn btn-outline-primary">Add to cart</a>
              <a href="#" class="btn btn-success">Buy now</a>
            </div>
            <hr>

            <h5 class="mb-3">This course includes</h5>
            <ul class="list-group list-group-borderless border-0">
              <li class="list-group-item px-0 d-flex justify-content-between">
                <span class="h6 fw-light mb-0">
                  <font-awesome-icon :icon="faBookOpen" class="fa-fw text-primary" />
                  Lectures
                </span>
                <span>{{ lecturesCount }}</span>
              </li>
              <li class="list-group-item px-0 d-flex justify-content-between">
                <span class="h6 fw-light mb-0">
                  <font-awesome-icon :icon="faClock" class="fa-fw text-primary" />
                  Duration
                </span>
                <span>{{ duration }}</span>
              </li>
              <li class="list-group-item px-0 d-flex justify-content-between">
                <span class="h6 fw-light mb-0">
                  <font-awesome-icon :icon="faSignal" class="fa-fw text-primary" />
                  Skills
                </span>
                <span>{{ level }}</span>
              </li>
              <li class="list-group-item px-0 d-flex justify-content-between">
                <span class="h6 fw-light mb-0">
                  <font-awesome-icon :icon="faGlobe" class="fa-fw text-primary" />
                  Language
                </span>
                <span>{{ language }}</span>
              </li>
              <li class="list-group-item px-0 d-flex justify-content-between">
                <span class="h6 fw-light mb-0">
                  <font-awesome-icon :icon="faUserClock" class="fa-fw text-primary" />
                  Deadline
                </span>
                <span>{{ deadline }}</span>
              </li>
              <li class="list-group-item px-0 d-flex justify-content-between">
                <span class="h6 fw-light mb-0">
                  <font-awesome-icon :icon="faMedal" class="fa-fw text-primary" />
                  Certificate
                </span>
                <span>{{ hasCertificate ? 'Yes' : 'No' }}</span>
              </li>
            </ul>
            <hr>

            <div class="d-sm-flex align-items-center">
              <div class="avatar avatar-xl">
                <img class="avatar-img rounded-circle" :src="instructor.avatar" :alt="instructor.name">
              </div>
              <div class="ms-sm-3 mt-2 mt-sm-0">
                <h5 class="mb-0"><a href="#">{{ instructor.name }}</a></h5>
                <p class="mb-0 small">{{ instructor.title }}</p>
              </div>
            </div>

            <div class="d-sm-flex justify-content-sm-between align-items-center mt-0 mt-sm-2">
              <ul class="list-inline mb-0 hstack gap-1">
                <li class="list-inline-item me-0 small" v-for="star in 5" :key="star">
                  <font-awesome-icon 
                    :icon="getStarIcon(star, rating)" 
                    class="text-warning" 
                  />
                </li>
                <li class="list-inline-item ms-2 h6 fw-light mb-0">{{ rating }}/5.0</li>
              </ul>

              <b-button variant="primary" size="sm" class="mb-0 mt-2 mt-sm-0">Follow</b-button>
            </div>
          </b-card>
        </b-col>

        <b-col md="6" xl="12">
          <b-card no-body class="card-body border p-4">
            <h4 class="mb-3">Popular Tags</h4>
            <ul class="list-inline mb-0">
              <li class="list-inline-item" v-for="(tag, index) in tags" :key="index">
                <a class="btn btn-outline-light btn-sm" href="#">{{ tag }}</a>
              </li>
            </ul>
          </b-card>
        </b-col>
      </b-row>
    </CustomStickyElement>
  </b-col>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { currency } from '@/helpers/constants';
import CustomStickyElement from '@/components/CustomStickyElement.vue';
import { faShareAlt, faCopy, faBookOpen, faClock, faSignal, faGlobe, faUserClock, faMedal, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitterSquare, faFacebookSquare, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const props = defineProps({
  price: {
    type: Number,
    required: true
  },
  lecturesCount: {
    type: Number,
    default: 0
  },
  duration: {
    type: String,
    default: '0h 0m'
  },
  level: {
    type: String,
    default: 'Beginner'
  },
  language: {
    type: String,
    default: 'English'
  },
  deadline: {
    type: String,
    default: ''
  },
  hasCertificate: {
    type: Boolean,
    default: false
  },
  instructor: {
    type: Object,
    default: () => ({
      name: 'Instructor Name',
      title: 'Instructor Title',
      avatar: ''
    })
  },
  rating: {
    type: Number,
    default: 0
  },
  tags: {
    type: Array,
    default: () => []
  }
});

const getStarIcon = (starIndex: number, rating: number) => {
  if (starIndex <= Math.floor(rating)) return faStar;
  if (starIndex - 0.5 <= rating) return faStarHalfAlt;
  return faStar;
};
</script>