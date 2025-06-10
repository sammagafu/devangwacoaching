<template>
  <AdminLayout>
    <main>
      <section class="py-0 bg-blue h-100px align-items-center d-flex h-200px rounded-0"
        :style="`background:url(${pattern04}) no-repeat center center; background-size:cover;`">
        <b-container>
          <b-row>
            <b-col cols="12" class="text-center">
              <h1 class="text-white">{{ isEditMode ? 'Edit Course' : 'Submit a New Course' }}</h1>
              <p class="text-white mb-0" v-if="!isEditMode">Read our <a href="#" class="text-white"><u>"Before you create a course"</u></a>
                article before submitting!</p>
            </b-col>
          </b-row>
        </b-container>
      </section>

      <section>
        <b-container>
          <b-row>
            <b-col md="8" class="mx-auto text-center">
              <p class="text-center">{{ isEditMode ? 'Update the course details below. Changes will be reviewed before being published.' : 'Use this interface to add a new Course to the portal. Once you are done adding the item it will be reviewed for quality.' }}</p>
            </b-col>
          </b-row>
          <b-card no-body class="bg-transparent border rounded-3 mb-5">
            <b-row class="mb-4" v-if="!isEditMode">
              <b-col md="6">
                <b-form-group label="Load Draft">
                  <b-form-select v-model="selectedDraft" @change="loadDraft">
                    <option value="">Select a draft</option>
                    <option v-for="draft in drafts" :key="draft.slug" :value="draft.slug">
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
                  <b-form @submit.prevent="isEditMode ? updateCourse : publishCourse">
                    <Step1 :form-data="formData" :next-page="nextPage" :errors="errors" :save-draft="saveDraft" />
                    <Step2
                      :form-data="formData"
                      :next-page="nextPage"
                      :previous-page="previousPage"
                      :errors="errors"
                      :save-draft="saveDraft"
                      @update:cover="updateCover"
                    />
                    <Step3
                      :form-data="formData"
                      :next-page="nextPage"
                      :previous-page="previousPage"
                      :errors="errors"
                      :save-draft="saveDraft"
                      :course-id="courseId"
                      @update:formData="updateFormData"
                    />
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
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useRouter, useRoute } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';
import Step1 from '@/views/admin/courses/create-course/components/Step1.vue';
import Step2 from '@/views/admin/courses/create-course/components/Step2.vue';
import Step3 from '@/views/admin/courses/create-course/components/Step3.vue';
import Step4 from '@/views/admin/courses/create-course/components/Step4.vue';
import pattern04 from '@/assets/images/pattern/04.png';
import { api } from '@/services/authService';
import Stepper from 'bs-stepper';
import { debounce } from 'lodash';

const toast = useToast();
const router = useRouter();
const route = useRoute();
const stepperRef = ref<HTMLElement | null>(null);
const stepperInstance = ref<any>(null);
const currentStep = ref(0);
const submitted = ref(false);
const drafts = ref([]);
const selectedDraft = ref('');
const draftId = ref(null as number | null);
const draftSlug = ref(null as string | null);
const courseId = ref(null as number | null);

// Determine if in edit mode based on route slug
const isEditMode = computed(() => !!route.params.slug);
const courseSlug = computed(() => route.params.slug as string);

const formData = ref({
  title: '',
  short_description: '',
  category: '',
  level: '',
  languages: [] as string[],
  is_featured: false,
  course_time: '',
  total_lecture: '',
  price: null as number | null,
  discount_price: null as number | null,
  enable_discount: false,
  description: '',
  cover: null as File | null,
  video_url: '',
  video_file: null as File | null,
  modules: [] as {
    id?: number;
    title: string;
    order: number;
    description: string;
    videos: { id?: number; tempId?: string; title: string; video_url: string; description?: string; is_free: boolean }[];
  }[],
  faqs: [] as { question: string; answer: string }[],
  tags: [] as string[],
  reviewer_message: '',
  assets_licensed: false,
});

const errors = ref({
  title: '',
  short_description: '',
  category: '',
  level: '',
  languages: '',
  is_featured: '',
  course_time: '',
  total_lecture: '',
  price: '',
  discount_price: '',
  enable_discount: '',
  description: '',
  cover: '',
  video_url: '',
  video_file: '',
  modules: [] as { title: string; order: string; description: string; videos: { title: string; video_url: string }[] }[],
  faqs: [] as { question: string; answer: string }[],
  tags: '',
  reviewer_message: '',
  assets_licensed: '',
});

// Debounced save to localStorage
const saveToLocalStorage = debounce(() => {
  const formDataCopy = JSON.parse(JSON.stringify(formData.value));
  formDataCopy.cover = null;
  formDataCopy.video_file = null;
  formDataCopy.modules.forEach((module: any) => {
    module.videos.forEach((video: any) => {
      delete video.id;
      delete video.tempId;
    });
  });
  localStorage.setItem('courseFormData', JSON.stringify(formDataCopy));
  localStorage.setItem('courseFormStep', currentStep.value.toString());
}, 300);

// Load formData and currentStep from localStorage
const loadFromLocalStorage = () => {
  const savedFormData = localStorage.getItem('courseFormData');
  const savedStep = localStorage.getItem('courseFormStep');
  if (savedFormData) {
    const parsedData = JSON.parse(savedFormData);
    parsedData.cover = null;
    parsedData.video_file = null;
    formData.value = {
      ...formData.value,
      ...parsedData,
      category: parsedData.category ?? '',
      level: parsedData.level ?? '',
      languages: parsedData.languages ?? [],
    };
  }
  if (savedStep) {
    currentStep.value = parseInt(savedStep);
    if (stepperInstance.value && currentStep.value >= 0 && currentStep.value <= 3) {
      stepperInstance.value.to(currentStep.value + 1);
    }
  }
};

// Clear localStorage
const clearLocalStorage = () => {
  localStorage.removeItem('courseFormData');
  localStorage.removeItem('courseFormStep');
};

// Update formData and save to localStorage
const updateFormData = (newFormData: any) => {
  formData.value = { ...formData.value, ...newFormData };
  saveToLocalStorage();
};

// Update cover image
const updateCover = (file: File | null) => {
  formData.value.cover = file;
  saveToLocalStorage();
};

onMounted(async () => {
  if (stepperRef.value) {
    try {
      stepperInstance.value = new Stepper(stepperRef.value, {
        linear: false,
        animation: true,
      });
      stepperRef.value.addEventListener('show.bs.stepper', (event: any) => {
        currentStep.value = event.detail.indexStep;
        saveToLocalStorage();
      });
    } catch (error) {
      console.error('Failed to initialize stepper:', error);
      toast.error('Failed to initialize form stepper');
    }
  }
  if (isEditMode.value) {
    await loadCourse(courseSlug.value);
  } else {
    loadFromLocalStorage();
    await fetchDrafts();
  }
});

const fetchDrafts = async () => {
  try {
    const response = await api.get('/course/courses/drafts/'); // Updated to intended nested endpoint
    drafts.value = response.data;
    console.log('Drafts fetched:', response.data);
  } catch (error) {
    console.error('Error fetching drafts:', error);
    toast.error('Failed to fetch drafts');
  }
};

const loadCourse = async (slug: string) => {
  try {
    const response = await api.get(`course/courses/${slug}/`);
    const courseData = response.data;
    console.log('Course data received:', courseData);
    const description = courseData.description || '';
    const shortDescriptionMatch = description.match(/Short Description: (.*?)(?=\n\n|$)/);
    const categoryMatch = description.match(/Category: (.*?)(?=\n\n|$)/);
    const levelMatch = description.match(/Level: (.*?)(?=\n\n|$)/);
    const languagesMatch = description.match(/Languages: (.*?)(?=\n\n|$)/);
    const courseTimeMatch = description.match(/Course Time: (.*?)(?=\n\n|$)/);
    const totalLectureMatch = description.match(/Total Lectures: (.*?)(?=\n\n|$)/);
    const reviewerMessageMatch = description.match(/Reviewer Message: (.*?)(?=\n\n|$)/);

    formData.value = {
      title: courseData.title || '',
      short_description: shortDescriptionMatch ? shortDescriptionMatch[1] : '',
      category: categoryMatch ? categoryMatch[1] : '',
      level: levelMatch ? levelMatch[1] : '',
      languages: languagesMatch ? languagesMatch[1].split(', ').filter((l: string) => l) : [],
      is_featured: courseData.is_featured || false,
      course_time: courseTimeMatch ? courseTimeMatch[1] : '',
      total_lecture: totalLectureMatch ? totalLectureMatch[1] : '',
      price: parseFloat(courseData.final_price) || null,
      discount_price: courseData.discount_percentage
        ? Number((parseFloat(courseData.final_price) * (1 - parseFloat(courseData.discount_percentage) / 100)).toFixed(2))
        : null,
      enable_discount: !!courseData.discount_percentage,
      description: description.split('\n\n').filter((part: string) => !part.match(/^(Short Description|Category|Level|Languages|Course Time|Total Lectures|Reviewer Message):/)).join('\n\n'),
      cover: null,
      video_url: '',
      video_file: null,
      modules: courseData.modules?.map((module: any, index: number) => ({
        id: module.id,
        title: module.title || '',
        order: module.order || index + 1,
        description: module.description || '',
        videos: module.videos?.map((video: any) => ({
          id: video.id,
          tempId: `temp-video-${Date.now()}-${video.id}`,
          title: video.title,
          video_url: video.video_url,
          description: '',
          is_free: true,
        })) || [],
      })) || [],
      faqs: courseData.faqs?.map((faq: any) => ({
        question: faq.question || '',
        answer: faq.answer || '',
      })) || [],
      tags: courseData.tags?.map((tag: any) => tag.tag) || [],
      reviewer_message: reviewerMessageMatch ? reviewerMessageMatch[1] : '',
      assets_licensed: false,
    };
    draftId.value = courseData.id;
    draftSlug.value = courseData.slug;
    courseId.value = courseData.id;
    saveToLocalStorage();
    toast.success('Course loaded for editing');
  } catch (error: any) {
    console.error('Error loading course:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    toast.error('Failed to load course for editing');
    router.push({ name: 'instructor.courses' });
  }
};

const loadDraft = async () => {
  if (!selectedDraft.value) {
    resetForm();
    draftId.value = null;
    draftSlug.value = null;
    return;
  }
  await loadCourse(selectedDraft.value);
};

const nextPage = () => {
  if (validateStep(currentStep.value, false)) {
    try {
      if (stepperInstance.value && currentStep.value < 3) {
        stepperInstance.value.next();
        currentStep.value += 1;
        saveToLocalStorage();
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
      saveToLocalStorage();
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
    short_description: '',
    category: '',
    level: '',
    languages: '',
    is_featured: '',
    course_time: '',
    total_lecture: '',
    price: '',
    discount_price: '',
    enable_discount: '',
    description: '',
    cover: '',
    video_url: '',
    video_file: '',
    modules: [],
    faqs: [],
    tags: '',
    reviewer_message: '',
    assets_licensed: '',
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
    if (formData.value.price === null || formData.value.price <= 0) {
      errors.value.price = 'Valid price is required';
      isValid = false;
    }
    if (formData.value.enable_discount && (!formData.value.discount_price || formData.value.discount_price >= formData.value.price)) {
      errors.value.discount_price = 'Discount price must be less than the original price';
      isValid = false;
    }
  } else if (step === 1 && strict && !isEditMode.value) {
    if (!formData.value.cover) {
      errors.value.cover = 'Course image is required';
      isValid = false;
    }
  } else if (step === 2 && strict) {
    formData.value.modules.forEach((module, index) => {
      let moduleErrors = { title: '', order: '', description: '', videos: [] as { title: string; video_url: string }[] };
      if (!module.title) {
        moduleErrors.title = 'Module title is required';
        isValid = false;
      }
      if (module.order < 1) {
        moduleErrors.order = 'Order must be positive';
        isValid = false;
      }
      if (!module.description) {
        moduleErrors.description = 'Module description is required';
        isValid = false;
      }
      module.videos.forEach((video, vIndex) => {
        let videoErrors = { title: '', video_url: '' };
        if (!video.title) {
          videoErrors.title = 'Video title is required';
          isValid = false;
        }
        if (!video.video_url) {
          videoErrors.video_url = 'Video URL is required';
          isValid = false;
        }
        moduleErrors.videos[vIndex] = videoErrors;
      });
      errors.value.modules[index] = moduleErrors;
    });
    if (!formData.value.modules.length) {
      errors.value.modules.push({ title: 'At least one module is required', order: '', description: '', videos: [] });
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
    if (!formData.value.assets_licensed) {
      errors.value.assets_licensed = 'You must confirm that assets are licensed';
      isValid = false;
    }
  }

  if (!isValid && strict) {
    toast.error('Please fill in all required fields');
  }
  return isValid;
};

const saveDraft = async () => {
  submitted.value = true;

  if (!formData.value.title) {
    toast.error('Please provide a title before saving as draft');
    return;
  }

  const formPayload = new FormData();
  formPayload.append('title', formData.value.title);
  const descriptionParts = [formData.value.description];
  if (formData.value.short_description) descriptionParts.push(`Short Description: ${formData.value.short_description}`);
  if (formData.value.category) descriptionParts.push(`Category: ${formData.value.category}`);
  if (formData.value.level) descriptionParts.push(`Level: ${formData.value.level}`);
  if (formData.value.languages.length) descriptionParts.push(`Languages: ${formData.value.languages.join(', ')}`);
  if (formData.value.course_time) descriptionParts.push(`Course Time: ${formData.value.course_time}`);
  if (formData.value.total_lecture) descriptionParts.push(`Total Lectures: ${formData.value.total_lecture}`);
  if (formData.value.reviewer_message) descriptionParts.push(`Reviewer Message: ${formData.value.reviewer_message}`);
  formPayload.append('description', descriptionParts.join('\n\n'));
  if (formData.value.price !== null && formData.value.price > 0) {
    formPayload.append('final_price', formData.value.price.toFixed(2));
  }
  if (formData.value.cover) formPayload.append('cover', formData.value.cover);
  if (formData.value.enable_discount && formData.value.discount_price && formData.value.price) {
    const discount_percentage = ((formData.value.price - formData.value.discount_price) / formData.value.price * 100).toFixed(2);
    formPayload.append('discount_percentage', discount_percentage);
    formPayload.append('discount_deadline', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString());
  }
  formPayload.append('is_featured', formData.value.is_featured.toString());
  if (formData.value.faqs.length) formPayload.append('faqs', JSON.stringify(formData.value.faqs));
  if (formData.value.tags.length) formPayload.append('tags', JSON.stringify(formData.value.tags.map(tag => ({ tag }))));
  formPayload.append('ispublished', 'false');

  try {
    console.log('Saving draft with payload:', [...formPayload.entries()]);
    let response;
    if (draftId.value && draftSlug.value) {
      response = await api.put(`course/courses/${draftSlug.value}/`, formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      response = await api.post('course/courses/', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      draftId.value = response.data.id;
      draftSlug.value = response.data.slug;
      courseId.value = response.data.id;
    }
    console.log('Draft save response:', response.data);

    if (formData.value.modules.length) {
      const newModules = formData.value.modules.filter(module => !module.id);
      const existingModules = formData.value.modules.filter(module => module.id);

      if (newModules.length) {
        const newModulePayload = {
          course: response.data.id,
          modules: newModules.map(module => ({
            title: module.title,
            description: module.description,
            order: module.order,
          })),
        };
        console.log('New module payload:', newModulePayload);
        const newModuleResponse = await api.post('modules/bulk_create/', newModulePayload);
        console.log('New module creation response:', newModuleResponse.data);

        newModuleResponse.data.forEach((savedModule: any, index: number) => {
          newModules[index].id = savedModule.id;
        });
      }

      for (const module of existingModules) {
        const updateModulePayload = {
          title: module.title,
          description: module.description,
          order: module.order,
        };
        await api.put(`modules/${module.id}/`, updateModulePayload);
      }

      for (const module of formData.value.modules) {
        if (!module.id) continue;
        for (const video of module.videos) {
          const videoPayload = {
            module: module.id,
            title: video.title,
            video_url: video.video_url,
          };
          if (video.id) {
            await api.put(`videos/${video.id}/`, videoPayload);
          } else {
            const videoResponse = await api.post('videos/', videoPayload);
            video.id = videoResponse.data.id;
          }
        }
      }
    }

    if (formData.value.video_url) {
      const defaultModule = formData.value.modules[0] || { id: null, title: 'Default Module', order: 1, description: 'Default module for video', videos: [] };
      if (!defaultModule.id) {
        const modulePayload = {
          course: response.data.id,
          modules: [{ title: defaultModule.title, order: defaultModule.order, description: defaultModule.description }],
        };
        const moduleResponse = await api.post('modules/bulk_create/', modulePayload);
        defaultModule.id = moduleResponse.data[0].id;
        formData.value.modules.push(defaultModule);
      }
      const videoPayload = {
        module: defaultModule.id,
        title: 'Course Intro Video',
        video_url: formData.value.video_url,
      };
      const videoResponse = await api.post('videos/', videoPayload);
      console.log('Video creation response:', videoResponse.data);
    }

    if (formData.value.video_file) {
      const defaultModule = formData.value.modules[0] || { id: null, title: 'Default Module', order: 1, description: 'Default module for video', videos: [] };
      if (!defaultModule.id) {
        const modulePayload = {
          course: response.data.id,
          modules: [{ title: defaultModule.title, order: defaultModule.order, description: defaultModule.description }],
        };
        const moduleResponse = await api.post('modules/bulk_create/', modulePayload);
        defaultModule.id = moduleResponse.data[0].id;
        formData.value.modules.push(defaultModule);
      }
      const documentFormData = new FormData();
      documentFormData.append('module', defaultModule.id!.toString());
      documentFormData.append('title', 'Course Video');
      documentFormData.append('document_file', formData.value.video_file);
      const documentResponse = await api.post('documents/', documentFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Document creation response:', documentResponse.data);
    }

    toast.success('Draft saved successfully!');
    await fetchDrafts();
    if (!isEditMode.value) {
      resetForm();
    }
  } catch (error: any) {
    console.error('Error saving draft:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    let errorMessage = 'Failed to save draft';
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
            order: err.order?.[0] || '',
            description: err.description?.[0] || '',
            videos: [],
          }));
        } else if (key in errors.value) {
          errors.value[key as keyof typeof errors.value] = Array.isArray(value) ? value[0] : value;
          errorMessage += `: ${key} - ${Array.isArray(value) ? value[0] : value}`;
        }
      }
    }
    toast.error(errorMessage);
  }
};

const publishCourse = async () => {
  submitted.value = true;
  if (!validateStep(3, true)) return;

  const formPayload = new FormData();
  formPayload.append('title', formData.value.title);
  const descriptionParts = [formData.value.description];
  if (formData.value.short_description) descriptionParts.push(`Short Description: ${formData.value.short_description}`);
  if (formData.value.category) descriptionParts.push(`Category: ${formData.value.category}`);
  if (formData.value.level) descriptionParts.push(`Level: ${formData.value.level}`);
  if (formData.value.languages.length) descriptionParts.push(`Languages: ${formData.value.languages.join(', ')}`);
  if (formData.value.course_time) descriptionParts.push(`Course Time: ${formData.value.course_time}`);
  if (formData.value.total_lecture) descriptionParts.push(`Total Lectures: ${formData.value.total_lecture}`);
  if (formData.value.reviewer_message) descriptionParts.push(`Reviewer Message: ${formData.value.reviewer_message}`);
  formPayload.append('description', descriptionParts.join('\n\n'));
  if (formData.value.price !== null && formData.value.price > 0) {
    formPayload.append('final_price', formData.value.price.toFixed(2));
  }
  if (formData.value.cover) formPayload.append('cover', formData.value.cover);
  if (formData.value.enable_discount && formData.value.discount_price && formData.value.price) {
    const discount_percentage = ((formData.value.price - formData.value.discount_price) / formData.value.price * 100).toFixed(2);
    formPayload.append('discount_percentage', discount_percentage);
    formPayload.append('discount_deadline', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString());
  }
  formPayload.append('is_featured', formData.value.is_featured.toString());
  if (formData.value.faqs.length) formPayload.append('faqs', JSON.stringify(formData.value.faqs));
  if (formData.value.tags.length) formPayload.append('tags', JSON.stringify(formData.value.tags.map(tag => ({ tag }))));
  formPayload.append('ispublished', 'true');

  try {
    console.log('Publishing course with payload:', [...formPayload.entries()]);
    let response;
    if (draftId.value && draftSlug.value) {
      response = await api.put(`course/courses/${draftSlug.value}/`, formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      response = await api.post('course/courses/', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    console.log('Publish response:', response.data);

    if (formData.value.modules.length) {
      const newModules = formData.value.modules.filter(module => !module.id);
      const existingModules = formData.value.modules.filter(module => module.id);

      if (newModules.length) {
        const newModulePayload = {
          course: response.data.id,
          modules: newModules.map(module => ({
            title: module.title,
            description: module.description,
            order: module.order,
          })),
        };
        console.log('New module payload:', newModulePayload);
        const newModuleResponse = await api.post('modules/bulk_create/', newModulePayload);
        console.log('New module creation response:', newModuleResponse.data);

        newModuleResponse.data.forEach((savedModule: any, index: number) => {
          newModules[index].id = savedModule.id;
        });
      }

      for (const module of existingModules) {
        const updateModulePayload = {
          title: module.title,
          description: module.description,
          order: module.order,
        };
        await api.put(`modules/${module.id}/`, updateModulePayload);
      }

      for (const module of formData.value.modules) {
        if (!module.id) continue;
        for (const video of module.videos) {
          const videoPayload = {
            module: module.id,
            title: video.title,
            video_url: video.video_url,
          };
          if (video.id) {
            await api.put(`videos/${video.id}/`, videoPayload);
          } else {
            const videoResponse = await api.post('videos/', videoPayload);
            video.id = videoResponse.data.id;
          }
        }
      }
    }

    if (formData.value.video_url) {
      const defaultModule = formData.value.modules[0] || { id: null, title: 'Default Module', order: 1, description: 'Default module for video', videos: [] };
      if (!defaultModule.id) {
        const modulePayload = {
          course: response.data.id,
          modules: [{ title: defaultModule.title, order: defaultModule.order, description: defaultModule.description }],
        };
        const moduleResponse = await api.post('modules/bulk_create/', modulePayload);
        defaultModule.id = moduleResponse.data[0].id;
        formData.value.modules.push(defaultModule);
      }
      const videoPayload = {
        module: defaultModule.id,
        title: 'Course Intro Video',
        video_url: formData.value.video_url,
      };
      const videoResponse = await api.post('videos/', videoPayload);
      console.log('Video creation response:', videoResponse.data);
    }

    if (formData.value.video_file) {
      const defaultModule = formData.value.modules[0] || { id: null, title: 'Default Module', order: 1, description: 'Default module for video', videos: [] };
      if (!defaultModule.id) {
        const modulePayload = {
          course: response.data.id,
          modules: [{ title: defaultModule.title, order: defaultModule.order, description: defaultModule.description }],
        };
        const moduleResponse = await api.post('modules/bulk_create/', modulePayload);
        defaultModule.id = moduleResponse.data[0].id;
        formData.value.modules.push(defaultModule);
      }
      const documentFormData = new FormData();
      documentFormData.append('module', defaultModule.id!.toString());
      documentFormData.append('title', 'Course Video');
      documentFormData.append('document_file', formData.value.video_file);
      const documentResponse = await api.post('documents/', documentFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Document creation response:', documentResponse.data);
    }

    toast.success('Course published successfully!');
    clearLocalStorage();
    router.push({ name: 'instructor.course.added' });
    resetForm();
  } catch (error: any) {
    console.error('Error publishing course:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    let errorMessage = 'Failed to publish course';
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
            order: err.order?.[0] || '',
            description: err.description?.[0] || '',
            videos: [],
          }));
        } else if (key in errors.value) {
          errors.value[key as keyof typeof errors.value] = Array.isArray(value) ? value[0] : value;
          errorMessage += `: ${key} - ${Array.isArray(value) ? value[0] : value}`;
        }
      }
    }
    toast.error(errorMessage);
  }
};

const updateCourse = async () => {
  submitted.value = true;
  if (!validateStep(3, true)) return;

  const formPayload = new FormData();
  formPayload.append('title', formData.value.title);
  const descriptionParts = [formData.value.description];
  if (formData.value.short_description) descriptionParts.push(`Short Description: ${formData.value.short_description}`);
  if (formData.value.category) descriptionParts.push(`Category: ${formData.value.category}`);
  if (formData.value.level) descriptionParts.push(`Level: ${formData.value.level}`);
  if (formData.value.languages.length) descriptionParts.push(`Languages: ${formData.value.languages.join(', ')}`);
  if (formData.value.course_time) descriptionParts.push(`Course Time: ${formData.value.course_time}`);
  if (formData.value.total_lecture) descriptionParts.push(`Total Lectures: ${formData.value.total_lecture}`);
  if (formData.value.reviewer_message) descriptionParts.push(`Reviewer Message: ${formData.value.reviewer_message}`);
  formPayload.append('description', descriptionParts.join('\n\n'));
  if (formData.value.price !== null && formData.value.price > 0) {
    formPayload.append('final_price', formData.value.price.toFixed(2));
  }
  if (formData.value.cover) formPayload.append('cover', formData.value.cover);
  if (formData.value.enable_discount && formData.value.discount_price && formData.value.price) {
    const discount_percentage = ((formData.value.price - formData.value.discount_price) / formData.value.price * 100).toFixed(2);
    formPayload.append('discount_percentage', discount_percentage);
    formPayload.append('discount_deadline', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString());
  }
  formPayload.append('is_featured', formData.value.is_featured.toString());
  if (formData.value.faqs.length) formPayload.append('faqs', JSON.stringify(formData.value.faqs));
  if (formData.value.tags.length) formPayload.append('tags', JSON.stringify(formData.value.tags.map(tag => ({ tag }))));
  formPayload.append('ispublished', formData.value.ispublished ? 'true' : 'false');

  try {
    console.log('Updating course with payload:', [...formPayload.entries()]);
    const response = await api.put(`course/courses/${courseSlug.value}/`, formPayload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('Update response:', response.data);

    if (formData.value.modules.length) {
      const newModules = formData.value.modules.filter(module => !module.id);
      const existingModules = formData.value.modules.filter(module => module.id);

      if (newModules.length) {
        const newModulePayload = {
          course: response.data.id,
          modules: newModules.map(module => ({
            title: module.title,
            description: module.description,
            order: module.order,
          })),
        };
        console.log('New module payload:', newModulePayload);
        const newModuleResponse = await api.post('modules/bulk_create/', newModulePayload);
        console.log('New module creation response:', newModuleResponse.data);

        newModuleResponse.data.forEach((savedModule: any, index: number) => {
          newModules[index].id = savedModule.id;
        });
      }

      for (const module of existingModules) {
        const updateModulePayload = {
          title: module.title,
          description: module.description,
          order: module.order,
        };
        await api.put(`modules/${module.id}/`, updateModulePayload);
      }

      for (const module of formData.value.modules) {
        if (!module.id) continue;
        for (const video of module.videos) {
          const videoPayload = {
            module: module.id,
            title: video.title,
            video_url: video.video_url,
          };
          if (video.id) {
            await api.put(`videos/${video.id}/`, videoPayload);
          } else {
            const videoResponse = await api.post('videos/', videoPayload);
            video.id = videoResponse.data.id;
          }
        }
      }
    }

    if (formData.value.video_url) {
      const defaultModule = formData.value.modules[0] || { id: null, title: 'Default Module', order: 1, description: 'Default module for video', videos: [] };
      if (!defaultModule.id) {
        const modulePayload = {
          course: response.data.id,
          modules: [{ title: defaultModule.title, order: defaultModule.order, description: defaultModule.description }],
        };
        const moduleResponse = await api.post('modules/bulk_create/', modulePayload);
        defaultModule.id = moduleResponse.data[0].id;
        formData.value.modules.push(defaultModule);
      }
      const videoPayload = {
        module: defaultModule.id,
        title: 'Course Intro Video',
        video_url: formData.value.video_url,
      };
      const videoResponse = await api.post('videos/', videoPayload);
      console.log('Video creation response:', videoResponse.data);
    }

    if (formData.value.video_file) {
      const defaultModule = formData.value.modules[0] || { id: null, title: 'Default Module', order: 1, description: 'Default module for video', videos: [] };
      if (!defaultModule.id) {
        const modulePayload = {
          course: response.data.id,
          modules: [{ title: defaultModule.title, order: defaultModule.order, description: defaultModule.description }],
        };
        const moduleResponse = await api.post('modules/bulk_create/', modulePayload);
        defaultModule.id = moduleResponse.data[0].id;
        formData.value.modules.push(defaultModule);
      }
      const documentFormData = new FormData();
      documentFormData.append('module', defaultModule.id!.toString());
      documentFormData.append('title', 'Course Video');
      documentFormData.append('document_file', formData.value.video_file);
      const documentResponse = await api.post('documents/', documentFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Document creation response:', documentResponse.data);
    }

    toast.success('Course updated successfully!');
    clearLocalStorage();
    router.push({ name: 'instructor.courses' });
    resetForm();
  } catch (error: any) {
    console.error('Error updating course:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    let errorMessage = 'Failed to update course';
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
            order: err.order?.[0] || '',
            description: err.description?.[0] || '',
            videos: [],
          }));
        } else if (key in errors.value) {
          errors.value[key as keyof typeof errors.value] = Array.isArray(value) ? value[0] : value;
          errorMessage += `: ${key} - ${Array.isArray(value) ? value[0] : value}`;
        }
      }
    }
    toast.error(errorMessage);
  }
};

const resetForm = () => {
  formData.value = {
    title: '',
    short_description: '',
    category: '',
    level: '',
    languages: [],
    is_featured: false,
    course_time: '',
    total_lecture: '',
    price: null,
    discount_price: null,
    enable_discount: false,
    description: '',
    cover: null,
    video_url: '',
    video_file: null,
    modules: [],
    faqs: [],
    tags: [],
    reviewer_message: '',
    assets_licensed: false,
  };
  submitted.value = false;
  draftId.value = null;
  draftSlug.value = null;
  selectedDraft.value = '';
  courseId.value = null;
  errors.value = {
    title: '',
    short_description: '',
    category: '',
    level: '',
    languages: '',
    is_featured: '',
    course_time: '',
    total_lecture: '',
    price: '',
    discount_price: '',
    enable_discount: '',
    description: '',
    cover: '',
    video_url: '',
    video_file: '',
    modules: [],
    faqs: [],
    tags: '',
    reviewer_message: '',
    assets_licensed: '',
  };
  currentStep.value = 0;
  clearLocalStorage();
  if (stepperInstance.value) {
    try {
      stepperInstance.value.to(1);
    } catch (error) {
      console.error('Error resetting stepper:', error);
    }
  }
};
</script>