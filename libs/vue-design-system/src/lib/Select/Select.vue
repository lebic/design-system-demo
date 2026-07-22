<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@design-system/utils';
import { selectRecipe, fieldLabel, fieldHelp, fieldError } from '@design-system/recipes';
import type { SelectSize, SelectOption } from '@design-system/types';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    options: SelectOption[];
    placeholder?: string;
    size?: SelectSize;
    errorMessage?: string;
    helperText?: string;
    disabled?: boolean;
    id?: string;
  }>(),
  {
    modelValue: '',
    label: '',
    placeholder: '',
    size: 'md',
    errorMessage: '',
    helperText: '',
    disabled: false,
  }
);

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const inputId = props.id ?? `ds-select-${Math.random().toString(36).slice(2, 9)}`;
const descriptionId = computed(() =>
  props.errorMessage || props.helperText ? `${inputId}-desc` : undefined
);

const classes = computed(() =>
  cn(
    selectRecipe({
      variant: props.errorMessage ? 'error' : 'default',
      size: props.size,
    })
  )
);
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="inputId" :class="fieldLabel">
      {{ label }}
    </label>
    <select
      :id="inputId"
      :value="modelValue"
      :disabled="disabled"
      :class="classes"
      :aria-invalid="errorMessage ? true : undefined"
      :aria-describedby="descriptionId"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
        :disabled="opt.disabled"
      >
        {{ opt.label }}
      </option>
    </select>
    <p
      v-if="errorMessage || helperText"
      :id="descriptionId"
      :class="errorMessage ? fieldError : fieldHelp"
      :role="errorMessage ? 'alert' : undefined"
    >
      {{ errorMessage || helperText }}
    </p>
  </div>
</template>
