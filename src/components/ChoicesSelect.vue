<template>
  <label v-if="label" :for="id" class="form-label text-muted">{{ label }}</label>
  <select
    :id="id"
    :multiple="multiple"
    :value="modelValue"
    @change="updateValue"
    v-bind="$attrs"
    ref="select"
  >
    <slot />
    <template v-if="options">
      <option v-for="(option, idx) in options" :key="idx" :value="option.value">
        {{ option.text }}
      </option>
    </template>
  </select>
</template>

<script setup lang="ts">
import Choices from 'choices.js';
import { ref, watch, onMounted, onUnmounted } from 'vue';
import 'choices.js/public/assets/styles/choices.min.css';

type ChoicesSelectPropsType = {
  id: string;
  label?: string;
  modelValue: string | string[];
  multiple?: boolean;
  options?: { value: string | number; text: string }[];
  choiceOptions?: object;
};

const props = defineProps<ChoicesSelectPropsType>();
const emit = defineEmits(['update:modelValue']);

const select = ref<HTMLSelectElement | null>(null);
let choicesInstance: Choices | null = null;

const updateValue = () => {
  if (choicesInstance) {
    const value = props.multiple
      ? choicesInstance.getValue(true) || []
      : choicesInstance.getValue(true) || '';
    emit('update:modelValue', value);
  }
};

onMounted(() => {
  if (select.value) {
    choicesInstance = new Choices(select.value, {
      allowHTML: false, // Suppress deprecation warning
      searchEnabled: select.value.dataset.searchEnabled === 'true',
      placeholder: select.value.dataset.placeholder === 'true',
      placeholderValue: select.value.dataset.placeholderVal || '',
      maxItemCount: parseInt(select.value.dataset.maxItemCount || '-1'),
      removeItemButton: select.value.dataset.removeItemButton === 'true',
      shouldSort: false,
      ...props.choiceOptions,
    });

    // Sync initial value
    if (props.multiple && Array.isArray(props.modelValue)) {
      choicesInstance.setChoiceByValue(props.modelValue);
    } else if (!props.multiple && typeof props.modelValue === 'string') {
      choicesInstance.setChoiceByValue(props.modelValue);
    }
  }
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (choicesInstance) {
      if (props.multiple && Array.isArray(newValue)) {
        choicesInstance.setChoiceByValue(newValue);
      } else if (!props.multiple && typeof newValue === 'string') {
        choicesInstance.setChoiceByValue(newValue);
      }
    }
  },
  { deep: true }
);

onUnmounted(() => {
  if (choicesInstance) {
    choicesInstance.destroy();
    choicesInstance = null;
  }
});
</script>