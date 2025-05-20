
<template>
  <div id="step-1" role="tabpanel" class="bs-stepper-pane" aria-labelledby="steppertrigger1">
    <b-form-group label="Course title" class="mb-3">
      <b-form-input
        v-model="formData.title"
        placeholder="Enter course title"
        :state="errors.title ? false : null"
      />
      <b-form-invalid-feedback>{{ errors.title }}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Short description" class="mb-3">
      <b-form-textarea
        v-model="formData.short_description"
        placeholder="Enter keywords"
        rows="2"
        max-rows="6"
        :state="errors.short_description ? false : null"
      />
      <b-form-invalid-feedback>{{ errors.short_description }}</b-form-invalid-feedback>
    </b-form-group>

    <b-row class="g-4">
      <b-col md="6">
        <b-form-group label="Course category">
          <ChoicesSelect
            id="select-cate"
            class="border-0 z-index-9 bg-transparent"
            data-search-enabled="true"
            v-model="formData.category"
          >
            <option value="">Select category</option>
            <option value="engineer">Engineer</option>
            <option value="medical">Medical</option>
            <option value="it">Information technology</option>
            <option value="finance">Finance</option>
            <option value="marketing">Marketing</option>
          </ChoicesSelect>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Course level">
          <ChoicesSelect
            id="select-level"
            class="border-0 z-index-9 bg-transparent"
            data-search-enabled="false"
            data-remove-item-button="true"
            v-model="formData.level"
          >
            <option value="">Select course level</option>
            <option value="all">All level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advance">Advance</option>
          </ChoicesSelect>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Language">
          <ChoicesSelect
            id="select-language"
            class="border-0 z-index-9 bg-transparent"
            multiple
            data-max-item-count="3"
            data-remove-item-button="true"
            v-model="formData.languages"
          >
            <option value="">Select language</option>
            <option value="English">English</option>
            <option value="German">German</option>
            <option value="French">French</option>
            <option value="Hindi">Hindi</option>
          </ChoicesSelect>
        </b-form-group>
      </b-col>

      <b-col md="6" class="d-flex align-items-center justify-content-start mt-5">
        <div class="form-check form-switch form-check-md">
          <input
            class="form-check-input"
            type="checkbox"
            id="checkPrivacy1"
            v-model="formData.is_featured"
          />
          <label class="form-check-label" for="checkPrivacy1">Check this for featured course</label>
        </div>
      </b-col>

      <b-col md="6">
        <b-form-group label="Course time">
          <b-form-input
            v-model="formData.course_time"
            type="text"
            placeholder="Enter course time"
            :state="errors.course_time ? false : null"
          />
          <b-form-invalid-feedback>{{ errors.course_time }}</b-form-invalid-feedback>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Total lecture">
          <b-form-input
            v-model="formData.total_lecture"
            type="text"
            placeholder="Enter total lecture"
            :state="errors.total_lecture ? false : null"
          />
          <b-form-invalid-feedback>{{ errors.total_lecture }}</b-form-invalid-feedback>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Course price">
          <b-form-input
            v-model.number="formData.price"
            type="number"
            step="0.01"
            placeholder="Enter course price"
            :state="errors.price ? false : null"
          />
          <b-form-invalid-feedback>{{ errors.price }}</b-form-invalid-feedback>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Discount price">
          <b-form-input
            v-model.number="formData.discount_price"
            type="number"
            step="0.01"
            placeholder="Enter discount"
            :state="errors.discount_price ? false : null"
          />
          <b-form-invalid-feedback>{{ errors.discount_price }}</b-form-invalid-feedback>
        </b-form-group>
        <b-col cols="12" class="mt-1 mb-0">
          <div class="form-check small mb-0">
            <input
              class="form-check-input"
              type="checkbox"
              id="checkBox1"
              v-model="formData.enable_discount"
            />
            <label class="form-check-label" for="checkBox1">Enable this Discount</label>
          </div>
        </b-col>
      </b-col>

      <b-col cols="12">
        <b-form-group label="Add description">
          <div class="bg-body border rounded-bottom h-400px overflow-hidden" id="editor">
            <EditorContent :editor="editor" class="border-0" style="min-height: 400px;" />
          </div>
        </b-form-group>
      </b-col>

      <div class="d-flex justify-content-end mt-3">
        <b-button variant="outline-primary" class="mr-2" @click="saveDraft">Save as Draft</b-button>
        <b-button variant="primary" class="next-btn mb-0" @click="nextPage">Next</b-button>
      </div>
    </b-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import ChoicesSelect from '@/components/ChoicesSelect.vue'; // Assuming custom component

const props = defineProps<{
  formData: {
    title: string;
    short_description: string;
    category: string;
    level: string;
    languages: string[];
    is_featured: boolean;
    course_time: string;
    total_lecture: string;
    price: number | null;
    discount_price: number | null;
    enable_discount: boolean;
    description: string;
  };
  errors: {
    title: string;
    short_description: string;
    category: string;
    level: string;
    languages: string;
    is_featured: string;
    course_time: string;
    total_lecture: string;
    price: string;
    discount_price: string;
    enable_discount: string;
    description: string;
  };
  nextPage: () => void;
  saveDraft: () => void;
}>();

// Initialize tiptap editor
const editor = ref<Editor | null>(null);

editor.value = new Editor({
  content: props.formData.description,
  extensions: [
    StarterKit,
  ],
  onUpdate: ({ editor }) => {
    props.formData.description = editor.getHTML();
  },
});

// Clean up editor on component unmount
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<style scoped>
.tiptap {
  min-height: 400px;
  border: none;
  padding: 10px;
}
</style>