<template>
    <AdminLayout>
      <section class="pt-0">
        <b-container>
          <b-row class="g-4 g-lg-5">
            <b-col lg="8" class="order-2">
              <div class="bg-light rounded-3 p-3 mb-4">
                <b-row class="g-4">
                  <b-col md="4">
                    <h6 class="small">Organized by:</h6>
                    <div class="d-flex align-items-center">
                      <div class="avatar align-middle">
                        <div class="avatar-img rounded-1 bg-danger">
                          <span class="text-white position-absolute top-50 start-50 translate-middle fw-bold">
                            {{ organizerInitials }}
                          </span>
                        </div>
                      </div>
                      <div class="ms-2">
                        <h6 class="mb-0">{{ event?.created_by?.full_name || event?.created_by?.email }}</h6>
                        <small>{{ event?.created_by?.followers || 'N/A' }} followers</small>
                      </div>
                    </div>
                  </b-col>
  
                  <b-col md="4">
                    <h6 class="small">Location:</h6>
                    <div class="d-flex align-items-center">
                      <div class="avatar align-middle flex-shrink-0">
                        <div class="avatar-img rounded-2 bg-dark">
                          <span class="position-absolute top-50 start-50 translate-middle text-white flex-centered">
                            <BIconGeoAltFill />
                          </span>
                        </div>
                      </div>
                      <h6 class="fw-normal mb-0 ms-2">{{ event?.location || 'Online' }}</h6>
                    </div>
                  </b-col>
  
                  <b-col md="4">
                    <h6 class="small">Date & Time:</h6>
                    <div class="d-flex align-items-center">
                      <div class="avatar align-middle flex-shrink-0">
                        <div class="avatar-img rounded-2 bg-dark">
                          <span class="position-absolute top-50 start-50 translate-middle text-white flex-centered">
                            <BIconCalendarFill />
                          </span>
                        </div>
                      </div>
                      <div class="ms-2">
                        <h6 class="fw-normal mb-0">{{ formatDate(event?.start_time) }}</h6>
                        <small>{{ formatTimeRange(event?.start_time, event?.end_time) }}</small>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </div>
  
              <h4>About this event</h4>
              <p>{{ event?.description || 'No description available.' }}</p>
  
              <h4 class="mt-4 mb-0">Speakers</h4>
              <p v-if="event?.speakers?.length">{{ event.speakers.length }} key speakers for the event.</p>
              <p v-else>No speakers listed for this event.</p>
              <b-row class="g-4" v-if="event?.speakers?.length">
                <b-col sm="6" v-for="(speaker, idx) in event.speakers" :key="idx">
                  <b-card no-body class="card-body border">
                    <div class="d-xl-flex justify-content-between align-items-center">
                      <div class="hstack gap-2 mb-2 mb-xl-0">
                        <div class="avatar flex-shrink-0">
                          <img
                            class="avatar-img rounded-circle"
                            :src="speaker.avatar || defaultAvatar"
                            alt="avatar"
                          />
                        </div>
                        <div>
                          <b-card-title tag="h6" class="mb-0"><a href="#">{{ speaker.name }}</a></b-card-title>
                          <small>{{ speaker.followers }} followers</small>
                        </div>
                      </div>
                      <b-button size="sm" variant="dark" class="mb-0">Know more</b-button>
                    </div>
                  </b-card>
                </b-col>
              </b-row>
  
              <div v-if="event?.schedules?.length" class="mt-5">
                <h4 class="mb-0">Event Schedule</h4>
                <p>{{ event.schedules.length }} scheduled sessions for the event.</p>
                <b-accordion class="accordion-icon accordion-active-dark">
                  <b-accordion-item
                    v-for="(day, idx) in event.schedules"
                    :key="idx"
                    button-class="fw-bold rounded pe-5"
                    header-class="font-base"
                    header-tag="h6"
                    body-class="p-0"
                    class="mb-3"
                    :visible="!idx"
                  >
                    <template #title>
                      Day-{{ idx + 1 }}
                      <span class="fw-normal ms-0 ms-sm-2">({{ formatDate(day.day) }})</span>
                    </template>
                    <template v-for="(session, sIdx) in day.events" :key="sIdx">
                      <hr class="my-0" v-if="sIdx" />
                      <div class="d-flex align-items-center p-3" v-if="session.speakers?.length">
                        <div class="avatar avatar-sm flex-shrink-0">
                          <img
                            class="avatar-img rounded-circle"
                            :src="session.speakers[0]?.avatar || defaultAvatar"
                            alt="avatar"
                          />
                        </div>
                        <div class="ms-2">
                          <h6 class="mb-0 fw-normal">
                            <a href="#">{{ session.title }}<span> ({{ session.time }})</span></a>
                          </h6>
                          <p class="small mb-0">
                            by
                            <template v-for="(speaker, spIdx) in session.speakers" :key="spIdx">
                              {{ spIdx ? ' and' : '' }}
                              <a href="#" class="fw-bold text-body text-primary-hover">
                                {{ speaker.name }}
                              </a>
                            </template>
                          </p>
                        </div>
                      </div>
                      <div class="text-center p-3" v-else>
                        <h6 class="mb-0 fw-normal">
                          <BIconClock />
                          {{ session.title }}
                          <span>({{ session.time }})</span>
                        </h6>
                      </div>
                    </template>
                  </b-accordion-item>
                </b-accordion>
              </div>
  
              <b-card no-body class="card-body bg-light p-4 mt-5">
                <b-row class="g-2">
                  <b-col sm="4">
                    <div class="d-flex">
                      <BIconGlobe class="fs-4" />
                      <div class="ms-3">
                        <h5 class="mb-0">{{ event?.visitors || 'N/A' }}</h5>
                        <p class="mb-0">Visitors</p>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="4">
                    <div class="d-flex">
                      <BIconPersonPlus class="fs-4" />
                      <div class="ms-3">
                        <h5 class="mb-0">{{ event?.registered || 'N/A' }}</h5>
                        <p class="mb-0">Registered</p>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="4">
                    <div class="d-flex">
                      <BIconPeople class="fs-4" />
                      <div class="ms-3">
                        <h5 class="mb-0">{{ event?.attendance || 'N/A' }}</h5>
                        <p class="mb-0">Attendance</p>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
  
            <b-col lg="4" class="order-1 order-lg-2">
              <b-card no-body class="card-body shadow">
                <b-button class="btn btn-primary w-100 mb-2" @click="buyTicket">Buy Ticket</b-button>
                <a
                  v-if="event?.google_calendar_url"
                  :href="event.google_calendar_url"
                  target="_blank"
                  class="btn btn-secondary w-100"
                >
                  Add to Google Calendar
                </a>
                <div class="mt-4">
                  <ul class="list-unstyled mb-4">
                    <li class="d-flex justify-content-between mb-3">
                      <span class="w-150px">Ticket Price:</span>
                      <h6 class="text-end mb-0">{{ currency }}{{ event?.final_price }}</h6>
                    </li>
                    <li class="d-flex justify-content-between mb-3">
                      <span class="w-150px">Entry Fees:</span>
                      <h6 class="text-end mb-0">{{ currency }}1 per ticket</h6>
                    </li>
                    <li class="d-flex justify-content-between mb-3">
                      <span class="w-150px">Address:</span>
                      <h6 class="text-end mb-0">{{ event?.location || 'Online' }}</h6>
                    </li>
                  </ul>
                  <iframe
                    class="w-100 d-block rounded-bottom"
                    height="230"
                    :src="mapUrl"
                    style="border:0;"
                    aria-hidden="false"
                    tabindex="0"
                  ></iframe>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </section>
    </AdminLayout>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useToast } from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-sugar.css';
  import { api } from '@/services/authService';
  import AdminLayout from '@/layouts/AdminLayout.vue';
  import { currency } from '@/helpers/constants';
  import { BIconGeoAltFill, BIconCalendarFill, BIconClock, BIconGlobe, BIconPersonPlus, BIconPeople } from 'bootstrap-icons-vue';
  
  const defaultAvatar = 'https://via.placeholder.com/40'; // Fallback avatar
  
  const $toast = useToast();
  const route = useRoute();
  const router = useRouter();
  const event = ref(null);
  
  onMounted(async () => {
    try {
      const response = await api.get(`/coaching/events/${route.params.slug}/`);
      event.value = response.data;
      $toast.success('Event details loaded successfully!');
    } catch (error) {
      console.error('Failed to fetch event:', error);
      $toast.error('Failed to fetch event details');
    }
  });
  
  const organizerInitials = computed(() => {
    const name = event.value?.created_by?.full_name || event.value?.created_by?.email || '';
    return name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
  });
  
  const mapUrl = computed(() => {
    const location = encodeURIComponent(event.value?.location || 'Chicago, IL');
    return `https://www.google.com/maps/embed/v1/place?q=${location}&key=YOUR_GOOGLE_MAPS_API_KEY`;
  });
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const formatTimeRange = (start, end) => {
    if (!start || !end) return 'N/A';
    const startTime = new Date(start).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const endTime = new Date(end).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return `${startTime} to ${endTime}`;
  };
  
  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
  };
  
  const buyTicket = async () => {
    if (!event.value) {
      $toast.error('Event not loaded');
      return;
    }
  
    try {
      await api.post(`/coaching/events/${event.value.slug}/attend/`);
      $toast.success('Successfully joined the event!');
  
      const paymentData = {
        event: event.value.id,
        amount: parseFloat(event.value.final_price) + 1, // Ticket price + entry fee
      };
      await api.post('/coaching/payments/', paymentData);
      $toast.success('Payment recorded successfully!');
    } catch (error) {
      console.error('Error processing ticket purchase:', error);
      $toast.error('Failed to process ticket purchase');
    }
  };
  </script>