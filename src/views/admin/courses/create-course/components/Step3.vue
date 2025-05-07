<!-- src/views/admin/courses/create-course/components/Step3.vue -->
<template>
  <div id="step-3" role="tabpanel" class="content fade" aria-labelledby="steppertrigger3">
    <!-- Loading Overlay -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="text-white mt-2">Processing...</p>
    </div>

    <h4>Curriculum</h4>
    <hr>
    <b-row class="g-4">
      <b-col cols="12">
        <div class="bg-light border rounded p-4">
          <div class="d-sm-flex justify-content-sm-between align-items-center mb-3">
            <h5 class="mb-2 mb-sm-0">Modules</h5>
            <a href="#" class="btn btn-sm btn-primary-soft mb-0" data-bs-toggle="modal" data-bs-target="#addModule" @click="openAddModuleModal">
              <font-awesome-icon :icon="faPlusCircle" class="me-2" />
              Add Module
            </a>
          </div>
          <b-accordion class="accordion-icon accordion-bg-light" id="moduleAccordion">
            <b-accordion-item
              v-for="(module, index) in formData.modules"
              :key="`module-${module.id || module.order}`"
              :title="module.title || `Module ${module.order}`"
              button-class="fw-bold rounded d-inline-block d-block pe-5"
              header-tag="h6"
              body-class="mt-3"
              header-class="font-base"
              class="mb-3"
            >
              <div class="mb-3">
                <p class="text-muted small">{{ module.description || 'No description' }}</p>
                <small class="text-muted">Order: {{ module.order }}</small>
                <div class="mt-2">
                  <a
                    href="#"
                    class="btn btn-sm btn-success-soft btn-round me-1 mb-1 mb-md-0"
                    data-bs-toggle="modal"
                    data-bs-target="#addModule"
                    @click="openEditModuleModal(module, index)"
                  >
                    <font-awesome-icon :icon="faEdit" class="fa-fw" />
                  </a>
                  <b-button variant="danger-soft" size="sm" class="btn-round mb-0" @click="removeModule(index)">
                    <font-awesome-icon :icon="faTimes" class="fa-fw" />
                  </b-button>
                </div>
              </div>
              <h6 class="mt-3">Videos</h6>
              <div v-for="video in module.videos" :key="video.id || video.tempId" class="d-flex justify-content-between align-items-center mb-2">
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
                    data-bs-toggle="modal"
                    data-bs-target="#addVideo"
                    @click="openEditVideoModal(video, module.id || module.order)"
                  >
                    <font-awesome-icon :icon="faEdit" class="fa-fw" />
                  </a>
                  <b-button variant="danger-soft" size="sm" class="btn-round mb-0" @click="deleteVideo(video, module)">
                    <font-awesome-icon :icon="faTimes" class="fa-fw" />
                  </b-button>
                </div>
              </div>
              <a
                href="#"
                class="btn btn-sm btn-dark mb-3"
                data-bs-toggle="modal"
                data-bs-target="#addVideo"
                @click="openAddVideoModal(module.id || module.order)"
              >
                <font-awesome-icon :icon="faPlusCircle" class="me-2" />
                Add Video
              </a>
              <h6 class="mt-3">Documents</h6>
              <div v-for="document in module.documents" :key="document.id || document.tempId" class="d-flex justify-content-between align-items-center mb-2">
                <div class="position-relative">
                  <a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                    <font-awesome-icon :icon="faFile" />
                  </a>
                  <span class="ms-2 mb-0 h6 fw-light">{{ document.title }}</span>
                </div>
                <div>
                  <a
                    href="#"
                    class="btn btn-sm btn-success-soft btn-round me-1 mb-1 mb-md-0"
                    data-bs-toggle="modal"
                    data-bs-target="#addDocument"
                    @click="openEditDocumentModal(document, module.id || module.order)"
                  >
                    <font-awesome-icon :icon="faEdit" class="fa-fw" />
                  </a>
                  <b-button variant="danger-soft" size="sm" class="btn-round mb-0" @click="deleteDocument(document, module)">
                    <font-awesome-icon :icon="faTimes" class="fa-fw" />
                  </b-button>
                </div>
              </div>
              <a
                href="#"
                class="btn btn-sm btn-dark mb-0"
                data-bs-toggle="modal"
                data-bs-target="#addDocument"
                @click="openAddDocumentModal(module.id || module.order)"
              >
                <font-awesome-icon :icon="faPlusCircle" class="me-2" />
                Add Document
              </a>
            </b-accordion-item>
          </b-accordion>
          <p v-if="!formData.modules.length" class="text-muted mt-3">No modules added yet.</p>
        </div>
      </b-col>

      <div class="d-md-flex justify-content-between align-items-start mt-4">
        <b-button variant="secondary" class="prev-btn mb-2 mb-md-0" :disabled="loading" @click="previousPage">Previous</b-button>
        <div>
          <b-button variant="outline-primary" class="mb-0 mr-2" :disabled="loading" @click="saveDraft">Save as Draft</b-button>
          <b-button variant="primary" class="next-btn mb-2 mb-md-0" :disabled="loading" @click="nextPage">Next</b-button>
        </div>
      </div>
    </b-row>

    <!-- Module Modal -->
    <b-modal
      v-if="showModuleModal"
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
          <b-form-group label="Module Title *">
            <b-form-input
              v-model="moduleForm.title"
              placeholder="Enter module title"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Module Description *">
            <b-form-textarea
              v-model="moduleForm.description"
              placeholder="Enter module description"
              rows="3"
              required
            ></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Order *">
            <b-form-input
              type="number"
              v-model.number="moduleForm.order"
              placeholder="Enter module order"
              required
            ></b-form-input>
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
      @hidden="resetModal"
    >
      <b-form class="row text-start g-3">
        <b-col cols="12">
          <b-form-group label="Module *">
            <b-form-select
              v-model="videoForm.module"
              :options="moduleOptions"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Video Title *">
            <b-form-input
              v-model="videoForm.title"
              placeholder="Enter video title"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Video URL *">
            <b-form-input
              v-model="videoForm.video_url"
              placeholder="Enter video URL (e.g., https://www.youtube.com/watch?v=...)"
              required
            ></b-form-input>
            <small class="form-text text-muted">Provide a URL to an external video (e.g., YouTube, Vimeo).</small>
            <div v-if="videoForm.video_url" class="mt-2">
              <p>Current Video: <a :href="videoForm.video_url" target="_blank">{{ videoForm.video_url }}</a></p>
            </div>
          </b-form-group>
        </b-col>
      </b-form>
    </b-modal>

    <!-- Document Modal -->
    <b-modal
      id="addDocument"
      :title="selectedDocument ? 'Edit Document' : 'Add Document'"
      header-class="bg-dark"
      title-class="text-white"
      :ok-title="loading ? 'Saving...' : 'Save Document'"
      ok-variant="success"
      cancel-title="Close"
      cancel-variant="danger-soft"
      :ok-disabled="loading"
      v-model="showDocumentModal"
      @ok="saveDocument"
      @hidden="resetModal"
    >
      <b-form class="row text-start g-3">
        <b-col cols="12">
          <b-form-group label="Module *">
            <b-form-select
              v-model="documentForm.module"
              :options="moduleOptions"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Document Title *">
            <b-form-input
              v-model="documentForm.title"
              placeholder="Enter document title"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Document File">
            <b-form-file
              v-model="documentForm.document_file"
              accept=".pdf,.doc,.docx"
              placeholder="Choose a document file..."
              @change="onDocumentChange"
            ></b-form-file>
            <small class="form-text text-muted">Upload a document file (e.g., PDF, DOC).</small>
            <div v-if="documentForm.currentDocument" class="mt-2">
              <p>Current Document: <a :href="documentForm.currentDocument" target="_blank">{{ documentForm.currentDocument }}</a></p>
            </div>
          </b-form-group>
        </b-col>
      </b-form>
    </b-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import authService from '@/services/authService';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { faPlay, faEdit, faTimes, faPlusCircle, faFile } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';

const $toast = useToast();

const props = defineProps<{
  formData: {
    modules: { id?: number; title: string; description: string; order: number; videos: { id?: number; tempId?: string; title: string; video_url: string }[]; documents: { id?: number; tempId?: string; title: string; document_file?: File | string }[] }[];
  };
  nextPage: () => void;
  previousPage: () => void;
  errors: {
    modules: { title: string; description: string }[];
  };
  saveDraft: () => void;
  courseId: number | null;
}>();

const emit = defineEmits(['update:formData']);

const showModuleModal = ref(false);
const showVideoModal = ref(false);
const showDocumentModal = ref(false);
const selectedModuleId = ref<number | null>(null);
const selectedModule = ref<any>(null);
const selectedModuleIndex = ref<number | null>(null);
const selectedVideo = ref<any>(null);
const selectedDocument = ref<any>(null);
const loading = ref(false);

const moduleForm = reactive({
  title: '',
  description: '',
  order: 0,
});

const videoForm = reactive({
  module: null as number | null,
  title: '',
  video_url: '',
});

const documentForm = reactive({
  module: null as number | null,
  title: '',
  document_file: null as File | null,
  currentDocument: null as string | null,
});

const moduleOptions = computed(() =>
  props.formData.modules.map(module => ({
    value: module.id || module.order,
    text: module.title || `Module ${module.order}`,
  }))
);

// Debounced save to localStorage
const saveToLocalStorage = debounce(() => {
  console.log('Saving to localStorage');
  const formDataCopy = JSON.parse(JSON.stringify(props.formData));
  // Remove File objects to avoid serialization issues
  formDataCopy.modules.forEach((module: any) => {
    module.documents.forEach((doc: any) => {
      if (doc.document_file instanceof File) {
        doc.document_file = null;
      }
    });
  });
  localStorage.setItem('courseFormStep3', JSON.stringify(formDataCopy));
}, 300);

// Watch formData changes and save to localStorage
watch(
  () => props.formData,
  () => {
    saveToLocalStorage();
  },
  { deep: true }
);

const openAddModuleModal = () => {
  console.log('Opening add module modal');
  selectedModuleId.value = null;
  selectedModule.value = null;
  selectedModuleIndex.value = null;
  moduleForm.title = '';
  moduleForm.description = '';
  moduleForm.order = props.formData.modules.length + 1;
  showModuleModal.value = true;
};

const openEditModuleModal = (module: any, index: number) => {
  console.log('Opening edit module modal', module, index);
  selectedModuleId.value = module.id || module.order;
  selectedModule.value = module;
  selectedModuleIndex.value = index;
  moduleForm.title = module.title;
  moduleForm.description = module.description;
  moduleForm.order = module.order;
  showModuleModal.value = true;
};

const saveModule = async (bvModalEvt: Event) => {
  bvModalEvt.preventDefault();
  if (!moduleForm.title || !moduleForm.description || moduleForm.order < 1) {
    $toast.error('Please fill in all required fields');
    return;
  }

  try {
    loading.value = true;
    console.log('Saving module:', moduleForm);
    const moduleData = {
      title: moduleForm.title,
      description: moduleForm.description,
      order: moduleForm.order,
      videos: selectedModule.value?.videos || [],
      documents: selectedModule.value?.documents || [],
    };

    if (selectedModule.value && selectedModuleIndex.value !== null) {
      props.formData.modules[selectedModuleIndex.value] = { ...moduleData, id: selectedModule.value.id };
    } else {
      props.formData.modules.push(moduleData);
    }

    emit('update:formData', props.formData);
    $toast.success(selectedModule.value ? 'Module updated successfully!' : 'Module added successfully!');
    showModuleModal.value = false;
  } catch (err) {
    console.error('Error saving module:', err);
    $toast.error('Failed to save module');
  } finally {
    loading.value = false;
  }
};

const removeModule = (index: number) => {
  if (!confirm('Are you sure you want to delete this module?')) return;
  console.log('Removing module at index:', index);
  props.formData.modules.splice(index, 1);
  props.formData.modules.forEach((module, i) => {
    module.order = i + 1;
  });
  emit('update:formData', props.formData);
  $toast.success('Module deleted successfully!');
};

const openAddVideoModal = (moduleId: number | null = null) => {
  console.log('Opening add video modal, moduleId:', moduleId);
  selectedModuleId.value = moduleId;
  selectedVideo.value = null;
  videoForm.module = moduleId || null;
  videoForm.title = '';
  videoForm.video_url = '';
  showVideoModal.value = true;
};

const openEditVideoModal = (video: any, moduleId: number) => {
  console.log('Opening edit video modal', video, moduleId);
  selectedModuleId.value = moduleId;
  selectedVideo.value = video;
  videoForm.module = moduleId;
  videoForm.title = video.title;
  videoForm.video_url = video.video_url;
  showVideoModal.value = true;
};

const openAddDocumentModal = (moduleId: number | null = null) => {
  console.log('Opening add document modal, moduleId:', moduleId);
  selectedModuleId.value = moduleId;
  selectedDocument.value = null;
  documentForm.module = moduleId || null;
  documentForm.title = '';
  documentForm.document_file = null;
  documentForm.currentDocument = null;
  showDocumentModal.value = true;
};

const openEditDocumentModal = (document: any, moduleId: number) => {
  console.log('Opening edit document modal', document, moduleId);
  selectedModuleId.value = moduleId;
  selectedDocument.value = document;
  documentForm.module = moduleId;
  documentForm.title = document.title;
  documentForm.document_file = null;
  documentForm.currentDocument = document.document_file;
  showDocumentModal.value = true;
};

const onDocumentChange = (event: Event) => {
  console.log('Document file changed');
  const input = event.target as HTMLInputElement;
  documentForm.document_file = input.files ? input.files[0] : null;
};

const saveVideo = async (bvModalEvt: Event) => {
  bvModalEvt.preventDefault();
  if (!videoForm.title || !videoForm.module || !videoForm.video_url) {
    $toast.error('Please fill in all required fields');
    return;
  }

  try {
    loading.value = true;
    console.log('Saving video:', videoForm);
    const videoData = {
      id: selectedVideo.value?.id,
      tempId: selectedVideo.value?.tempId || `temp-video-${Date.now()}`,
      title: videoForm.title,
      video_url: videoForm.video_url,
    };

    const module = props.formData.modules.find(m => (m.id || m.order) === videoForm.module);
    if (module) {
      if (selectedVideo.value) {
        const videoIndex = module.videos.findIndex(v => v.id === selectedVideo.value.id || v.tempId === selectedVideo.value.tempId);
        module.videos[videoIndex] = videoData;
      } else {
        module.videos.push(videoData);
      }
    }

    emit('update:formData', props.formData);
    $toast.success(selectedVideo.value ? 'Video updated successfully!' : 'Video added successfully!');
    showVideoModal.value = false;
  } catch (err) {
    console.error('Error saving video:', err);
    $toast.error('Failed to save video');
  } finally {
    loading.value = false;
  }
};

const saveDocument = async (bvModalEvt: Event) => {
  bvModalEvt.preventDefault();
  if (!documentForm.title || !documentForm.module) {
    $toast.error('Please fill in all required fields');
    return;
  }

  try {
    loading.value = true;
    console.log('Saving document:', documentForm);
    const documentData = {
      id: selectedDocument.value?.id,
      tempId: selectedDocument.value?.tempId || `temp-document-${Date.now()}`,
      title: documentForm.title,
      document_file: documentForm.document_file || documentForm.currentDocument,
    };

    const module = props.formData.modules.find(m => (m.id || m.order) === documentForm.module);
    if (module) {
      if (selectedDocument.value) {
        const documentIndex = module.documents.findIndex(d => d.id === selectedDocument.value.id || d.tempId === selectedDocument.value.tempId);
        module.documents[documentIndex] = documentData;
      } else {
        module.documents.push(documentData);
      }
    }

    emit('update:formData', props.formData);
    $toast.success(selectedDocument.value ? 'Document updated successfully!' : 'Document added successfully!');
    showDocumentModal.value = false;
  } catch (err) {
    console.error('Error saving document:', err);
    $toast.error('Failed to save document');
  } finally {
    loading.value = false;
  }
};

const deleteVideo = (video: any, module: any) => {
  if (!confirm('Are you sure you want to delete this video?')) return;
  console.log('Deleting video:', video);
  module.videos = module.videos.filter(v => v.id !== video.id && v.tempId !== video.tempId);
  emit('update:formData', props.formData);
  $toast.success('Video deleted successfully!');
};

const deleteDocument = (document: any, module: any) => {
  if (!confirm('Are you sure you want to delete this document?')) return;
  console.log('Deleting document:', document);
  module.documents = module.documents.filter(d => d.id !== document.id && d.tempId !== document.tempId);
  emit('update:formData', props.formData);
  $toast.success('Document deleted successfully!');
};

// Reset modal state on hide (for video and document modals)
const resetModal = () => {
  console.log('Resetting video/document modal state');
  showVideoModal.value = false;
  showDocumentModal.value = false;
  selectedModuleId.value = null;
  selectedVideo.value = null;
  selectedDocument.value = null;
  videoForm.module = null;
  videoForm.title = '';
  videoForm.video_url = '';
  documentForm.module = null;
  documentForm.title = '';
  documentForm.document_file = null;
  documentForm.currentDocument = null;
};

// Reset module modal state specifically
const resetModuleModal = () => {
  console.log('Resetting module modal state');
  showModuleModal.value = false;
  selectedModuleId.value = null;
  selectedModule.value = null;
  selectedModuleIndex.value = null;
  moduleForm.title = '';
  moduleForm.description = '';
  moduleForm.order = 0;
  // Force backdrop removal
  setTimeout(() => {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      console.log('Removing modal backdrop');
      backdrop.remove();
    }
  }, 100);
};

// Initialize videos and documents if needed
props.formData.modules.forEach(module => {
  if (!module.videos) module.videos = [];
  if (!module.documents) module.documents = [];
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>