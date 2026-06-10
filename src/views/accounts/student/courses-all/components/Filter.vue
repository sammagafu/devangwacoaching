<template>
  <b-form @submit.prevent="apply">
    <p class="text-muted small mb-4">
      Narrow programmes by focus area or price. Filters apply to the list on this page.
    </p>

    <b-card no-body class="card-body shadow p-4 mb-4">
      <h4 class="mb-2">Programme focus</h4>
      <p class="text-muted small mb-3">What you want to work on in your relationship</p>
      <div
        v-for="option in focusOptions"
        :key="option.value"
        class="d-flex justify-content-between align-items-center mb-2"
      >
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            :id="`focus-${option.value || 'all'}`"
            :value="option.value"
            v-model="selectedFocus"
            name="focus"
          >
          <label class="form-check-label" :for="`focus-${option.value || 'all'}`">
            {{ option.label }}
          </label>
        </div>
        <span class="small text-muted">({{ option.count }})</span>
      </div>
    </b-card>

    <b-card no-body class="card-body shadow p-4 mb-4">
      <h4 class="mb-2">Price</h4>
      <p class="text-muted small mb-3">Show free or paid enrolment options</p>
      <ul class="list-inline mb-0">
        <li class="list-inline-item" v-for="price in priceOptions" :key="price.value">
          <input
            type="radio"
            class="btn-check"
            :id="`price-${price.value || 'all'}`"
            :value="price.value"
            v-model="selectedPrice"
            name="price"
          >
          <label class="btn btn-light btn-primary-soft-check" :for="`price-${price.value || 'all'}`">
            {{ price.label }}
          </label>
        </li>
      </ul>
    </b-card>

    <div class="d-grid gap-2">
      <b-button type="submit" variant="primary">Apply filters</b-button>
      <b-button type="button" variant="outline-secondary" @click="reset">Clear filters</b-button>
    </div>
  </b-form>
</template>

<script setup>
import { computed, ref } from 'vue'
import { buildFocusOptions } from '@/helpers/courseFilters'

const props = defineProps({
  courses: { type: Array, default: () => [] },
})

const emit = defineEmits(['filter-applied'])

const selectedFocus = ref('')
const selectedPrice = ref('')

const priceOptions = [
  { value: '', label: 'All' },
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' },
]

const focusOptions = computed(() => buildFocusOptions(props.courses))

const apply = () => {
  emit('filter-applied', {
    focus: selectedFocus.value,
    price: selectedPrice.value,
  })
}

const reset = () => {
  selectedFocus.value = ''
  selectedPrice.value = ''
  apply()
}
</script>
