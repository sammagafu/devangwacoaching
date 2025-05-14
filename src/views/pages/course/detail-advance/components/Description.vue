<template>
  <b-col cols="12">
    <b-card no-body class="border">
      <b-card-header class="border-bottom">
        <h3 class="mb-0">Course description</h3>
      </b-card-header>

      <b-card-body>
        <p class="mb-3">{{ description }}</p>
        <b-collapse id="collapseContent">
          <p class="my-3">{{ extendedDescription }}</p>
        </b-collapse>
        <a class="p-0 mb-0 mt-2 btn-more d-flex align-items-center" data-bs-toggle="collapse" href="#collapseContent"
          role="button" aria-expanded="false" aria-controls="collapseContent" v-b-toggle="'navbarCollapse'">
          See <span class="see-more ms-1">more</span><span class="see-less ms-1">less</span>
          <font-awesome-icon :icon="faAngleDown" class="ms-2" />
        </a>

        <h5 class="mt-4">What you'll learn</h5>
        <b-row class="mb-3">
          <b-col md="6" v-if="whatYouLearn && whatYouLearn.length > 0">
            <ul class="list-group list-group-borderless">
              <li class="list-group-item h6 fw-light d-flex mb-0" v-for="(item, index) in firstHalfLearnItems" :key="index">
                <font-awesome-icon :icon="faCheckCircle" class="text-success me-2" />
                {{ item }}
              </li>
            </ul>
          </b-col>
          <b-col md="6" v-if="whatYouLearn && whatYouLearn.length > 0">
            <ul class="list-group list-group-borderless">
              <li class="list-group-item h6 fw-light d-flex mb-0" v-for="(item, index) in secondHalfLearnItems" :key="index">
                <font-awesome-icon :icon="faCheckCircle" class="text-success me-2" />
                {{ item }}
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { faAngleDown, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  description: {
    type: String,
    required: true,
    default: ''
  },
  extendedDescription: {
    type: String,
    default: ''
  },
  whatYouLearn: {
    type: Array,
    default: () => []
  }
});

const firstHalfLearnItems = computed(() => {
  return props.whatYouLearn.slice(0, Math.ceil(props.whatYouLearn.length / 2));
});

const secondHalfLearnItems = computed(() => {
  return props.whatYouLearn.slice(Math.ceil(props.whatYouLearn.length / 2));
});
</script>