<template>
  <AdminLayout>
    <main>
      <section class="py-0 bg-blue h-100px align-items-center d-flex h-200px rounded-0"
        :style="`background:url(${pattern04}) no-repeat center center; background-size:cover;`">
        <b-container>
          <b-row>
            <b-col cols="12" class="text-center">
              <h1 class="text-white">Submit a New Course</h1>
              <p class="text-white mb-0">Read our <a href="#" class="text-white"><u>"Before you create a course"</u></a>
                article before submitting!</p>
            </b-col>
          </b-row>
        </b-container>
      </section>

      <section>
        <b-container>
          <b-row>
            <b-col md="8" class="mx-auto text-center">
              <p class="text-center">Use this interface to add a new Course to the portal. Once you are done adding the
                item it will be reviewed for quality. If approved, your course will appear for sale and you will be
                informed by email that your course has been accepted.</p>
            </b-col>
          </b-row>
          <b-card no-body class="bg-transparent border rounded-3 mb-5">
            <b-row class="mb-4">
              <b-col md="6">
                <b-form-group label="Load Draft">
                  <b-form-select v-model="selectedDraft" @change="loadDraft">
                    <option value="">Select a draft</option>
                    <option v-for="draft in drafts" :key="draft.id" :value="draft.id">
                      {{ draft.title || 'Untitled Draft' }}
                    </option>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <div id="stepper" ref="stepperRef" class="bs-stepper stepper-outline">
              <b-card-header class="bg-light border-bottom px-lg-5">
                <div class="bs-stepper-header" role="tablist">
                  <div class="step" data-target="#step-1">
                    <div class="d-grid text-center align-items-center">
                      <button type="button" class="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger1"
                        aria-controls="step-1">
                        <span class="bs-stepper-circle">1</span>
                      </button>
                      <h6 class="bs-stepper-label d-none d-md-block">Course Details</h6>
                    </div>
                  </div>
                  <div class="line"></div>
                  <div class="step" data-target="#step-2">
                    <div class="d-grid text-center align-items-center">
                      <button type="button" class="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger2"
                        aria-controls="step-2">
                        <span class="bs-stepper-circle">2</span>
                      </button>
                      <h6 class="bs-stepper-label d-none d-md-block">Course Media</h6>
                    </div>
                  </div>
                  <div class="line"></div>
                  <div class="step" data-target="#step-3">
                    <div class="d-grid text-center align-items-center">
                      <button type="button" class="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger3"
                        aria-controls="step-3">
                        <span class="bs-stepper-circle">3</span>
                      </button>
                      <h6 class="bs-stepper-label d-none d-md-block">Curriculum</h6>
                    </div>
                  </div>
                  <div class="line"></div>
                  <div class="step" data-target="#step-4">
                    <div class="d-grid text-center align-items-center">
                      <button type="button" class="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger4"
                        aria-controls="step-4">
                        <span class="bs-stepper-circle">4</span>
                      </button>
                      <h6 class="bs-stepper-label d-none d-md-block">Additional Information</h6>
                    </div>
                  </div>
                </div>
              </b-card-header>

              <b-card-body>
                <div class="bs-stepper-content">
                  <b-form @submit.prevent="publishCourse">
                    <Step1 :form-data="formData" :next-page="nextPage" :errors="errors" :save-draft="saveDraft" />
                    <Step2 :form-data="formData" :next-page="nextPage" :previous-page="previousPage" :errors="errors" :save-draft="saveDraft" />
                    <Step3 :form-data="formData" :next-page="nextPage" :previous-page="previousPage" :errors="errors" :save-draft="saveDraft" />
                    <Step4 :form-data="formData" :previous-page="previousPage" :errors="errors" :save-draft="saveDraft" />
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
import TopBar8 from '@/views/admin/courses/create-course/components/TopBar8.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import Step1 from '@/views/admin/courses/create-course/components/Step1.vue';
import Step2 from '@/views/admin/courses/create-course/components/Step2.vue';
import Step3 from '@/views/admin/courses/create-course/components/Step3.vue';
import Step4 from '@/views/admin/courses/create-course/components/Step4.vue';
import Footer7 from '@/views/admin/courses/create-course/components/Footer7.vue';
import pattern04 from '@/assets/images/pattern/04.png';
import { api } from '@/services/authService';
import Stepper from 'bs-stepper';

const toast = useToast();
const router = useRouter();
const stepperRef = ref<HTMLElement | null>(null);
const stepperInstance = ref<any>(null); // Use any type since bs-stepper types are unreliable
const currentStep = ref(0); // Track current step manually
const submitted = ref(false);
const drafts = ref([]);
const selectedDraft = ref('');
const draftId = ref(null as number | null);

const formData = ref({
  title: '',
  description: '',
  price: null as number | null,
  cover: null as File | null,
  discount_percentage: null as number | null,
  discount_deadline: null as string | null,
  is_featured: false,
  modules: [] as { title: string; description: string; order: number }[],
  faqs: [] as { question: string; answer: string }[],
  tags: [] as string[],
});

const errors = ref({
  title: '',
  description: '',
  price: '',
  cover: '',
  discount_percentage: '',
  discount_deadline: '',
  is_featured: '',
  modules: [] as { title: string; description: string }[],
  faqs: [] as { question: string; answer: string }[],
  tags: '',
});

onMounted(async () => {
  if (stepperRef.value) {
    try {
      stepperInstance.value = new Stepper(stepperRef.value, {
        linear: false,
        animation: true,
      });
      // Listen for step changes to update currentStep
      stepperRef.value.addEventListener('show.bs-stepper', (event: any) => {
        currentStep.value = event.detail.indexStep;
      });
    } catch (error) {
      console.error('Failed to initialize stepper:', error);
      toast.error('Failed to initialize form stepper');
    }
  }
  await fetchDrafts();
});

const fetchDrafts = async () => {
  try {
    const response = await api.get('course/courses/drafts/');
    drafts.value = response.data;
  } catch (error) {
    console.error('Error fetching drafts:', error);
    toast.error('Failed to fetch drafts');
  }
};

const loadDraft = async () => {
  if (!selectedDraft.value) {
    resetForm();
    draftId.value = null;
    return;
  }
  try {
    const response = await api.get(`course/courses/${selectedDraft.value}/`);
    const draft = response.data;
    formData.value = {
      title: draft.title || '',
      description: draft.description || '',
      price: draft.price || null,
      cover: null, // File cannot be loaded; user must re-upload
      discount_percentage: draft.discount_percentage || null,
      discount_deadline: draft.discount_deadline || null,
      is_featured: draft.is_featured || false,
      modules: draft.modules?.map((module: any, index: number) => ({
        title: module.title || '',
        description: module.description || '',
        order: module.order || index + 1,
      })) || [],
      faqs: draft.faqs?.map((faq: any) => ({
        question: faq.question || '',
        answer: faq.answer || '',
      })) || [],
      tags: draft.tags?.map((tag: any) => tag.tag) || [],
    };
    draftId.value = draft.id;
    toast.success('Draft loaded successfully');
  } catch (error) {
    console.error('Error loading draft:', error);
    toast.error('Failed to load draft');
  }
};

const nextPage = () => {
  if (validateStep(currentStep.value, false)) {
    try {
      if (stepperInstance.value && currentStep.value < 3) { // 4 steps total (0 to 3)
        stepperInstance.value.next();
        currentStep.value += 1;
      }
    } catch (error) {
      console.error('Error navigating to next step:', error);
      toast.error('Failed to navigate to the next step');
    }
  }
};

const previousPage = () => {
  try {
    if (stepperInstance.value && currentStep.value > 0) {
      stepperInstance.value.previous();
      currentStep.value -= 1;
    }
  } catch (error) {
    console.error('Error navigating to previous step:', error);
    toast.error('Failed to navigate to the previous step');
  }
};

const validateStep = (step: number, strict: boolean = true): boolean => {
  submitted.value = true;
  let isValid = true;
  errors.value = {
    title: '',
    description: '',
    price: '',
    cover: '',
    discount_percentage: '',
    discount_deadline: '',
    is_featured: '',
    modules: [],
    faqs: [],
    tags: '',
  };

  if (step === 0 && strict) {
    if (!formData.value.title) {
      errors.value.title = 'Course title is required';
      isValid = false;
    }
    if (!formData.value.description) {
      errors.value.description = 'Description is required';
      isValid = false;
    }
    if (!formData.value.price) {
      errors.value.price = 'Price is required';
      isValid = false;
    }
  } else if (step === 1 && strict) {
    if (!formData.value.cover) {
      errors.value.cover = 'Course image is required';
      isValid = false;
    }
  } else if (step === 2 && strict) {
    formData.value.modules.forEach((module, index) => {
      let moduleErrors = { title: '', description: '' };
      if (!module.title) {
        moduleErrors.title = 'Module title is required';
        isValid = false;
      }
      if (!module.description) {
        moduleErrors.description = 'Module description is required';
        isValid = false;
      }
      errors.value.modules[index] = moduleErrors;
    });
    if (!formData.value.modules.length) {
      errors.value.modules.push({ title: 'At least one module is required', description: '' });
      isValid = false;
    }
  } else if (step === 3 && strict) {
    formData.value.faqs.forEach((faq, index) => {
      let faqErrors = { question: '', answer: '' };
      if (!faq.question) {
        faqErrors.question = 'Question is required';
        isValid = false;
      }
      if (!faq.answer) {
        faqErrors.answer = 'Answer is required';
        isValid = false;
      }
      errors.value.faqs[index] = faqErrors;
    });
  }

  if (!isValid && strict) {
    toast.error('Please fill in all required fields');
  }
  return isValid;
};

const saveDraft = async () => {
  submitted.value = true;
  const formPayload = new FormData();
  if (formData.value.title) formPayload.append('title', formData.value.title);
  if (formData.value.description) formPayload.append('description', formData.value.description);
  if (formData.value.price !== null) formPayload.append('price', formData.value.price.toFixed(2));
  if (formData.value.cover) formPayload.append('cover', formData.value.cover);
  if (formData.value.discount_percentage !== null) {
    formPayload.append('discount_percentage', formData.value.discount_percentage.toFixed(2));
  }
  if (formData.value.discount_deadline) formPayload.append('discount_deadline', formData.value.discount_deadline);
  formPayload.append('is_featured', formData.value.is_featured.toString());
  if (formData.value.faqs.length) formPayload.append('faqs', JSON.stringify(formData.value.faqs));
  if (formData.value.tags.length) formPayload.append('tags', JSON.stringify(formData.value.tags.map(tag => ({ tag }))));
  formPayload.append('ispublished', 'false');

  try {
    let response;
    if (draftId.value) {
      response = await api.put(`course/courses/${draftId.value}/`, formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      response = await api.post('course/courses/', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      draftId.value = response.data.id;
    }

    // Handle modules
    if (formData.value.modules.length) {
      const modulePayload = {
        course: response.data.id,
        modules: formData.value.modules,
      };
      await api.post('course/modules/bulk_create/', modulePayload);
    }

    toast.success('Draft saved successfully!');
    await fetchDrafts();
  } catch (error: any) {
    if (error.response && error.response.data) {
      const backendErrors = error.response.data;
      for (const [key, value] of Object.entries(backendErrors)) {
        if (key === 'faqs') {
          errors.value.faqs = value.map((err: any) => ({
            question: err.question?.[0] || '',
            answer: err.answer?.[0] || '',
          }));
        } else if (key === 'tags') {
          errors.value.tags = Array.isArray(value) ? value[0] : value;
        } else if (key === 'modules') {
          errors.value.modules = value.map((err: any) => ({
            title: err.title?.[0] || '',
            description: err.description?.[0] || '',
          }));
        } else if (key in errors.value) {
          errors.value[key as keyof typeof errors.value] = Array.isArray(value) ? value[0] : value;
        }
      }
      toast.error('Failed to save draft. Please correct the errors.');
    } else {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
    }
  }
};

const publishCourse = async () => {
  submitted.value = true;
  if (!validateStep(3, true)) return;

  const formPayload = new FormData();
  formPayload.append('title', formData.value.title);
  formPayload.append('description', formData.value.description);
  if (formData.value.price !== null) formPayload.append('price', formData.value.price.toFixed(2));
  if (formData.value.cover) formPayload.append('cover', formData.value.cover);
  if (formData.value.discount_percentage !== null) {
    formPayload.append('discount_percentage', formData.value.discount_percentage.toFixed(2));
  }
  if (formData.value.discount_deadline) formPayload.append('discount_deadline', formData.value.discount_deadline);
  formPayload.append('is_featured', formData.value.is_featured.toString());
  formPayload.append('faqs', JSON.stringify(formData.value.faqs));
  formPayload.append('tags', JSON.stringify(formData.value.tags.map(tag => ({ tag }))));
  formPayload.append('ispublished', 'true');

  try {
    let response;
    if (draftId.value) {
      response = await api.put(`course/courses/${draftId.value}/`, formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      response = await api.post('course/courses/', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    // Handle modules
    const modulePayload = {
      course: response.data.id,
      modules: formData.value.modules,
    };
    await api.post('course/modules/bulk_create/', modulePayload);

    toast.success('Course published successfully!');
    router.push({ name: 'instructor.course.added' });
    resetForm();
  } catch (error: any) {
    if (error.response && error.response.data) {
      const backendErrors = error.response.data;
      for (const [key, value] of Object.entries(backendErrors)) {
        if (key === 'faqs') {
          errors.value.faqs = value.map((err: any) => ({
            question: err.question?.[0] || '',
            answer: err.answer?.[0] || '',
          }));
        } else if (key === 'tags') {
          errors.value.tags = Array.isArray(value) ? value[0] : value;
        } else if (key === 'modules') {
          errors.value.modules = value.map((err: any) => ({
            title: err.title?.[0] || '',
            description: err.description?.[0] || '',
          }));
        } else if (key in errors.value) {
          errors.value[key as keyof typeof errors.value] = Array.isArray(value) ? value[0] : value;
        }
      }
      toast.error('Failed to publish course. Please correct the errors.');
    } else {
      console.error('Error publishing course:', error);
      toast.error('Failed to publish course');
    }
  }
};

const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    price: null,
    cover: null,
    discount_percentage: null,
    discount_deadline: null,
    is_featured: false,
    modules: [],
    faqs: [],
    tags: [],
  };
  submitted.value = false;
  draftId.value = null;
  selectedDraft.value = '';
  errors.value = {
    title: '',
    description: '',
    price: '',
    cover: '',
    discount_percentage: '',
    discount_deadline: '',
    is_featured: '',
    modules: [],
    faqs: [],
    tags: '',
  };
  currentStep.value = 0; // Reset to first step
  if (stepperInstance.value) {
    try {
      stepperInstance.value.to(1); // Reset stepper to first step (1-based index in bs-stepper)
    } catch (error) {
      console.error('Error resetting stepper:', error);
    }
  }
};
</script>