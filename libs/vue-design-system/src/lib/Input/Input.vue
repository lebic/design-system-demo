<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@design-system/utils';
import { inputRecipe, fieldLabel, fieldHelp, fieldError } from '@design-system/recipes';
import type { InputVariant, InputSize } from '@design-system/types';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    placeholder?: string;
    type?: string;
    variant?: InputVariant;
    size?: InputSize;
    errorMessage?: string;
    helperText?: string;
    disabled?: boolean;
    id?: string;
  }>(),
  {
    modelValue: '',
    label: '',
    placeholder: '',
    type: 'text',
    variant: 'default',
    size: 'md',
    errorMessage: '',
    helperText: '',
    disabled: false,
  }
);

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const inputId = props.id ?? `ds-input-${Math.random().toString(36).slice(2, 9)}`;
const descriptionId = computed(() =>
  props.errorMessage || props.helperText ? `${inputId}-desc` : undefined
);

const classes = computed(() =>
  cn(
    inputRecipe({
      variant: props.errorMessage ? 'error' : props.variant,
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
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="classes"
      :aria-invalid="errorMessage ? true : undefined"
      :aria-describedby="descriptionId"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
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
