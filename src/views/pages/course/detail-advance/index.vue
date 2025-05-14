<template>
  <PagesLayout>
    <section class="pt-3 pt-xl-5">
      <b-container data-sticky-container>
        <b-row class="g-4">
          <b-col xl="8">
            <b-row class="g-4">
              <template v-if="course">
                <b-col cols="12">
                  <h2>{{ course.title }}</h2>
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item fw-light h6 me-3 mb-1 mb-sm-0">
                      <font-awesome-icon :icon="faStar" class="me-1" />
                      4.5/5.0
                    </li>
                    <li class="list-inline-item fw-light h6 me-3 mb-1 mb-sm-0">
                      <font-awesome-icon :icon="faUserGraduate" class="me-1" />
                      {{ course.total_videos || 0 }} Videos
                    </li>
                    <li class="list-inline-item fw-light h6 me-3 mb-1 mb-sm-0">
                      <font-awesome-icon :icon="faSignal" class="me-1" />
                      All levels
                    </li>
                    <li class="list-inline-item fw-light h6 me-3 mb-1 mb-sm-0">
                      <BIconPatchExclamationFill class="me-1" />Last updated {{ formatDate(course.updated_at) }}
                    </li>
                    <li class="list-inline-item fw-light h6">
                      <font-awesome-icon :icon="faGlobe" class="me-1" />
                      English
                    </li>
                  </ul>
                </b-col>
                <b-col cols="12" class="position-relative">
                  <div class="video-player rounded-3">
                    <video ref="player" controls crossorigin="anonymous" playsinline :poster="course.cover || poster">
                      <source v-if="course.modules[0]?.videos[0]?.video_url" :src="course.modules[0].videos[0].video_url" size="360" />
                      <source :src="videos720p" size="720" />
                      <source :src="videos1080p" size="1080" />
                      <track kind="captions" label="English" srcLang="en" :src="videosen" default />
                      <track kind="captions" label="French" srcLang="fr" :src="videosfr" />
                    </video>
                  </div>
                </b-col>
                <Description 
                  :description="course.description" 
                  :modules="course.modules"
                />
                <Curriculum :modules="course.modules" />
                <FAQs :faqs="course.faqs" />
              </template>
              <template v-else>
                <b-col cols="12" class="text-center py-5">
                  <b-spinner variant="primary" label="Loading..."></b-spinner>
                  <p class="mt-3">Loading course details...</p>
                </b-col>
              </template>
            </b-row>
          </b-col>
          <RightSidebar 
            v-if="course"
            :price="parseFloat(course.price)"
            :lectures-count="course.total_videos"
            :duration="'4h 50m'"
            :level="'All levels'"
            :language="'English'"
            :deadline="course.discount_deadline"
            :has-certificate="true"
            :instructor="course.instructor"
            :rating="4.5"
            :tags="course.tags"
          />
        </b-row>
      </b-container>
    </section>
  </PagesLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Plyr from 'plyr';
import { formatDate } from '@/helpers/utils';

import { faStar, faUserGraduate, faSignal, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { BIconPatchExclamationFill } from 'bootstrap-icons-vue';

import FAQs from '@/views/pages/course/detail-advance/components/FAQs.vue';
import Curriculum from '@/views/pages/course/detail-advance/components/Curriculum.vue';
import Description from '@/views/pages/course/detail-advance/components/Description.vue';
import RightSidebar from '@/views/pages/course/detail-advance/components/RightSidebar.vue';

import videosen from '@/assets/images/videos/en.vtt';
import videosfr from '@/assets/images/videos/fr.vtt';
import videos720p from '@/assets/images/videos/720p.mp4';
import videos1080p from '@/assets/images/videos/1080p.mp4';
import poster from '@/assets/images/videos/poster.jpg';
import { api } from '@/services/authService';
import { useToast } from 'vue-toast-notification';

const $toast = useToast();
const route = useRoute();
const router = useRouter();
const player = ref(null);
const course = ref<any>(null);
const loading = ref(false);

const fetchCourse = async () => {
  try {
    loading.value = true;
    const slug = route.params.slug;
    const response = await api.get(`course/courses/${slug}/`);
    course.value = response.data;
    
    if (player.value && course.value.modules[0]?.videos[0]?.video_url) {
      new Plyr(player.value);
    }
  } catch (error) {
    console.error('Failed to fetch course:', error);
    $toast.error('Failed to fetch course: ' + (error.response?.data?.message || 'Course not found'));
    await router.push({ name: 'admin.courses-list' });
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCourse);
</script>