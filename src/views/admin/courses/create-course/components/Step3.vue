<template>
  <div id="step-3" role="tabpanel" class="content fade" aria-labelledby="steppertrigger3">
    <h4>Curriculum</h4>
    <hr>
    <b-row class="g-4">
      <b-col cols="12">
        <div class="bg-light border rounded p-4">
          <h5 class="mb-0">Modules</h5>
          <div class="mt-3">
            <div v-for="(module, index) in formData.modules" :key="index" class="mb-3">
              <b-form-group label="Module Title *">
                <b-form-input
                  v-model="module.title"
                  placeholder="Enter module title"
                  :class="{ 'is-invalid': errors.modules && errors.modules[index]?.title }"
                />
                <div v-if="errors.modules && errors.modules[index]?.title" class="invalid-feedback">
                  {{ errors.modules[index].title }}
                </div>
              </b-form-group>
              <b-form-group label="Module Description *">
                <b-form-textarea
                  v-model="module.description"
                  placeholder="Enter module description"
                  rows="3"
                  :class="{ 'is-invalid': errors.modules && errors.modules[index]?.description }"
                />
                <div v-if="errors.modules && errors.modules[index]?.description" class="invalid-feedback">
                  {{ errors.modules[index].description }}
                </div>
              </b-form-group>
              <b-form-group label="Order *">
                <b-form-input
                  type="number"
                  v-model.number="module.order"
                  placeholder="Enter module order"
                />
              </b-form-group>
              <b-button variant="danger" size="sm" @click="removeModule(index)">Remove Module</b-button>
            </div>
            <b-button variant="primary" size="sm" @click="addModule">Add Module</b-button>
          </div>
        </div>
      </b-col>

      <div class="d-md-flex justify-content-between align-items-start mt-4">
        <b-button variant="secondary" class="prev-btn mb-2 mb-md-0" @click="previousPage">Previous</b-button>
        <div>
          <b-button variant="outline-primary" class="mb-0 mr-2" @click="saveDraft">Save as Draft</b-button>
          <b-button variant="primary" class="next-btn mb-2 mb-md-0" @click="nextPage">Next</b-button>
        </div>
      </div>
    </b-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  formData: {
    modules: { title: string; description: string; order: number }[];
  };
  nextPage: () => void;
  previousPage: () => void;
  errors: {
    modules: { title: string; description: string }[];
  };
  saveDraft: () => void;
}>();

const addModule = () => {
  props.formData.modules.push({ title: '', description: '', order: props.formData.modules.length + 1 });
};

const removeModule = (index: number) => {
  props.formData.modules.splice(index, 1);
  props.formData.modules.forEach((module, i) => {
    module.order = i + 1;
  });
};
</script>