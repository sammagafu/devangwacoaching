<template>
  <b-accordion class="accordion-icon accordion-bg-light" id="accordionExample2">
    <template v-for="(module, idx) in course.modules" :key="idx">
      <b-accordion-item button-class="fw-bold rounded d-sm-flex d-inline-block" header-class="font-base" header-tag="h6"
        body-class="mt-3" class="mb-3" :visible="!idx">
        <template #title>
          {{ module.title || `Module ${idx + 1}` }}
          <span class="small ms-0 ms-sm-2">({{ module.lectures?.length || 0 }} Lectures)</span>
        </template>

        <template v-for="(lecture, ldx) in module.lectures || defaultLectures" :key="ldx">
          <div class="d-flex justify-content-between align-items-center">
            <div class="position-relative d-flex align-items-center" v-if="lecture.isPremium">
              <div>
                <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static"
                  data-bs-toggle="modal" data-bs-target="#exampleModal" @click="showModal = !showModal">
                  <font-awesome-icon :icon="faPlay" class="me-0" />
                </a>
              </div>
              <b-row class="g-sm-0 align-items-center">
                <b-col sm="6">
                  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-md-400px">
                    {{ lecture.title }}
                  </span>
                </b-col>
                <b-col sm="6">
                  <span class="badge text-bg-orange ms-2 ms-md-0">
                    <font-awesome-icon :icon="faLock" class="fa-fw me-1" />
                    Premium
                  </span>
                </b-col>
              </b-row>
            </div>

            <div class="position-relative d-flex align-items-center" v-else>
              <div>
                <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static"
                  data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <font-awesome-icon :icon="faPlay" class="me-0" />
                </a>
              </div>
              <b-row class="g-sm-0 align-items-center">
                <b-col sm="6">
                  <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-md-400px">
                    {{ lecture.title }}
                  </span>
                </b-col>
              </b-row>
            </div>
            <p class="mb-0 d-inline-block text-truncate w-70px w-sm-60px">{{ lecture.time || 'N/A' }}</p>
          </div>
          <hr v-if="!(module.lectures?.length === ldx + 1)">
        </template>
      </b-accordion-item>
    </template>
    <b-accordion-item v-if="!course.modules.length" button-class="fw-bold rounded d-sm-flex d-inline-block" header-class="font-base" header-tag="h6"
      body-class="mt-3" class="mb-3" visible>
      <template #title>
        No Modules Available
        <span class="small ms-0 ms-sm-2">(0 Lectures)</span>
      </template>
      There are currently no modules available for this course.
    </b-accordion-item>
  </b-accordion>

  <b-modal v-model="showModal" size="lg" body-class="p-0" header-class="border-0" hide-footer centered>
    <div class="px-5 pb-5 position-relative overflow-hidden">
      <figure class="position-absolute bottom-0 end-0 mb-n4 me-n4 d-none d-sm-block">
        <img :src="element01" alt="element">
      </figure>
      <h2>Get Premium Course in <span class="text-success">{{currency}}{{ course.final_price || course.price }}</span></h2>
      <p>Unlock all premium content and resources for this course.</p>
      <b-row class="mb-3 item-collapse">
        <b-col sm="6">
          <ul class="list-group list-group-borderless">
            <li class="list-group-item text-body">
              <BIconPatchCheckFill class="text-success" />High quality Curriculum
            </li>
            <li class="list-group-item text-body">
              <BIconPatchCheckFill class="text-success" />Tuition Assistance
            </li>
            <li class="list-group-item text-body">
              <BIconPatchCheckFill class="text-success" />Diploma course
            </li>
          </ul>
        </b-col>
        <b-col sm="6">
          <ul class="list-group list-group-borderless">
            <li class="list-group-item text-body">
              <BIconPatchCheckFill class="text-success" />Intermediate courses
            </li>
            <li class="list-group-item text-body">
              <BIconPatchCheckFill class="text-success" />Over 200 online courses
            </li>
          </ul>
        </b-col>
      </b-row>
      <a href="#" class="btn btn-lg btn-orange-soft">Purchase premium</a>
    </div>
    <div class="modal-footer d-block bg-info">
      <div class="d-sm-flex justify-content-sm-between align-items-center text-center text-sm-start">
        <ul class="list-inline mb-0 social-media-btn mb-2 mb-sm-0">
          <li class="list-inline-item" v-for="(link, idx) in socialLink" :key="idx">
            <a :class="`btn btn-sm mb-0 me-1 bg-white ${link.class}`" href="#">
              <font-awesome-icon :icon="link.icon" class="fa-fw" />
            </a>
          </li>
        </ul>
        <div>
          <p class="mb-1 small">
            <a href="#" class="text-white">
              <font-awesome-icon :icon="faEnvelope" class="fa-fw me-2" />
              {{ course.instructor?.email || 'example@gmail.com' }}
            </a>
          </p>
          <p class="mb-0 small">
            <a href="#" class="text-white">
              <font-awesome-icon :icon="faHeadset" class="fa-fw me-2" />
              123-456-789
            </a>
          </p>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { faPlay, faLock, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { BIconPatchCheckFill } from 'bootstrap-icons-vue';
import { currency } from '@/helpers/constants';
import element01 from '@/assets/images/element/01.svg';
import avatar01 from '@/assets/images/avatar/01.jpg';

const defaultAvatar = avatar01;
const showModal = ref(false);

defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const socialLink = [
  { icon: faFacebookF, class: 'text-facebook' },
  { icon: faInstagram, class: 'text-instagram' },
  { icon: faTwitter, class: 'text-twitter' },
  { icon: faLinkedinIn, class: 'text-linkedin' },
];

const defaultLectures = [
  { title: 'Introduction', time: '10m', isPremium: false },
  { title: 'Advanced Concepts', time: '15m', isPremium: true },
];
</script>