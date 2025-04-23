<template>
  <div id="step-3" role="tabpanel" class="content fade" aria-labelledby="steppertrigger3">
    <h4>Dates and Pricing</h4>
    <hr>
    <b-row class="g-4">
      <b-col md="6">
        <b-form-group label="Start Time *">
          <b-form-input
            type="datetime-local"
            v-model="formData.start_time"
            :class="{ 'is-invalid': errors.start_time }"
          />
          <div v-if="errors.start_time" class="invalid-feedback">{{ errors.start_time }}</div>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="End Time *">
          <b-form-input
            type="datetime-local"
            v-model="formData.end_time"
            :class="{ 'is-invalid': errors.end_time }"
          />
          <div v-if="errors.end_time" class="invalid-feedback">{{ errors.end_time }}</div>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Registration Deadline *">
          <b-form-input
            type="datetime-local"
            v-model="formData.registration_deadline"
            :class="{ 'is-invalid': errors.registration_deadline }"
          />
          <div v-if="errors.registration_deadline" class="invalid-feedback">{{ errors.registration_deadline }}</div>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Discount Deadline">
          <b-form-input
            type="datetime-local"
            v-model="formData.discount_deadline"
          />
        </b-form-group>
      </b-col>

      <b-col md="6" v-if="formData.event_type === 'on_premises'">
        <b-form-group label="Location *">
          <b-form-input
            type="text"
            placeholder="Enter event location"
            v-model="formData.location"
            :class="{ 'is-invalid': errors.location }"
          />
          <div v-if="errors.location" class="invalid-feedback">{{ errors.location }}</div>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Price (TZS) *">
          <b-form-input
            type="number"
            placeholder="Enter event price"
            v-model="formData.price"
            :class="{ 'is-invalid': errors.price }"
          />
          <div v-if="errors.price" class="invalid-feedback">{{ errors.price }}</div>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Discount Percentage (%)">
          <b-form-input
            type="number"
            placeholder="Enter discount percentage"
            v-model="formData.discount_percentage"
            min="0"
            max="100"
          />
        </b-form-group>
      </b-col>

      <div class="d-flex justify-content-between mt-3">
        <b-button variant="secondary" class="prev-btn mb-0" @click="previousPage">Previous</b-button>
        <b-button type="submit" variant="success" class="mb-0">Create Event</b-button>
      </div>
    </b-row>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  formData: {
    start_time: string;
    end_time: string;
    registration_deadline: string;
    discount_deadline: string;
    location: string;
    price: number | null;
    discount_percentage: number;
    event_type: string;
  };
  previousPage: () => void;
  errors: {
    start_time: string;
    end_time: string;
    registration_deadline: string;
    discount_deadline: string;
    location: string;
    price: string;
  };
}>();
</script>