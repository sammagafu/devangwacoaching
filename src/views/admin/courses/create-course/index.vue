<!-- src/views/admin/courses/create-course/index.vue -->
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
                  <b-form @submit.prevent="publishCourse">
                    <Step1 :form-data="formData" :next-page="nextPage" :errors="errors" :save-draft="saveDraft" />
                    <Step2 :form-data="formData" :next-page="nextPage" :previous-page="previousPage" :errors="errors" :save-draft="saveDraft" />
                    <Step3 :form-data="formData" :next-page="nextPage" :previous-page="previousPage" :errors="errors" :save-draft="saveDraft" :course-id="courseId" @update:formData="updateFormData" />
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
const stepperRef = ref<HTMLElement | null>(null);
const stepperInstance = ref<any>(null);
const currentStep = ref(0);
const submitted = ref(false);
const drafts = ref([]);
const selectedDraft = ref('');
const draftId = ref(null as number | null);
const draftSlug = ref(null as string | null);
const courseId = ref(null as number | null);

const formData = ref({
  title: '',
  description: '',
  price: null as number | null,
  cover: null as File | null,
  discount_percentage: null as number | null,
  discount_deadline: null as string | null,
  is_featured: false,
  modules: [] as { id?: number; title: string; description: string; order: number; videos: { id?: number; tempId?: string; title: string; video_url: string }[]; documents: { id?: number; tempId?: string; title: string; document_file?: File | string }[] }[],
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

// Debounced save to localStorage
const saveToLocalStorage = debounce(() => {
  const formDataCopy = JSON.parse(JSON.stringify(formData.value));
  // Remove File objects to avoid serialization issues
  formDataCopy.cover = null;
  formDataCopy.modules.forEach((module: any) => {
    module.documents.forEach((doc: any) => {
      if (doc.document_file instanceof File) {
        doc.document_file = null;
      }
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
    // Ensure File objects are not restored
    parsedData.cover = null;
    parsedData.modules.forEach((module: any) => {
      module.documents.forEach((doc: any) => {
        if (doc.document_file && typeof doc.document_file !== 'string') {
          doc.document_file = null;
        }
      });
    });
    formData.value = parsedData;
  }
  if (savedStep) {
    currentStep.value = parseInt(savedStep);
    if (stepperInstance.value && currentStep.value >= 0 && currentStep.value <= 3) {
      stepperInstance.value.to(currentStep.value + 1); // Stepper uses 1-based indexing
    }
  }
};

// Clear localStorage
const clearLocalStorage = () => {
  localStorage.removeItem('courseFormData');
  localStorage.removeItem('courseFormStep');
  localStorage.removeItem('courseFormStep3');
};

// Update formData and save to localStorage
const updateFormData = (newFormData: any) => {
  formData.value = { ...formData.value, ...newFormData };
  saveToLocalStorage();
};

onMounted(async () => {
  if (stepperRef.value) {
    try {
      stepperInstance.value = new Stepper(stepperRef.value, {
        linear: false,
        animation: true,
      });
      stepperRef.value.addEventListener('show.bs-stepper', (event: any) => {
        currentStep.value = event.detail.indexStep;
        saveToLocalStorage();
      });
    } catch (error) {
      console.error('Failed to initialize stepper:', error);
      toast.error('Failed to initialize form stepper');
    }
  }
  loadFromLocalStorage();
  await fetchDrafts();
});

const fetchDrafts = async () => {
  try {
    const response = await api.get('course/courses/drafts/');
    drafts.value = response.data;
    console.log('Drafts fetched:', response.data);
  } catch (error) {
    console.error('Error fetching drafts:', error);
    toast.error('Failed to fetch drafts');
  }
};

const loadDraft = async () => {
  if (!selectedDraft.value) {
    resetForm();
    draftId.value = null;
    draftSlug.value = null;
    return;
  }
  try {
    const response = await api.get(`course/courses/${selectedDraft.value}/`);
    const courseData = response.data;
    console.log('Course data received:', courseData);
    formData.value = {
      title: courseData.title || '',
      description: courseData.description || '',
      price: parseFloat(courseData.price) || null,
      cover: null,
      discount_percentage: parseFloat(courseData.discount_percentage) || null,
      discount_deadline: courseData.discount_deadline ? new Date(courseData.discount_deadline).toISOString().slice(0, 16) : null,
      is_featured: courseData.is_featured || false,
      modules: courseData.modules?.map((module: any, index: number) => ({
        id: module.id,
        title: module.title || '',
        description: module.description || '',
        order: module.order || index + 1,
        videos: module.videos?.map((video: any) => ({
          id: video.id,
          tempId: `temp-video-${Date.now()}-${video.id}`,
          title: video.title,
          video_url: video.video_url,
        })) || [],
        documents: module.documents?.map((document: any) => ({
          id: document.id,
          tempId: `temp-document-${Date.now()}-${document.id}`,
          title: document.title,
          document_file: document.document_file,
        })) || [],
      })) || [],
      faqs: courseData.faqs?.map((faq: any) => ({
        question: faq.question || '',
        answer: faq.answer || '',
      })) || [],
      tags: courseData.tags?.map((tag: any) => tag.tag) || [],
    };
    draftId.value = courseData.id;
    draftSlug.value = courseData.slug;
    courseId.value = courseData.id;
    saveToLocalStorage();
    toast.success('Draft loaded successfully');
  } catch (error) {
    console.error('Error loading draft:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    toast.error('Failed to load draft: ' + (error.response?.data?.message || error.message || 'Unknown error'));
  }
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
    if (formData.value.price === null || formData.value.price <= 0) {
      errors.value.price = 'Valid price is required';
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

  if (!formData.value.title) {
    toast.error('Please provide a title before saving as draft');
    return;
  }

  const formPayload = new FormData();
  formPayload.append('title', formData.value.title);
  if (formData.value.description) formPayload.append('description', formData.value.description);
  if (formData.value.price !== null && formData.value.price > 0) {
    formPayload.append('price', formData.value.price.toFixed(2));
  }
  if (formData.value.cover) formPayload.append('cover', formData.value.cover);
  if (formData.value.discount_percentage !== null) {
    formPayload.append('discount_percentage', formData.value.discount_percentage.toFixed(2));
  }
  if (formData.value.discount_deadline) {
    formPayload.append('discount_deadline', new Date(formData.value.discount_deadline).toISOString());
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
      const modulePayload = {
        course: response.data.id,
        modules: formData.value.modules.map(module => ({
          id: module.id,
          title: module.title,
          description: module.description,
          order: module.order,
        })),
      };
      console.log('Module payload:', modulePayload);
      const moduleResponse = await api.post('course/modules/bulk_create/', modulePayload);
      console.log('Module creation response:', moduleResponse.data);

      // Update module IDs from response
      moduleResponse.data.forEach((savedModule: any, index: number) => {
        formData.value.modules[index].id = savedModule.id;
      });

      // Save videos
      for (const module of formData.value.modules) {
        for (const video of module.videos) {
          const videoPayload = {
            module: module.id,
            title: video.title,
            video_url: video.video_url,
          };
          if (video.id) {
            await api.put(`course/videos/${video.id}/`, videoPayload);
          } else {
            const videoResponse = await api.post('course/videos/', videoPayload);
            video.id = videoResponse.data.id;
          }
        }
      }

      // Save documents
      for (const module of formData.value.modules) {
        for (const document of module.documents) {
          if (document.document_file instanceof File || (document.document_file && typeof document.document_file === 'string')) {
            const documentFormData = new FormData();
            documentFormData.append('module', module.id!.toString());
            documentFormData.append('title', document.title);
            if (document.document_file instanceof File) {
              documentFormData.append('document_file', document.document_file);
            }
            if (document.id) {
              await api.put(`course/documents/${document.id}/`, documentFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });
            } else {
              const documentResponse = await api.post('course/documents/', documentFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });
              document.id = documentResponse.data.id;
              document.document_file = documentResponse.data.document_file;
            }
          }
        }
      }
    }

    toast.success('Draft saved successfully!');
    await fetchDrafts();
    resetForm();
  } catch (error: any) {
    console.error('Error saving draft:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
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
            description: err.description?.[0] || '',
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
  if (formData.value.description) formPayload.append('description', formData.value.description);
  if (formData.value.price !== null && formData.value.price > 0) {
    formPayload.append('price', formData.value.price.toFixed(2));
  }
  if (formData.value.cover) formPayload.append('cover', formData.value.cover);
  if (formData.value.discount_percentage !== null) {
    formPayload.append('discount_percentage', formData.value.discount_percentage.toFixed(2));
  }
  if (formData.value.discount_deadline) {
    formPayload.append('discount_deadline', new Date(formData.value.discount_deadline).toISOString());
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
      const modulePayload = {
        course: response.data.id,
        modules: formData.value.modules.map(module => ({
          id: module.id,
          title: module.title,
          description: module.description,
          order: module.order,
        })),
      };
      console.log('Module payload:', modulePayload);
      const moduleResponse = await api.post('course/modules/bulk_create/', modulePayload);
      console.log('Module creation response:', moduleResponse.data);

      // Update module IDs
      moduleResponse.data.forEach((savedModule: any, index: number) => {
        formData.value.modules[index].id = savedModule.id;
      });

      // Save videos
      for (const module of formData.value.modules) {
        for (const video of module.videos) {
          const videoPayload = {
            module: module.id,
            title: video.title,
            video_url: video.video_url,
          };
          if (video.id) {
            await api.put(`course/videos/${video.id}/`, videoPayload);
          } else {
            const videoResponse = await api.post('course/videos/', videoPayload);
            video.id = videoResponse.data.id;
          }
        }
      }

      // Save documents
      for (const module of formData.value.modules) {
        for (const document of module.documents) {
          if (document.document_file instanceof File || (document.document_file && typeof document.document_file === 'string')) {
            const documentFormData = new FormData();
            documentFormData.append('module', module.id!.toString());
            documentFormData.append('title', document.title);
            if (document.document_file instanceof File) {
              documentFormData.append('document_file', document.document_file);
            }
            if (document.id) {
              await api.put(`course/documents/${document.id}/`, documentFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });
            } else {
              const documentResponse = await api.post('course/documents/', documentFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });
              document.id = documentResponse.data.id;
              document.document_file = documentResponse.data.document_file;
            }
          }
        }
      }
    }

    toast.success('Course published successfully!');
    clearLocalStorage();
    router.push({ name: 'instructor.course.added' });
    resetForm();
  } catch (error: any) {
    console.error('Error publishing course:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
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
            description: err.description?.[0] || '',
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
  draftSlug.value = null;
  selectedDraft.value = '';
  courseId.value = null;
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