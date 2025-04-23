<template>
  <section class="py-0 py-xl-5">
    <b-container>
      <b-row class="g-4">
        <b-col sm="6" xl="3" v-for="(item, idx) in counterData" :key="idx">
          <div
            :class="`d-flex justify-content-center align-items-center p-4 bg-${item.variant} bg-opacity-15 rounded-3`">
            <p class="mb-0">{{ item.title }}</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script setup lang="ts">
import NumberAnimation from "vue-number-animation";
import { counterData } from '@/views/demos/default/components/data';

const format = (value: string) => {
  return Number.parseInt(value);
};
</script>