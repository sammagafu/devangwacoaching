<template>
  <div id="step-2" role="tabpanel" class="content fade" aria-labelledby="steppertrigger2">
    <h4>Event Media</h4>
    <hr>
    <b-row>
      <b-col cols="12">
        <div
          class="text-center justify-content-center align-items-center p-4 p-sm-5 border border-2 border-dashed position-relative rounded-3"
        >
          <img :src="gallery" class="h-50px" alt="" />
          <div>
            <h6 class="my-2">
              Upload event cover image here, or
              <a href="#!" class="text-primary" @click="$refs.fileInput.click()">Browse</a>
            </h6>
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              accept="image/gif, image/jpeg, image/png"
              @change="onUpload"
            />
            <p class="small mb-0 mt-2">
              <b>Note:</b> Only JPG, JPEG, and PNG. Suggested dimensions are 1920px * 1080px.
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
            @click="formData.cover = null"
            v-if="formData.cover"
          >
            Remove Image
          </b-button>
        </div>
      </b-col>

      <div class="d-flex justify-content-between mt-3">
        <b-button variant="secondary" class="prev-btn mb-0" @click="previousPage">Previous</b-button>
        <b-button variant="primary" class="next-btn mb-0" @click="nextPage">Next</b-button>
      </div>
    </b-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import gallery from '@/assets/images/element/gallery.svg';

const fileInput = ref<HTMLInputElement | null>(null);

defineProps<{
  formData: {
    cover: File | null;
  };
  nextPage: () => void;
  previousPage: () => void;
  errors: {
    cover: string;
  };
}>();

const onUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    (formData as any).value.cover = input.files[0];
  }
};
</script>