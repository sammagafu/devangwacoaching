<template>
  <div id="step-1" role="tabpanel" class="content fade" aria-labelledby="steppertrigger1">
    <h4>Event Details</h4>
    <hr>
    <b-row class="g-4">
      <b-col cols="12">
        <b-form-group label="Event Title *">
          <b-form-input
            type="text"
            placeholder="Enter event title"
            v-model="formData.title"
            :class="{ 'is-invalid': errors.title }"
          />
          <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
        </b-form-group>
      </b-col>

      <b-col cols="12">
        <b-form-group label="Description *">
          <b-form-textarea
            placeholder="Enter event description"
            rows="4"
            v-model="formData.description"
            :class="{ 'is-invalid': errors.description }"
          />
          <div v-if="errors.description" class="invalid-feedback">{{ errors.description }}</div>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Event Type *">
          <ChoicesSelect
            id="event-type"
            class="border-0 z-index-9 bg-transparent"
            v-model="formData.event_type"
            :class="{ 'is-invalid': errors.event_type }"
          >
            <option value="">Select event type</option>
            <option value="online">Online</option>
            <option value="on_premises">On Premises</option>
          </ChoicesSelect>
          <div v-if="errors.event_type" class="invalid-feedback">{{ errors.event_type }}</div>
        </b-form-group>
      </b-col>

      <div class="d-flex justify-content-end mt-3">
        <b-button variant="primary" class="next-btn mb-0" @click="nextPage">Next</b-button>
      </div>
    </b-row>
  </div>
</template>

<script setup lang="ts">
import ChoicesSelect from '@/components/ChoicesSelect.vue';

defineProps<{
  formData: {
    title: string;
    description: string;
    event_type: string;
  };
  nextPage: () => void;
  errors: {
    title: string;
    description: string;
    event_type: string;
  };
}>();
</script>