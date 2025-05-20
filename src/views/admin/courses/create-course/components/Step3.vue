
<template>
  <div id="step-3" role="tabpanel" class="content fade" aria-labelledby="steppertrigger3">
    <h4>Curriculum</h4>
    <hr>
    <b-row>
      <div class="d-sm-flex justify-content-sm-between align-items-center mb-3">
        <h5 class="mb-2 mb-sm-0">Upload Module</h5>
        <a href="#" class="btn btn-sm btn-primary-soft mb-0" @click="openAddModuleModal">
          <BIconPlusCircle class="me-2" />
          Add Module
        </a>
      </div>

      <b-accordion class="accordion-icon accordion-bg-light" id="accordionExample2">
        <b-accordion-item
          v-for="(module, index) in formData.modules"
          :key="`module-${module.id || index}`"
          :title="module.title || `Module ${index + 1}`"
          button-class="fw-bold rounded d-inline-block d-block pe-5"
          header-tag="h6"
          body-class="mt-3"
          header-class="font-base"
          class="mb-3"
        >
          <div
            v-for="video in module.videos"
            :key="video.id || video.tempId"
            class="d-flex justify-content-between align-items-center"
          >
            <div class="position-relative">
              <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                <font-awesome-icon :icon="faPlay" />
              </a>
              <span class="ms-2 mb-0 h6 fw-light">{{ video.title }}</span>
            </div>
            <div>
              <a
                href="#"
                class="btn btn-sm btn-success-soft btn-round me-1 mb-1 mb-md-0"
                @click="openEditVideoModal(video, module.id || index)"
              >
                <font-awesome-icon :icon="faEdit" class="fa-fw" />
              </a>
              <b-button
                variant="danger-soft"
                size="sm"
                class="btn-round mb-0"
                @click="deleteVideo(video, module)"
              >
                <font-awesome-icon :icon="faTimes" class="fa-fw" />
              </b-button>
            </div>
          </div>
          <hr v-if="module.videos.length" />
          <a href="#" class="btn btn-sm btn-dark mb-0" @click="openAddVideoModal(module.id || index)">
            <BIconPlusCircle class="me-2" />
            Add Video
          </a>
        </b-accordion-item>
      </b-accordion>
      <p v-if="!formData.modules.length" class="text-muted mt-3">No modules added yet.</p>
      <div class="d-flex justify-content-between mt-3">
        <b-button variant="secondary" class="prev-btn mb-0" @click="previousPage">Previous</b-button>
        <div>
          <b-button variant="outline-primary" class="mb-0 mr-2" @click="saveDraft">Save as Draft</b-button>
          <b-button variant="primary" class="next-btn mb-0" @click="nextPage">Next</b-button>
        </div>
      </div>
    </b-row>

    <!-- Module Modal -->
    <b-modal
      id="addModule"
      :title="selectedModule ? 'Edit Module' : 'Add Module'"
      header-class="bg-dark"
      title-class="text-white"
      :ok-title="loading ? 'Saving...' : 'Save Module'"
      ok-variant="success"
      cancel-title="Close"
      cancel-variant="danger-soft"
      :ok-disabled="loading"
      v-model="showModuleModal"
      @ok="saveModule"
      @hidden="resetModuleModal"
    >
      <b-form class="row text-start g-3">
        <b-col cols="12">
          <b-form-group>
            <template #label>
              Module name <span class="text-danger">*</span>
            </template>
            <b-form-input
              v-model="moduleForm.title"
              placeholder="Enter module name"
              :class="{ 'is-invalid': moduleFormErrors.title }"
              required
            />
            <div v-if="moduleFormErrors.title" class="invalid-feedback">
              {{ moduleFormErrors.title }}
            </div>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Order">
            <b-form-input
              v-model.number="moduleForm.order"
              type="number"
              placeholder="Enter module order"
              :class="{ 'is-invalid': moduleFormErrors.order }"
            />
            <div v-if="moduleFormErrors.order" class="invalid-feedback">
              {{ moduleFormErrors.order }}
            </div>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Description">
            <b-form-textarea
              v-model="moduleForm.description"
              rows="4"
              placeholder="Enter module description"
            />
          </b-form-group>
        </b-col>
      </b-form>
    </b-modal>

    <!-- Video Modal -->
    <b-modal
      id="addVideo"
      :title="selectedVideo ? 'Edit Video' : 'Add Video'"
      header-class="bg-dark"
      title-class="text-white"
      :ok-title="loading ? 'Saving...' : 'Save Video'"
      ok-variant="success"
      cancel-title="Close"
      cancel-variant="danger-soft"
      :ok-disabled="loading"
      v-model="showVideoModal"
      @ok="saveVideo"
      @hidden="resetVideoModal"
    >
      <b-form class="row text-start g-3">
        <b-col md="6">
          <b-form-group label="Video name">
            <b-form-input
              v-model="videoForm.title"
              placeholder="Enter video name"
              :class="{ 'is-invalid': videoFormErrors.title }"
              required
            />
            <div v-if="videoFormErrors.title" class="invalid-feedback">
              {{ videoFormErrors.title }}
            </div>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Video link">
            <b-form-input
              v-model="videoForm.video_url"
              placeholder="Enter video link"
              :class="{ 'is-invalid': videoFormErrors.video_url }"
              required
            />
            <div v-if="videoFormErrors.video_url" class="invalid-feedback">
              {{ videoFormErrors.video_url }}
            </div>
          </b-form-group>
        </b-col>
        <b-col cols="12" class="mt-3">
          <b-form-group label="Description">
            <b-form-textarea
              v-model="videoForm.description"
              rows="4"
              placeholder="Enter video description"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6" class="mt-3">
          <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input
              type="radio"
              class="btn-check"
              name="options"
              id="option1"
              v-model="videoForm.is_free"
              :value="true"
              checked
            />
            <label class="btn btn-sm btn-light btn-primary-soft-check border-0 m-0" for="option1">Free</label>
            <input
              type="radio"
              class="btn-check"
              name="options"
              id="option2"
              v-model="videoForm.is_free"
              :value="false"
            />
            <label class="btn btn-sm btn-light btn-primary-soft-check border-0 m-0" for="option2">Premium</label>
          </div>
        </b-col>
      </b-form>
    </b-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { faPlay, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { BIconPlusCircle } from 'bootstrap-icons-vue';

const toast = useToast();

const props = defineProps<{
  formData: {
    modules: {
      id?: number;
      title: string;
      order: number;
      description: string;
      videos: { id?: number; tempId?: string; title: string; video_url: string; description?: string; is_free: boolean }[];
    }[];
  };
  nextPage: () => void;
  previousPage: () => void;
  errors: {
    modules: { title: string; order: string; description: string; videos: { title: string; video_url: string }[] }[];
  };
  saveDraft: () => void;
  courseId: number | null;
}>();

const emit = defineEmits(['update:formData']);

const showModuleModal = ref(false);
const showVideoModal = ref(false);
const selectedModule = ref<any>(null);
const selectedModuleIndex = ref<number | null>(null);
const selectedVideo = ref<any>(null);
const loading = ref(false);

const moduleForm = reactive({
  title: '',
  order: 0,
  description: '',
});

const moduleFormErrors = reactive({
  title: '',
  order: '',
});

const videoForm = reactive({
  moduleId: null as number | null,
  title: '',
  video_url: '',
  description: '',
  is_free: true,
});

const videoFormErrors = reactive({
  title: '',
  video_url: '',
});

const openAddModuleModal = () => {
  selectedModule.value = null;
  selectedModuleIndex.value = null;
  moduleForm.title = '';
  moduleForm.order = props.formData.modules.length + 1;
  moduleForm.description = '';
  moduleFormErrors.title = '';
  moduleFormErrors.order = '';
  showModuleModal.value = true;
};

const openAddVideoModal = (moduleId: number) => {
  selectedVideo.value = null;
  videoForm.moduleId = moduleId;
  videoForm.title = '';
  videoForm.video_url = '';
  videoForm.description = '';
  videoForm.is_free = true;
  videoFormErrors.title = '';
  videoFormErrors.video_url = '';
  showVideoModal.value = true;
};

const openEditVideoModal = (video: any, moduleId: number) => {
  selectedVideo.value = video;
  videoForm.moduleId = moduleId;
  videoForm.title = video.title;
  videoForm.video_url = video.video_url;
  videoForm.description = video.description || '';
  videoForm.is_free = video.is_free;
  videoFormErrors.title = '';
  videoFormErrors.video_url = '';
  showVideoModal.value = true;
};

const saveModule = async (bvModalEvt: Event) => {
  bvModalEvt.preventDefault();
  if (!moduleForm.title) {
    moduleFormErrors.title = 'Module name is required';
    toast.error('Please fill in all required fields');
    return;
  }
  if (moduleForm.order < 1) {
    moduleFormErrors.order = 'Order must be positive';
    toast.error('Please fill in all required fields');
    return;
  }

  try {
    loading.value = true;
    const moduleData = {
      title: moduleForm.title,
      order: moduleForm.order,
      description: moduleForm.description,
      videos: selectedModule.value?.videos || [],
    };

    if (selectedModule.value && selectedModuleIndex.value !== null) {
      props.formData.modules[selectedModuleIndex.value] = moduleData;
    } else {
      props.formData.modules.push(moduleData);
    }

    emit('update:formData', props.formData);
    toast.success(selectedModule.value ? 'Module updated successfully!' : 'Module added successfully!');
    showModuleModal.value = false;
  } catch (err) {
    console.error('Error saving module:', err);
    toast.error('Failed to save module');
  } finally {
    loading.value = false;
  }
};

const saveVideo = async (bvModalEvt: Event) => {
  bvModalEvt.preventDefault();
  if (!videoForm.title) {
    videoFormErrors.title = 'Video name is required';
    toast.error('Please fill in all required fields');
    return;
  }
  if (!videoForm.video_url) {
    videoFormErrors.video_url = 'Video link is required';
    toast.error('Please fill in all required fields');
    return;
  }

  try {
    loading.value = true;
    const videoData = {
      id: selectedVideo.value?.id,
      tempId: selectedVideo.value?.tempId || `temp-video-${Date.now()}`,
      title: videoForm.title,
      video_url: videoForm.video_url,
      description: videoForm.description,
      is_free: videoForm.is_free,
    };

    const module = props.formData.modules.find((m, index) => (m.id || index) === videoForm.moduleId);
    if (module) {
      if (selectedVideo.value) {
        const videoIndex = module.videos.findIndex(v => v.id === selectedVideo.value.id || v.tempId === selectedVideo.value.tempId);
        module.videos[videoIndex] = videoData;
      } else {
        module.videos.push(videoData);
      }
    }

    emit('update:formData', props.formData);
    toast.success(selectedVideo.value ? 'Video updated successfully!' : 'Video added successfully!');
    showVideoModal.value = false;
  } catch (err) {
    console.error('Error saving video:', err);
    toast.error('Failed to save video');
  } finally {
    loading.value = false;
  }
};

const deleteVideo = (video: any, module: any) => {
  if (!confirm('Are you sure you want to delete this video?')) return;
  module.videos = module.videos.filter(v => v.id !== video.id && v.tempId !== video.tempId);
  emit('update:formData', props.formData);
  toast.success('Video deleted successfully!');
};

const resetModuleModal = () => {
  showModuleModal.value = false;
  selectedModule.value = null;
  selectedModuleIndex.value = null;
  moduleForm.title = '';
  moduleForm.order = 0;
  moduleForm.description = '';
  moduleFormErrors.title = '';
  moduleFormErrors.order = '';
};

const resetVideoModal = () => {
  showVideoModal.value = false;
  selectedVideo.value = null;
  videoForm.moduleId = null;
  videoForm.title = '';
  videoForm.video_url = '';
  videoForm.description = '';
  videoForm.is_free = true;
  videoFormErrors.title = '';
  videoFormErrors.video_url = '';
};

// Initialize modules if needed
if (!props.formData.modules) {
  props.formData.modules = [];
}
</script>