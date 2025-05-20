
<template>
  <div id="step-4" role="tabpanel" class="content fade" aria-labelledby="steppertrigger4">
    <h4>Additional information</h4>
    <hr>
    <b-row class="g-4">
      <b-col cols="12">
        <div class="bg-light border rounded p-2 p-sm-4">
          <div class="d-sm-flex justify-content-sm-between align-items-center mb-3">
            <h5 class="mb-2 mb-sm-0">Upload FAQs</h5>
            <a href="#" class="btn btn-sm btn-primary-soft mb-0" @click="openAddFaqModal">
              <BIconPlusCircle class="me-2" />
              Add Question
            </a>
          </div>

          <b-row class="g-4">
            <b-col cols="12" v-for="(faq, index) in formData.faqs" :key="`faq-${index}`">
              <div class="bg-body p-3 p-sm-4 border rounded">
                <div class="d-sm-flex justify-content-sm-between align-items-center mb-2">
                  <h6 class="mb-0">{{ faq.question || 'Untitled Question' }}</h6>
                  <div class="align-middle">
                    <a
                      href="#"
                      class="btn btn-sm btn-success-soft btn-round me-1 mb-1 mb-md-0"
                      @click="openEditFaqModal(faq, index)"
                    >
                      <font-awesome-icon :icon="faEdit" class="fa-fw" />
                    </a>
                    <b-button
                      variant="danger-soft"
                      size="sm"
                      class="btn-round mb-0"
                      @click="removeFaq(index)"
                    >
                      <font-awesome-icon :icon="faTimes" class="fa-fw" />
                    </b-button>
                  </div>
                </div>
                <p>{{ faq.answer || 'No answer provided' }}</p>
              </div>
            </b-col>
            <b-col cols="12" v-if="!formData.faqs.length">
              <p class="text-muted">No FAQs added yet.</p>
            </b-col>
          </b-row>
        </div>
      </b-col>

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
                <span class="ml-1 cursor-pointer" @click="removeTag(index)">×</span>
              </span>
            </div>
            <small class="text-muted"
              >Maximum of 14 keywords. Keywords should all be in lowercase. Press Enter or click Add Tag to add a
              tag.</small
            >
          </div>
        </div>
      </b-col>

      <b-col cols="12">
        <div class="bg-light border rounded p-4">
          <h5 class="mb-0">Message to a reviewer</h5>
          <div class="mt-3">
            <b-form-textarea
              v-model="formData.reviewer_message"
              placeholder="Write a message"
              rows="4"
              max-rows="6"
              :state="errors.reviewer_message ? false : null"
            />
            <b-form-invalid-feedback>{{ errors.reviewer_message }}</b-form-invalid-feedback>
            <div class="form-check mb-0 mt-2">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
                v-model="formData.assets_licensed"
              />
              <label class="form-check-label" for="exampleCheck1">
                Any images, sounds, or other assets that are not my own work, have been appropriately licensed for use in
                the file preview or main course. Other than these items, this work is entirely my own and I have full
                rights to sell it here.
              </label>
            </div>
          </div>
        </div>
      </b-col>

      <div class="d-md-flex justify-content-between align-items-start mt-4">
        <b-button variant="secondary" class="prev-btn mb-2 mb-md-0" @click="previousPage">Previous</b-button>
        <div>
          <b-button variant="outline-primary" class="mb-2 mb-md-0 mr-2" @click="saveDraft"
            >Save as Draft</b-button
          >
          <b-button
            variant="light"
            class="me-auto ms-md-2 mb-2 mb-md-0"
            @click="previewCourse"
            >Preview Course</b-button
          >
          <b-button
            type="submit"
            variant="success"
            class="mb-2 mb-sm-0"
            @click="publishCourse"
            >Submit a Course</b-button
          >
        </div>
      </div>
    </b-row>

    <!-- FAQ Modal -->
    <b-modal
      id="addQuestion"
      :title="selectedFaq ? 'Edit FAQ' : 'Add FAQ'"
      header-class="bg-dark"
      title-class="text-white"
      :ok-title="loading ? 'Saving...' : 'Save FAQ'"
      ok-variant="success"
      cancel-title="Close"
      cancel-variant="danger-soft"
      :ok-disabled="loading"
      v-model="showFaqModal"
      @ok="saveFaq"
      @hidden="resetFaqModal"
    >
      <b-form class="row text-start g-3">
        <b-col cols="12">
          <b-form-group label="Question">
            <b-form-input
              v-model="faqForm.question"
              placeholder="Write a question"
              :class="{ 'is-invalid': faqFormErrors.question }"
              required
            />
            <div v-if="faqFormErrors.question" class="invalid-feedback">
              {{ faqFormErrors.question }}
            </div>
          </b-form-group>
        </b-col>
        <b-col cols="12" class="mt-3">
          <b-form-group label="Answer">
            <b-form-textarea
              v-model="faqForm.answer"
              rows="4"
              placeholder="Write an answer"
              :class="{ 'is-invalid': faqFormErrors.answer }"
              required
            />
            <div v-if="faqFormErrors.answer" class="invalid-feedback">
              {{ faqFormErrors.answer }}
            </div>
          </b-form-group>
        </b-col>
      </b-form>
    </b-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useRouter } from 'vue-router';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { BIconPlusCircle } from 'bootstrap-icons-vue';

const toast = useToast();
const router = useRouter();

const props = defineProps<{
  formData: {
    faqs: { question: string; answer: string }[];
    tags: string[];
    reviewer_message: string;
    assets_licensed: boolean;
  };
  previousPage: () => void;
  errors: {
    faqs: { question: string; answer: string }[];
    tags: string;
    reviewer_message: string;
    assets_licensed: string;
  };
  saveDraft: () => void;
}>();

const emit = defineEmits(['update:formData']);

const showFaqModal = ref(false);
const selectedFaq = ref<any>(null);
const selectedFaqIndex = ref<number | null>(null);
const newTag = ref('');
const loading = ref(false);

const faqForm = reactive({
  question: '',
  answer: '',
});

const faqFormErrors = reactive({
  question: '',
  answer: '',
});

const openAddFaqModal = () => {
  selectedFaq.value = null;
  selectedFaqIndex.value = null;
  faqForm.question = '';
  faqForm.answer = '';
  faqFormErrors.question = '';
  faqFormErrors.answer = '';
  showFaqModal.value = true;
};

const openEditFaqModal = (faq: any, index: number) => {
  selectedFaq.value = faq;
  selectedFaqIndex.value = index;
  faqForm.question = faq.question;
  faqForm.answer = faq.answer;
  faqFormErrors.question = '';
  faqFormErrors.answer = '';
  showFaqModal.value = true;
};

const saveFaq = async (bvModalEvt: Event) => {
  bvModalEvt.preventDefault();
  if (!faqForm.question) {
    faqFormErrors.question = 'Question is required';
    toast.error('Please fill in all required fields');
    return;
  }
  if (!faqForm.answer) {
    faqFormErrors.answer = 'Answer is required';
    toast.error('Please fill in all required fields');
    return;
  }

  try {
    loading.value = true;
    const faqData = {
      question: faqForm.question,
      answer: faqForm.answer,
    };

    if (selectedFaq.value && selectedFaqIndex.value !== null) {
      props.formData.faqs[selectedFaqIndex.value] = faqData;
    } else {
      props.formData.faqs.push(faqData);
    }

    emit('update:formData', props.formData);
    toast.success(selectedFaq.value ? 'FAQ updated successfully!' : 'FAQ added successfully!');
    showFaqModal.value = false;
  } catch (err) {
    console.error('Error saving FAQ:', err);
    toast.error('Failed to save FAQ');
  } finally {
    loading.value = false;
  }
};

const removeFaq = (index: number) => {
  if (!confirm('Are you sure you want to delete this FAQ?')) return;
  props.formData.faqs.splice(index, 1);
  emit('update:formData', props.formData);
  toast.success('FAQ deleted successfully!');
};

const addTag = () => {
  if (newTag.value.trim() && props.formData.tags.length < 14) {
    const tag = newTag.value.trim().toLowerCase();
    if (!props.formData.tags.includes(tag)) {
      props.formData.tags.push(tag);
      emit('update:formData', props.formData);
    }
  }
  newTag.value = '';
};

const removeTag = (index: number) => {
  props.formData.tags.splice(index, 1);
  emit('update:formData', props.formData);
};

const resetFaqModal = () => {
  showFaqModal.value = false;
  selectedFaq.value = null;
  selectedFaqIndex.value = null;
  faqForm.question = '';
  faqForm.answer = '';
  faqFormErrors.question = '';
  faqFormErrors.answer = '';
};

const previewCourse = () => {
  toast.info('Course preview functionality not implemented yet.');
};

const publishCourse = async () => {
  try {
    await props.saveDraft();
    toast.success('Course submitted for review!');
    router.push({ name: 'instructor.course.added' });
  } catch (err) {
    console.error('Error submitting course:', err);
    toast.error('Failed to submit course');
  }
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