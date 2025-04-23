<template>
  <main>
    <section class="py-0 bg-blue h-100px align-items-center d-flex h-200px rounded-0"
      :style="`background:url(${pattern04}) no-repeat center center; background-size:cover;`">
      <b-container>
        <b-row>
          <b-col cols="12" class="text-center">
            <h1 class="text-white">Events Management</h1>
            <p class="text-white mb-0">Admin interface for events, participants, and payments</p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section>
        <b-row class="g-4 mb-4">
          <b-col sm="6" lg="4">
            <div class="text-center p-4 bg-primary bg-opacity-10 border border-primary rounded-3">
              <h6>Total Events</h6>
              <h2 class="mb-0 fs-1 text-primary">{{ events.length }}</h2>
            </div>
          </b-col>
          <b-col sm="6" lg="4">
            <div class="text-center p-4 bg-success bg-opacity-10 border border-success rounded-3">
              <h6>Active Events</h6>
              <h2 class="mb-0 fs-1 text-success">{{ activeEventsCount }}</h2>
            </div>
          </b-col>
          <b-col sm="6" lg="4">
            <div class="text-center p-4 bg-warning bg-opacity-15 border border-warning rounded-3">
              <h6>Past Events</h6>
              <h2 class="mb-0 fs-1 text-warning">{{ pastEventsCount }}</h2>
            </div>
          </b-col>
        </b-row>

        <b-card no-body class="bg-transparent border">
          <b-card-header class="bg-light border-bottom">
            <b-row class="g-3 align-items-center justify-content-between">
              <b-col md="8">
                <b-form class="rounded position-relative" @submit.prevent="filterItems">
                  <b-form-input
                    class="bg-body"
                    type="search"
                    placeholder="Search by title or email"
                    v-model="searchQuery"
                    @input="filterItems"
                  />
                  <button
                    class="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset"
                    type="submit"
                  >
                    <font-awesome-icon :icon="faSearch" class="fs-6" />
                  </button>
                </b-form>
              </b-col>
              <b-col md="3">
                <b-form>
                  <ChoicesSelect id="sort" class="border-0 z-index-9" v-model="sortOption" @update:modelValue="sortItems">
                    <option value="">Sort by</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="active">Active</option>
                    <option value="past">Past</option>
                  </ChoicesSelect>
                </b-form>
              </b-col>
            </b-row>
          </b-card-header>

          <b-card-body>
            <ul class="nav nav-tabs nav-tabs-dark mb-3" role="tablist">
              <li class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'events' }" @click="activeTab = 'events'" href="#events-tab" data-bs-toggle="tab">Events</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'participants' }" @click="activeTab = 'participants'" href="#participants-tab" data-bs-toggle="tab">Participants</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'payments' }" @click="activeTab = 'payments'" href="#payments-tab" data-bs-toggle="tab">Payments</a>
              </li>
            </ul>

            <div class="tab-content">
              <div class="tab-pane fade" :class="{ 'show active': activeTab === 'events' }" id="events-tab">
                <div class="table-responsive border-0 rounded-3 mb-0">
                  <table class="table table-dark-gray align-middle p-4 mb-0 table-hover">
                    <thead>
                      <tr>
                        <th scope="col" class="border-0 rounded-start">Event Name</th>
                        <th scope="col" class="border-0">Created By</th>
                        <th scope="col" class="border-0">Start Date</th>
                        <th scope="col" class="border-0">Type</th>
                        <th scope="col" class="border-0">Price (TZS)</th>
                        <th scope="col" class="border-0">Status</th>
                        <th scope="col" class="border-0 rounded-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, idx) in paginatedItems" :key="idx">
                        <td>
                          <div class="d-flex align-items-center position-relative">
                            <div class="w-60px">
                              <img :src="item.cover" class="rounded" alt="" />
                            </div>
                            <h6 class="table-responsive-title mb-0 ms-2">
                              <router-link :to="{ name: 'admin.manage.event-details', params: { slug: item.slug } }" class="stretched-link">{{ item.title }}</router-link>
                              
                            </h6>
                          </div>
                        </td>
                        <td>{{ item.created_by?.full_name || item.created_by?.email }}</td>
                        <td>{{ formatDate(item.start_time) }}</td>
                        <td>
                          <span class="badge text-bg-primary">
                            {{ item.event_type === 'online' ? 'Online' : 'On Premises' }}
                          </span>
                        </td>
                        <td>{{ currency }}{{ item.final_price }}</td>
                        <td>
                          <span class="badge bg-opacity-15"
                            :class="isActive(item) ? 'bg-success text-success' : 'bg-secondary text-secondary'">
                            {{ isActive(item) ? 'Active' : 'Past' }}
                          </span>
                        </td>
                        <td>
                          <router-link
                            :to="{ name: 'admin.manage.event-details', params: { slug: item.slug } }"
                            class="btn btn-sm btn-info me-1 mb-1 mb-md-0"
                          >
                            Detail
                          </router-link>
                          <a href="#" class="btn btn-sm btn-dark me-1 mb-1 mb-md-0" @click="editEvent(item)">Edit</a>
                          <button class="btn btn-sm btn-danger-soft mb-0" @click="deleteEvent(item.slug)">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" :class="{ 'show active': activeTab === 'participants' }" id="participants-tab">
                <div class="table-responsive border-0 rounded-3 mb-0">
                  <table class="table table-dark-gray align-middle p-4 mb-0 table-hover">
                    <thead>
                      <tr>
                        <th scope="col" class="border-0 rounded-start">User</th>
                        <th scope="col" class="border-0">Event</th>
                        <th scope="col" class="border-0">Joined At</th>
                        <th scope="col" class="border-0 rounded-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, idx) in paginatedItems" :key="idx">
                        <td>
                          <div class="d-flex align-items-center position-relative">
                            <div class="mb-0 ms-3">
                              <h6 class="mb-0"><a href="#" class="stretched-link">{{ item.user?.full_name || item.user?.email }}</a></h6>
                              <span class="text-body small">{{ item.user?.email }}</span>
                            </div>
                          </div>
                        </td>
                        <td>{{ item.event?.title }}</td>
                        <td>{{ formatDate(item.joined_at) }}</td>
                        <td>
                          <button class="btn btn-sm btn-danger-soft mb-0" @click="deleteParticipant(item.id)">Remove</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" :class="{ 'show active': activeTab === 'payments' }" id="payments-tab">
                <div class="table-responsive border-0 rounded-3 mb-0">
                  <table class="table table-dark-gray align-middle p-4 mb-0 table-hover">
                    <thead>
                      <tr>
                        <th scope="col" class="border-0 rounded-start">User</th>
                        <th scope="col" class="border-0">Event</th>
                        <th scope="col" class="border-0">Amount (TZS)</th>
                        <th scope="col" class="border-0">Payment Date</th>
                        <th scope="col" class="border-0 rounded-end">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, idx) in paginatedItems" :key="idx">
                        <td>
                          <div class="d-flex align-items-center position-relative">
                            <div class="mb-0 ms-3">
                              <h6 class="mb-0"><a href="#" class="stretched-link">{{ item.user?.full_name || item.user?.email }}</a></h6>
                              <span class="text-body small">{{ item.user?.email }}</span>
                            </div>
                          </div>
                        </td>
                        <td>{{ item.event?.title }}</td>
                        <td>{{ currency }}{{ item.amount }}</td>
                        <td>{{ formatDate(item.payment_date) }}</td>
                        <td>
                          <span :class="item.is_successful ? 'text-success' : 'text-danger'">
                            {{ item.is_successful ? 'Successful' : 'Failed' }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </b-card-body>

          <b-card-footer class="bg-transparent pt-0">
            <div class="d-sm-flex justify-content-sm-between align-items-sm-center">
              <p class="mb-0 text-center text-sm-start">
                Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
                {{ Math.min(currentPage * itemsPerPage, filteredItems.length) }} of {{ filteredItems.length }} entries
              </p>
              <nav class="d-flex justify-content-center mb-0" aria-label="navigation">
                <ul class="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                  <li class="page-item mb-0" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="currentPage--"><font-awesome-icon :icon="faAngleLeft" /></a>
                  </li>
                  <li
                    class="page-item mb-0"
                    v-for="page in totalPages"
                    :key="page"
                    :class="{ active: page === currentPage }"
                  >
                    <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                  </li>
                  <li class="page-item mb-0" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="currentPage++"><font-awesome-icon :icon="faAngleRight" /></a>
                  </li>
                </ul>
              </nav>
            </div>
          </b-card-footer>
        </b-card>

        <!-- Event Form Modal -->
        <b-modal
          v-model="showEventForm"
          :title="editingEvent ? 'Edit Event' : 'Create Event'"
          header-class="bg-dark"
          title-class="text-white"
          ok-title="Save"
          ok-variant="success"
          cancel-title="Cancel"
          cancel-variant="danger-soft"
          @ok="saveEvent"
          size="lg"
        >
          <b-form class="row g-3">
            <b-col md="6">
              <b-form-group label="Title *">
                <b-form-input v-model="eventForm.title" :class="{ 'is-invalid': errors.title }" />
                <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Event Type *">
                <ChoicesSelect
                  id="event-type"
                  v-model="eventForm.event_type"
                  :class="{ 'is-invalid': errors.event_type }"
                >
                  <option value="">Select type</option>
                  <option value="online">Online</option>
                  <option value="on_premises">On Premises</option>
                </ChoicesSelect>
                <div v-if="errors.event_type" class="invalid-feedback">{{ errors.event_type }}</div>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Description *">
                <b-form-textarea v-model="eventForm.description" rows="4" :class="{ 'is-invalid': errors.description }" />
                <div v-if="errors.description" class="invalid-feedback">{{ errors.description }}</div>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Start Time *">
                <b-form-input type="datetime-local" v-model="eventForm.start_time" :class="{ 'is-invalid': errors.start_time }" />
                <div v-if="errors.start_time" class="invalid-feedback">{{ errors.start_time }}</div>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="End Time *">
                <b-form-input type="datetime-local" v-model="eventForm.end_time" :class="{ 'is-invalid': errors.end_time }" />
                <div v-if="errors.end_time" class="invalid-feedback">{{ errors.end_time }}</div>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Registration Deadline *">
                <b-form-input type="datetime-local" v-model="eventForm.registration_deadline" :class="{ 'is-invalid': errors.registration_deadline }" />
                <div v-if="errors.registration_deadline" class="invalid-feedback">{{ errors.registration_deadline }}</div>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Discount Deadline">
                <b-form-input type="datetime-local" v-model="eventForm.discount_deadline" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Location">
                <b-form-input v-model="eventForm.location" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Price (TZS) *">
                <b-form-input type="number" v-model="eventForm.price" :class="{ 'is-invalid': errors.price }" />
                <div v-if="errors.price" class="invalid-feedback">{{ errors.price }}</div>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Discount Percentage (%)">
                <b-form-input type="number" v-model="eventForm.discount_percentage" min="0" max="100" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Cover Image *">
                <input
                  type="file"
                  ref="fileInput"
                  accept="image/gif, image/jpeg, image/png"
                  @change="onUpload"
                  :class="{ 'is-invalid': errors.cover }"
                />
                <div v-if="eventForm.cover" class="mt-2">Selected: {{ eventForm.cover.name }}</div>
                <div v-if="errors.cover" class="invalid-feedback">{{ errors.cover }}</div>
              </b-form-group>
            </b-col>
          </b-form>
        </b-modal>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useRouter } from 'vue-router';
import { api } from '@/services/authService';
import TopBar8 from '@/views/admin/courses/create-course/components/TopBar8.vue';
import Footer7 from '@/views/admin/courses/create-course/components/Footer7.vue';
import ChoicesSelect from '@/components/ChoicesSelect.vue';
import { faSearch, faAngleLeft, faAngleRight, faCalendar, faUsers, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { currency } from '@/helpers/constants';
import pattern04 from '@/assets/images/pattern/04.png';

const $toast = useToast();
const router = useRouter();
const activeTab = ref('events');
const searchQuery = ref('');
const sortOption = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(8);
const events = ref([]);
const participants = ref([]);
const payments = ref([]);
const showEventForm = ref(false);
const editingEvent = ref(null);
const eventForm = ref({
  title: '',
  description: '',
  event_type: '',
  start_time: '',
  end_time: '',
  location: '',
  price: null,
  discount_percentage: 0,
  registration_deadline: '',
  discount_deadline: '',
  cover: null,
});
const errors = ref({
  title: '',
  description: '',
  event_type: '',
  start_time: '',
  end_time: '',
  registration_deadline: '',
  price: '',
  cover: '',
});

onMounted(() => {
  fetchEvents();
  fetchParticipants();
  fetchPayments();
});

const fetchEvents = async () => {
  try {
    const response = await api.get('/coaching/events/');
    events.value = response.data;
    // $toast.success('Events loaded successfully!');
  } catch (error) {
    console.error('Failed to fetch events:', error);
    $toast.error('Failed to fetch events');
  }
};

const fetchParticipants = async () => {
  try {
    const response = await api.get('/coaching/participants/');
    participants.value = response.data;
    // $toast.success('Participants loaded successfully!');
  } catch (error) {
    console.error('Failed to fetch participants:', error);
    $toast.error('Failed to fetch participants');
  }
};

const fetchPayments = async () => {
  try {
    const response = await api.get('/coaching/payments/');
    payments.value = response.data;
    // $toast.success('Payments loaded successfully!');
  } catch (error) {
    console.error('Failed to fetch payments:', error);
    $toast.error('Failed to fetch payments');
  }
};

const activeEventsCount = computed(() => {
  return events.value.filter(event => isActive(event)).length;
});

const pastEventsCount = computed(() => {
  return events.value.filter(event => !isActive(event)).length;
});

const isActive = (event) => {
  return new Date(event.end_time) > new Date();
};

const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let items = [];
  if (activeTab.value === 'events') {
    items = events.value.filter(event => event.title.toLowerCase().includes(query));
  } else if (activeTab.value === 'participants') {
    items = participants.value.filter(
      participant => participant.user?.full_name?.toLowerCase().includes(query) || participant.user?.email.toLowerCase().includes(query)
    );
  } else {
    items = payments.value.filter(
      payment => payment.user?.full_name?.toLowerCase().includes(query) || payment.event?.title.toLowerCase().includes(query)
    );
  }

  if (sortOption.value) {
    if (activeTab.value === 'events') {
      if (sortOption.value === 'newest') {
        items.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
      } else if (sortOption.value === 'oldest') {
        items.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
      } else if (sortOption.value === 'active') {
        items.sort((a, b) => isActive(b) - isActive(a));
      } else if (sortOption.value === 'past') {
        items.sort((a, b) => isActive(a) - isActive(b));
      }
    } else if (activeTab.value === 'participants') {
      if (sortOption.value === 'newest') {
        items.sort((a, b) => new Date(b.joined_at) - new Date(a.joined_at));
      } else if (sortOption.value === 'oldest') {
        items.sort((a, b) => new Date(a.joined_at) - new Date(b.joined_at));
      }
    } else if (activeTab.value === 'payments') {
      if (sortOption.value === 'newest') {
        items.sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date));
      } else if (sortOption.value === 'oldest') {
        items.sort((a, b) => new Date(a.payment_date) - new Date(b.payment_date));
      }
    }
  }

  return items;
});

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage.value));

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredItems.value.slice(start, end);
});

const filterItems = () => {
  currentPage.value = 1;
};

const sortItems = () => {
  currentPage.value = 1;
};

const editEvent = (event) => {
  editingEvent.value = event;
  eventForm.value = {
    title: event.title,
    description: event.description,
    event_type: event.event_type,
    start_time: new Date(event.start_time).toISOString().slice(0, 16),
    end_time: new Date(event.end_time).toISOString().slice(0, 16),
    location: event.location || '',
    price: event.price,
    discount_percentage: event.discount_percentage,
    registration_deadline: new Date(event.registration_deadline).toISOString().slice(0, 16),
    discount_deadline: event.discount_deadline ? new Date(event.discount_deadline).toISOString().slice(0, 16) : '',
    cover: null,
  };
  showEventForm.value = true;
};

const resetEventForm = () => {
  eventForm.value = {
    title: '',
    description: '',
    event_type: '',
    start_time: '',
    end_time: '',
    location: '',
    price: null,
    discount_percentage: 0,
    registration_deadline: '',
    discount_deadline: '',
    cover: null,
  };
  errors.value = {
    title: '',
    description: '',
    event_type: '',
    start_time: '',
    end_time: '',
    registration_deadline: '',
    price: '',
    cover: '',
  };
};

const validateEventForm = () => {
  let isValid = true;
  errors.value = {
    title: '',
    description: '',
    event_type: '',
    start_time: '',
    end_time: '',
    registration_deadline: '',
    price: '',
    cover: '',
  };

  if (!eventForm.value.title) {
    errors.value.title = 'Title is required';
    isValid = false;
  }
  if (!eventForm.value.description) {
    errors.value.description = 'Description is required';
    isValid = false;
  }
  if (!eventForm.value.event_type) {
    errors.value.event_type = 'Event type is required';
    isValid = false;
  }
  if (!eventForm.value.start_time) {
    errors.value.start_time = 'Start time is required';
    isValid = false;
  }
  if (!eventForm.value.end_time) {
    errors.value.end_time = 'End time is required';
    isValid = false;
  }
  if (!eventForm.value.registration_deadline) {
    errors.value.registration_deadline = 'Registration deadline is required';
    isValid = false;
  }
  if (!eventForm.value.price) {
    errors.value.price = 'Price is required';
    isValid = false;
  }
  if (!editingEvent.value && !eventForm.value.cover) {
    errors.value.cover = 'Cover image is required';
    isValid = false;
  }

  return isValid;
};

const saveEvent = async () => {
  if (!validateEventForm()) {
    $toast.error('Please fill in all required fields');
    return;
  }

  const formData = new FormData();
  formData.append('title', eventForm.value.title);
  formData.append('description', eventForm.value.description);
  formData.append('event_type', eventForm.value.event_type);
  formData.append('start_time', eventForm.value.start_time);
  formData.append('end_time', eventForm.value.end_time);
  formData.append('registration_deadline', eventForm.value.registration_deadline);
  if (eventForm.value.discount_deadline) formData.append('discount_deadline', eventForm.value.discount_deadline);
  if (eventForm.value.location) formData.append('location', eventForm.value.location);
  formData.append('price', eventForm.value.price?.toString() || '0');
  formData.append('discount_percentage', eventForm.value.discount_percentage.toString());
  if (eventForm.value.cover) formData.append('cover', eventForm.value.cover);

  try {
    if (editingEvent.value) {
      await api.patch(`/coaching/events/${editingEvent.value.slug}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // $toast.success('Event updated successfully!');
    } else {
      await api.post('/coaching/events/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // $toast.success('Event created successfully!');
    }
    fetchEvents();
    showEventForm.value = false;
    resetEventForm();
  } catch (error) {
    console.error('Error saving event:', error);
    $toast.error('Failed to save event');
  }
};

const deleteEvent = async (slug) => {
  if (!confirm('Are you sure you want to delete this event?')) return;
  try {
    await api.delete(`/coaching/events/${slug}/`);
    // $toast.success('Event deleted successfully!');
    fetchEvents();
  } catch (error) {
    console.error('Error deleting event:', error);
    $toast.error('Failed to delete event');
  }
};

const deleteParticipant = async (id) => {
  if (!confirm('Are you sure you want to remove this participant?')) return;
  try {
    await api.delete(`/coaching/participants/${id}/`);
    // $toast.success('Participant removed successfully!');
    fetchParticipants();
  } catch (error) {
    console.error('Error deleting participant:', error);
    $toast.error('Failed to remove participant');
  }
};

const onUpload = (event) => {
  const input = event.target;
  if (input.files && input.files.length > 0) {
    eventForm.value.cover = input.files[0];
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Handle create event from index.vue
defineProps({
  createEvent: Function,
});

const openEventForm = () => {
  editingEvent.value = null;
  resetEventForm();
  showEventForm.value = true;
};
</script>