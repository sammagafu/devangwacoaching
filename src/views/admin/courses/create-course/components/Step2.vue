
<template>
  <div id="step-2" role="tabpanel" class="content fade" aria-labelledby="steppertrigger2">
    <h4>Course media</h4>
    <hr>
    <b-row>
      <b-col cols="12">
        <div
          class="text-center justify-content-center align-items-center p-4 p-sm-5 border border-2 border-dashed position-relative rounded-3"
        >
          <img :src="gallery" class="h-50px" alt="" />
          <div>
            <h6 class="my-2">
              Upload course image here, or
              <a href="#!" class="text-primary" @click="$refs.fileInput.click()">Browse</a>
            </h6>
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              accept="image/gif, image/jpeg, image/png"
              @change="onImageUpload"
            />
            <p class="small mb-0 mt-2">
              <b>Note:</b>
              Only JPG, JPEG, and PNG. Suggested dimensions are 1920px * 1080px.
            </p>
            <div v-if="formData.cover" class="mt-2">
              <span>Selected: {{ formData.cover.name }}</span>
            </div>
            <div v-if="errors.cover" class="text-danger mt-2">{{ errors.cover }}</div>
          </div>
        </div>

        <div class="d-sm-flex justify-content-end mt-2">
          <b-button
            type="button"
            variant="danger-soft"
            size="sm"
            class="mb-3"
            @click="emit('update:cover', null)"
            v-if="formData.cover"
          >
            Remove image
          </b-button>
        </div>
      </b-col>

      <b-col cols="12">
        <h5>Upload video</h5>
        <b-col cols="12" class="mt-4 mb-5">
          <b-form-group label="Video URL">
            <b-form-input
              v-model="formData.video_url"
              type="text"
              placeholder="Enter video url"
              :state="errors.video_url ? false : null"
            />
            <b-form-invalid-feedback>{{ errors.video_url }}</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <div class="position-relative my-4">
          <hr>
          <p class="small position-absolute top-50 start-50 translate-middle bg-body px-3 mb-0">Or</p>
        </div>

        <b-col cols="12">
          <b-form-group label="Upload video file">
            <b-input-group class="mb-3">
              <b-form-file
                v-model="formData.video_file"
                accept=".mp4,.webm,.ogg"
                placeholder="Choose video file..."
              />
              <b-input-group-text>.mp4, .webm, .ogg</b-input-group-text>
            </b-input-group>
            <div v-if="errors.video_file" class="text-danger">{{ errors.video_file }}</div>
          </b-form-group>
        </b-col>

        <h5 class="mt-4">Video preview</h5>
        <div class="position-relative">
          <img :src="about04" class="rounded-4" alt="" />
          <div class="position-absolute top-50 start-50 translate-middle">
            <CustomGLightbox
              :link="formData.video_url || 'https://www.youtube.com/embed/tXHviS-4ygo'"
              class="btn btn-lg text-danger btn-round btn-white-shadow mb-0"
            >
              <font-awesome-icon :icon="faPlay" />
            </CustomGLightbox>
          </div>
        </div>
      </b-col>

      <div class="d-flex justify-content-between mt-3">
        <b-button variant="secondary" class="prev-btn mb-0" @click="previousPage">Previous</b-button>
        <div>
          <b-button variant="outline-primary" class="mb-0 mr-2" @click="saveDraft">Save as Draft</b-button>
          <b-button variant="primary" class="next-btn mb-0" @click="nextPage">Next</b-button>
        </div>
      </div>
    </b-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import CustomGLightbox from '@/components/CustomGLightbox.vue';
import gallery from '@/assets/images/element/gallery.svg';
import about04 from '@/assets/images/about/04.jpg';

const toast = useToast();
const fileInput = ref<HTMLInputElement | null>(null);

const props = defineProps<{
  formData: {
    cover: File | null;
    video_url: string;
    video_file: File | null;
  };
  nextPage: () => void;
  previousPage: () => void;
  errors: {
    cover: string;
    video_url: string;
    video_file: string;
  };
  saveDraft: () => void;
}>();

const emit = defineEmits(['update:cover']);

const onImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPG, JPEG, PNG).');
      return;
    }
    emit('update:cover', file);
  }
};
</script>