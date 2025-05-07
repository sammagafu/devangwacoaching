<template>
  <b-form @submit.prevent="createCategory">
    <b-form-group label="Category Name" label-for="name" :invalid-feedback="nameError">
      <b-form-input
        id="name"
        v-model="name"
        placeholder="Enter category name"
        required
        :state="nameError ? false : null"
      ></b-form-input>
    </b-form-group>
    <b-form-group label="Description" label-for="description" :invalid-feedback="descriptionError">
      <b-form-textarea
        id="description"
        v-model="description"
        placeholder="Enter category description"
        rows="3"
        required
        :state="descriptionError ? false : null"
      ></b-form-textarea>
    </b-form-group>
    <b-button type="submit" variant="primary" :disabled="isSubmitting">Create Category</b-button>
  </b-form>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { api } from '@/services/authService';

const $toast = useToast();
const name = ref('');
const description = ref('');
const nameError = ref('');
const descriptionError = ref('');
const isSubmitting = ref(false);
const emit = defineEmits(['category-created']);

const validateForm = () => {
  nameError.value = '';
  descriptionError.value = '';
  let isValid = true;

  if (!name.value.trim()) {
    nameError.value = 'Category name is required';
    isValid = false;
  }
  if (!description.value.trim()) {
    descriptionError.value = 'Description is required';
    isValid = false;
  }
  return isValid;
};

const createCategory = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  try {
    await api.post('community/categories/', { name: name.value, description: description.value });
    $toast.success('Category created successfully!');
    emit('category-created');
    name.value = '';
    description.value = '';
  } catch (error) {
    console.error('Failed to create category:', error);
    if (error.response && error.response.data) {
      if (error.response.data.name) {
        nameError.value = error.response.data.name[0];
      }
      if (error.response.data.description) {
        descriptionError.value = error.response.data.description[0];
      }
    } else {
      $toast.error('Failed to create category');
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>