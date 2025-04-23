<template>
  <div id="step-4" role="tabpanel" class="content fade" aria-labelledby="steppertrigger4">
    <h4>Additional Information</h4>
    <hr>
    <b-row class="g-4">
      <b-col cols="12">
        <div class="bg-light border rounded p-4">
          <h5 class="mb-0">Tags</h5>
          <div class="mt-3">
            <b-form-group label="Add Tags">
              <b-form-input
                v-model="newTag"
                placeholder="Enter tags (e.g., javascript, react)"
                @keyup.enter="addTag"
                :class="{ 'is-invalid': errors.tags }"
              />
              <div v-if="errors.tags" class="invalid-feedback">{{ errors.tags }}</div>
            </b-form-group>
            <b-button variant="primary" size="sm" class="mt-2" @click="addTag">Add Tag</b-button>
            <div class="mt-3">
              <span
                v-for="(tag, index) in formData.tags"
                :key="index"
                class="badge bg-primary text-white mr-1 mb-1"
              >
                {{ tag }}
                <span
                  class="ml-1 cursor-pointer"
                  @click="removeTag(index)"
                >
                  ×
                </span>
              </span>
            </div>
            <small class="text-muted">Maximum of 14 keywords. Keywords should all be in lowercase. Press Enter or click Add Tag to add a tag.</small>
          </div>
        </div>
      </b-col>

      <b-col cols="12">
        <div class="bg-light border rounded p-4">
          <h5 class="mb-0">FAQs</h5>
          <div class="mt-3">
            <div v-for="(faq, index) in formData.faqs" :key="index" class="mb-3">
              <b-form-group label="Question *">
                <b-form-input
                  v-model="faq.question"
                  placeholder="Enter question"
                  :class="{ 'is-invalid': errors.faqs && errors.faqs[index]?.question }"
                />
                <div v-if="errors.faqs && errors.faqs[index]?.question" class="invalid-feedback">
                  {{ errors.faqs[index].question }}
                </div>
              </b-form-group>
              <b-form-group label="Answer *">
                <b-form-textarea
                  v-model="faq.answer"
                  placeholder="Enter answer"
                  rows="3"
                  :class="{ 'is-invalid': errors.faqs && errors.faqs[index]?.answer }"
                />
                <div v-if="errors.faqs && errors.faqs[index]?.answer" class="invalid-feedback">
                  {{ errors.faqs[index].answer }}
                </div>
              </b-form-group>
              <b-button variant="danger" size="sm" @click="removeFaq(index)">Remove FAQ</b-button>
            </div>
            <b-button variant="primary" size="sm" @click="addFaq">Add FAQ</b-button>
          </div>
        </div>
      </b-col>

      <div class="d-md-flex justify-content-between align-items-start mt-4">
        <b-button variant="secondary" class="prev-btn mb-2 mb-md-0" @click="previousPage">Previous</b-button>
        <div>
          <b-button variant="outline-primary" class="mb-2 mb-md-0 mr-2" @click="saveDraft">Save as Draft</b-button>
          <b-button type="submit" variant="success" class="mb-2 mb-sm-0">Publish Course</b-button>
        </div>
      </div>
    </b-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  formData: {
    faqs: { question: string; answer: string }[];
    tags: string[];
  };
  previousPage: () => void;
  errors: {
    faqs: { question: string; answer: string }[];
    tags: string;
  };
  saveDraft: () => void;
}>();

const newTag = ref('');

const addFaq = () => {
  props.formData.faqs.push({ question: '', answer: '' });
};

const removeFaq = (index: number) => {
  props.formData.faqs.splice(index, 1);
};

const addTag = () => {
  if (newTag.value.trim() && props.formData.tags.length < 14) {
    const tag = newTag.value.trim().toLowerCase();
    if (!props.formData.tags.includes(tag)) {
      props.formData.tags.push(tag);
    }
  }
  newTag.value = '';
};

const removeTag = (index: number) => {
  props.formData.tags.splice(index, 1);
};
</script>

<style scoped>
.badge {
  font-size: 0.9rem;
  padding: 0.5em 0.75em;
}

.badge .cursor-pointer {
  cursor: pointer;
  margin-left: 0.5em;
}
</style>