<template>
  <AdminLayout>
    <main>
      <section class="py-0 bg-blue h-100px align-items-center d-flex h-200px rounded-0"
        :style="`background:url(${pattern04}) no-repeat center center; background-size:cover;`">
        <b-container>
          <b-row>
            <b-col cols="12" class="text-center">
              <h1 class="text-white">Create a New Event</h1>
              <p class="text-white mb-0">Fill in the details below to create your event.</p>
            </b-col>
          </b-row>
        </b-container>
      </section>

      <section>
        <b-container>
          <b-card no-body class="bg-transparent border rounded-3 mb-5">
            <div id="stepper" ref="stepperRef" class="bs-stepper stepper-outline">
              <b-card-header class="bg-light border-bottom px-lg-5">
                <div class="bs-stepper-header" role="tablist">
                  <div class="step" data-target="#step-1">
                    <div class="d-grid text-center align-items-center">
                      <button type="button" class="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger1"
                        aria-controls="step-1">
                        <span class="bs-stepper-circle">1</span>
                      </button>
                      <h6 class="bs-stepper-label d-none d-md-block">Event Details</h6>
                    </div>
                  </div>
                  <div class="line"></div>
                  <div class="step" data-target="#step-2">
                    <div class="d-grid text-center align-items-center">
                      <button type="button" class="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger2"
                        aria-controls="step-2">
                        <span class="bs-stepper-circle">2</span>
                      </button>
                      <h6 class="bs-stepper-label d-none d-md-block">Event Media</h6>
                    </div>
                  </div>
                  <div class="line"></div>
                  <div class="step" data-target="#step-3">
                    <div class="d-grid text-center align-items-center">
                      <button type="button" class="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger3"
                        aria-controls="step-3">
                        <span class="bs-stepper-circle">3</span>
                      </button>
                      <h6 class="bs-stepper-label d-none d-md-block">Dates and Pricing</h6>
                    </div>
                  </div>
                </div>
              </b-card-header>

              <b-card-body>
                <div class="bs-stepper-content">
                  <b-form @submit.prevent="submitEvent">
                    <EventStep1 :form-data="formData" :next-page="nextPage" :errors="errors" />
                    <EventStep2 :form-data="formData" :next-page="nextPage" :previous-page="previousPage" :errors="errors" />
                    <EventStep3 :form-data="formData" :previous-page="previousPage" :errors="errors" />
                  </b-form>
                </div>
              </b-card-body>
            </div>
          </b-card>
        </b-container>
      </section>
    </main>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useRouter } from 'vue-router';
import EventStep1 from '@/views/admin/events/create-events/components/EventStep1.vue';
import EventStep2 from '@/views/admin/events/create-events/components/EventStep2.vue';
import EventStep3 from '@/views/admin/events/create-events/components/EventStep3.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { api } from '@/services/authService';
import Stepper from 'bs-stepper';
import type { default as StepperType } from 'bs-stepper';
import pattern04 from '@/assets/images/pattern/04.png';

const toast = useToast();
const router = useRouter();
const stepperRef = ref<HTMLElement | null>(null);
let stepperInstance = ref<StepperType>();
const submitted = ref(false);

const formData = ref({
  title: '',
  description: '',
  event_type: '',
  cover: null as File | null,
  start_time: '',
  end_time: '',
  registration_deadline: '',
  discount_deadline: '',
  location: '',
  link: '',
  price: null as number | null,
  discount_percentage: null as number | null,
  enable_discount: false,
  tags: [] as string[],
});

const errors = ref({
  title: '',
  description: '',
  event_type: '',
  cover: '',
  start_time: '',
  end_time: '',
  registration_deadline: '',
  discount_deadline: '',
  location: '',
  link: '',
  price: '',
  tags: '',
});

onMounted(() => {
  if (stepperRef.value) {
    stepperInstance.value = new Stepper(stepperRef.value, {
      linear: false,
      animation: true,
    });
    console.log('Stepper initialized');
  } else {
    console.error('Stepper ref not found');
  }
});

const nextPage = () => {
  const currentStep = stepperInstance.value?.getCurrentStep?.() ?? 0;
  console.log('Next button clicked, current step:', currentStep, 'formData:', formData.value);
  if (validateStep(currentStep)) {
    stepperInstance.value?.next();
  }
};

const previousPage = () => {
  console.log('Previous button clicked');
  stepperInstance.value?.previous();
};

const validateStep = (step: number): boolean => {
  submitted.value = true;
  let isValid = true;
  errors.value = {
    title: '',
    description: '',
    event_type: '',
    cover: '',
    start_time: '',
    end_time: '',
    registration_deadline: '',
    discount_deadline: '',
    location: '',
    link: '',
    price: '',
    tags: '',
  };

  const errorMessages: string[] = [];

  if (step === 0) {
    if (!formData.value.title) {
      errors.value.title = 'Event title is required';
      errorMessages.push('Event title');
      isValid = false;
    }
    if (!formData.value.description) {
      errors.value.description = 'Description is required';
      errorMessages.push('Description');
      isValid = false;
    }
    if (!formData.value.event_type) {
      errors.value.event_type = 'Event type is required';
      errorMessages.push('Event type');
      isValid = false;
    }
  } else if (step === 1) {
    if (!formData.value.cover) {
      errors.value.cover = 'Event image is required';
      errorMessages.push('Event image');
      isValid = false;
    }
  } else if (step === 2) {
    if (!formData.value.start_time) {
      errors.value.start_time = 'Start time is required';
      errorMessages.push('Start time');
      isValid = false;
    }
    if (!formData.value.end_time) {
      errors.value.end_time = 'End time is required';
      errorMessages.push('End time');
      isValid = false;
    }
    if (!formData.value.registration_deadline) {
      errors.value.registration_deadline = 'Registration deadline is required';
      errorMessages.push('Registration deadline');
      isValid = false;
    }
    if (formData.value.event_type === 'on_premises' && !formData.value.location) {
      errors.value.location = 'Location is required for on-premises events';
      errorMessages.push('Location');
      isValid = false;
    }
    if (formData.value.event_type === 'online' && !formData.value.link) {
      errors.value.link = 'Link is required for online events';
      errorMessages.push('Link');
      isValid = false;
    }
    if (formData.value.price === null || formData.value.price < 0) {
      errors.value.price = 'Valid price is required';
      errorMessages.push('Price');
      isValid = false;
    }
  }

  if (!isValid) {
    console.log('Validation failed for step', step, 'Missing fields:', errorMessages);
    toast.error(`Please fill in all required fields: ${errorMessages.join(', ')}`);
  } else {
    console.log('Validation passed for step', step);
  }

  return isValid;
};

const submitEvent = async () => {
  console.log('Submitting event, formData:', formData.value);
  submitted.value = true;
  if (!validateStep(2)) return;

  const formPayload = new FormData();
  formPayload.append('title', formData.value.title);
  formPayload.append('description', formData.value.description);
  formPayload.append('event_type', formData.value.event_type);
  if (formData.value.cover) formPayload.append('cover', formData.value.cover);
  formPayload.append('start_time', formData.value.start_time);
  formPayload.append('end_time', formData.value.end_time);
  formPayload.append('registration_deadline', formData.value.registration_deadline);
  if (formData.value.discount_deadline) formPayload.append('discount_deadline', formData.value.discount_deadline);
  if (formData.value.event_type === 'on_premises') {
    formPayload.append('location', formData.value.location);
  } else if (formData.value.event_type === 'online') {
    formPayload.append('link', formData.value.link);
  }
  if (formData.value.price !== null) formPayload.append('price', formData.value.price.toFixed(2));
  if (formData.value.enable_discount && formData.value.discount_percentage !== null) {
    formPayload.append('discount_percentage', formData.value.discount_percentage.toString());
  }
  formPayload.append('tags', JSON.stringify(formData.value.tags));

  try {
    const response = await api.post('coaching/events/', formPayload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    toast.success('Event created successfully!');
    router.push({ name: 'admin.manage.event' });
    resetForm();
  } catch (error: any) {
    if (error.response && error.response.data) {
      const backendErrors = error.response.data;
      for (const [key, value] of Object.entries(backendErrors)) {
        if (key in errors.value) {
          errors.value[key as keyof typeof errors.value] = Array.isArray(value) ? value[0] : value;
        }
      }
      console.log('Backend errors:', backendErrors);
      toast.error('Please correct the errors and try again');
    } else {
      console.error('Error submitting event:', error);
      toast.error('Failed to create event');
    }
  }
};

const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    event_type: '',
    cover: null,
    start_time: '',
    end_time: '',
    registration_deadline: '',
    discount_deadline: '',
    location: '',
    link: '',
    price: null,
    discount_percentage: null,
    enable_discount: false,
    tags: [],
  };
  submitted.value = false;
  errors.value = {
    title: '',
    description: '',
    event_type: '',
    cover: '',
    start_time: '',
    end_time: '',
    registration_deadline: '',
    discount_deadline: '',
    location: '',
    link: '',
    price: '',
    tags: '',
  };
};
</script>