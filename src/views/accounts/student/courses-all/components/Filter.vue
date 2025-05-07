<template>
  <b-form @submit.prevent="apply">
    <b-card no-body class="card-body shadow p-4 mb-4">
      <h4 class="mb-3">Category</h4>
      <b-col cols="12">
        <div class="d-flex justify-content-between align-items-center" v-for="category in categories" :key="category.value">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              :id="`category-${category.value}`"
              :value="category.value"
              v-model="selectedCategory"
              name="category"
            >
            <label class="form-check-label" :for="`category-${category.value}`">{{ category.label }}</label>
          </div>
          <span class="small">({{ category.count }})</span>
        </div>
        <b-collapse class="multi-collapse" id="multiCollapseExample1">
          <b-card no-body class="card-body p-0">
            <div class="d-flex justify-content-between align-items-center" v-for="category in moreCategories" :key="category.value">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  :id="`category-${category.value}`"
                  :value="category.value"
                  v-model="selectedCategory"
                  name="category"
                >
                <label class="form-check-label" :for="`category-${category.value}`">{{ category.label }}</label>
              </div>
              <span class="small">({{ category.count }})</span>
            </div>
          </b-card>
        </b-collapse>
        <a
          class="p-0 mb-0 mt-2 btn-more d-flex align-items-center"
          data-bs-toggle="collapse"
          href="#multiCollapseExample1"
          role="button"
          aria-expanded="false"
          aria-controls="multiCollapseExample1"
          v-b-toggle="'multiCollapseExample1'"
        >
          See <span class="see-more ms-1">more</span><span class="see-less ms-1">less</span>
          <span class="see-more ms-1"><font-awesome-icon :icon="faAngleDown" class="ms-1" /></span>
          <span class="see-less ms-1"><font-awesome-icon :icon="faAngleUp" class="ms-1" /></span>
        </a>
      </b-col>
    </b-card>

    <b-card no-body class="card-body shadow p-4 mb-4">
      <h4 class="mb-3">Price Level</h4>
      <ul class="list-inline mb-0">
        <li class="list-inline-item" v-for="price in priceOptions" :key="price.value">
          <input
            type="radio"
            class="btn-check"
            :id="`price-${price.value}`"
            :value="price.value"
            v-model="selectedPrice"
            name="price"
          >
          <label class="btn btn-light btn-primary-soft-check" :for="`price-${price.value}`">{{ price.label }}</label>
        </li>
      </ul>
    </b-card>

    <b-card no-body class="card-body shadow p-4 mb-4">
      <h4 class="mb-3">Skill Level</h4>
      <ul class="list-inline mb-0">
        <li class="list-inline-item mb-2" v-for="level in skillLevels" :key="level.value">
          <input
            type="radio"
            class="btn-check"
            :id="`level-${level.value}`"
            :value="level.value"
            v-model="selectedLevel"
            name="level"
          >
          <label class="btn btn-light btn-primary-soft-check" :for="`level-${level.value}`">{{ level.label }}</label>
        </li>
      </ul>
    </b-card>

    <b-card no-body class="card-body shadow p-4 mb-4">
      <h4 class="mb-3">Language</h4>
      <ul class="list-inline mb-0 g-3">
        <li class="list-inline-item mb-2" v-for="language in languages" :key="language.value">
          <input
            type="radio"
            class="btn-check"
            :id="`language-${language.value}`"
            :value="language.value"
            v-model="selectedLanguage"
            name="language"
          >
          <label class="btn btn-light btn-primary-soft-check" :for="`language-${language.value}`">{{ language.label }}</label>
        </li>
      </ul>
    </b-card>

    <b-button type="submit" variant="primary" class="w-100">Apply Filters</b-button>
  </b-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const selectedCategory = ref('');
const selectedPrice = ref('');
const selectedLevel = ref('');
const selectedLanguage = ref('');

const categories = ref([
  { value: '', label: 'All', count: 1256 },
  { value: 'development', label: 'Development', count: 365 },
  { value: 'design', label: 'Design', count: 156 },
  { value: 'accounting', label: 'Accounting', count: 65 },
  { value: 'translation', label: 'Translation', count: 245 },
  { value: 'finance', label: 'Finance', count: 184 },
  { value: 'legal', label: 'Legal', count: 65 },
  { value: 'photography', label: 'Photography', count: 99 },
]);

const moreCategories = ref([
  { value: 'writing', label: 'Writing', count: 178 },
  { value: 'marketing', label: 'Marketing', count: 104 },
]);

const priceOptions = ref([
  { value: '', label: 'All' },
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' },
]);

const skillLevels = ref([
  { value: '', label: 'All levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]);

const languages = ref([
  { value: '', label: 'All' },
  { value: 'english', label: 'English' },
  { value: 'french', label: 'French' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'russian', label: 'Russian' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'bengali', label: 'Bengali' },
  { value: 'portuguese', label: 'Portuguese' },
]);

const apply = () => {
  const filters = {
    category: selectedCategory.value,
    price: selectedPrice.value,
    level: selectedLevel.value,
    language: selectedLanguage.value,
  };
  emit('filter-applied', filters);
};

defineEmits(['filter-applied']);
</script>