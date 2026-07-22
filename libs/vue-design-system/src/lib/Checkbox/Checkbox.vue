<script setup lang="ts">
import { ref, watch } from 'vue';
import { cn } from '@design-system/utils';
import { checkboxRecipe, checkboxLabel, fieldHelp } from '@design-system/recipes';

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    label?: string;
    helperText?: string;
    disabled?: boolean;
    indeterminate?: boolean;
    id?: string;
  }>(),
  {
    modelValue: false,
    label: '',
    helperText: '',
    disabled: false,
    indeterminate: false,
  }
);

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();

const inputRef = ref<HTMLInputElement | null>(null);
const inputId = props.id ?? `ds-checkbox-${Math.random().toString(36).slice(2, 9)}`;

const controlClass = checkboxRecipe();
const helpClass = cn(fieldHelp, 'ml-6');

watch(
  () => props.indeterminate,
  (val) => {
    if (inputRef.value) {
      inputRef.value.indeterminate = val ?? false;
    }
  },
  { immediate: true }
);

function onChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).checked);
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="inputId" :class="checkboxLabel">
      <input
        ref="inputRef"
        :id="inputId"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :aria-describedby="helperText ? inputId + '-helper' : undefined"
        :class="controlClass"
        @change="onChange"
      />
      <span v-if="label" class="text-base">{{ label }}</span>
    </label>
    <p v-if="helperText" :id="inputId + '-helper'" :class="helpClass">
      {{ helperText }}
    </p>
  </div>
</template>
