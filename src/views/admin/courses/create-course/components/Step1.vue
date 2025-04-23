<template>
  <div id="step-1" role="tabpanel" class="content fade" aria-labelledby="steppertrigger1">
    <h4>Course Details</h4>
    <hr>
    <b-row class="b-row g-4">
      <b-col cols="12">
        <b-form-group label="Course Title *">
          <b-form-input
            type="text"
            placeholder="Enter course title"
            v-model="formData.title"
            :class="{ 'is-invalid': errors.title }"
          />
          <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
        </b-form-group>
      </b-col>

      <b-col cols="12">
        <b-form-group label="Description *">
          <b-form-textarea
            placeholder="Enter description"
            rows="2"
            max-rows="6"
            v-model="formData.description"
            :class="{ 'is-invalid': errors.description }"
          />
          <div v-if="errors.description" class="invalid-feedback">{{ errors.description }}</div>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Price *">
          <b-form-input
            type="number"
            placeholder="Enter price (e.g., 99.99)"
            v-model="formData.price"
            :class="{ 'is-invalid': errors.price }"
          />
          <div v-if="errors.price" class="invalid-feedback">{{ errors.price }}</div>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Discount Percentage">
          <b-form-input
            type="number"
            placeholder="Enter discount percentage (e.g., 10)"
            v-model="formData.discount_percentage"
            :class="{ 'is-invalid': errors.discount_percentage }"
          />
          <div v-if="errors.discount_percentage" class="invalid-feedback">{{ errors.discount_percentage }}</div>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Discount Deadline">
          <b-form-input
            type="datetime-local"
            v-model="formData.discount_deadline"
            :class="{ 'is-invalid': errors.discount_deadline }"
          />
          <div v-if="errors.discount_deadline" class="invalid-feedback">{{ errors.discount_deadline }}</div>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Featured">
          <b-form-checkbox
            v-model="formData.is_featured"
            :class="{ 'is-invalid': errors.is_featured }"
          >
            Mark as Featured
          </b-form-checkbox>
          <div v-if="errors.is_featured" class="invalid-feedback">{{ errors.is_featured }}</div>
        </b-form-group>
      </b-col>

      <div class="d-flex justify-content-between mt-3">
        <b-button variant="outline-primary" class="mb-0" @click="saveDraft">Save as Draft</b-button>
        <b-button variant="primary" class="next-btn mb-0" @click="nextPage">Next</b-button>
      </div>
    </b-row>
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
  nextPage: () => void;
  errors: {
    title: string;
    description: string;
    price: string;
    discount_percentage: string;
    discount_deadline: string;
    is_featured: string;
  };
  saveDraft: () => void;
}>();
</script>