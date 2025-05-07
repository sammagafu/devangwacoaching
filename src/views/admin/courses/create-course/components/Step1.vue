<template>
  <div id="step-1" role="tabpanel" class="bs-stepper-pane" aria-labelledby="steppertrigger1">
    <b-form-group label="Course Title" class="mb-3">
      <b-form-input v-model="formData.title" placeholder="Enter course title" :state="errors.title ? false : null"></b-form-input>
      <b-form-invalid-feedback>{{ errors.title }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label="Description" class="mb-3">
      <b-form-textarea v-model="formData.description" rows="4" placeholder="Enter course description" :state="errors.description ? false : null"></b-form-textarea>
      <b-form-invalid-feedback>{{ errors.description }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label="Price" class="mb-3">
      <b-form-input v-model.number="formData.price" type="number" step="0.01" placeholder="Enter price" :state="errors.price ? false : null"></b-form-input>
      <b-form-invalid-feedback>{{ errors.price }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label="Discount Percentage" class="mb-3">
      <b-form-input v-model.number="formData.discount_percentage" type="number" step="0.01" placeholder="Enter discount percentage" :state="errors.discount_percentage ? false : null"></b-form-input>
      <b-form-invalid-feedback>{{ errors.discount_percentage }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label="Discount Deadline" class="mb-3">
      <b-form-input v-model="formData.discount_deadline" type="datetime-local" :state="errors.discount_deadline ? false : null"></b-form-input>
      <b-form-invalid-feedback>{{ errors.discount_deadline }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label="Featured" class="mb-3">
      <b-form-checkbox v-model="formData.is_featured">Featured Course</b-form-checkbox>
    </b-form-group>
    <b-button variant="primary" @click="nextPage">Next</b-button>
    <b-button variant="secondary" @click="saveDraft" class="ml-2">Save Draft</b-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  formData: {
    title: string;
    description: string;
    price: number | null;
    discount_percentage: number | null;
    discount_deadline: string | null;
    is_featured: boolean;
  };
  errors: {
    title: string;
    description: string;
    price: string;
    discount_percentage: string;
    discount_deadline: string;
    is_featured: string;
  };
  nextPage: () => void;
  saveDraft: () => Promise<void>;
}>();
</script>