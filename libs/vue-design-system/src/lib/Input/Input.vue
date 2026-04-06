<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@design-system/utils';

type InputVariant = 'default' | 'error' | 'success';
type InputSize = 'sm' | 'md' | 'lg';

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

const variantStyles: Record<InputVariant, string> = {
  default: 'border-[var(--border-color)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]',
  error: 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)] text-[var(--color-error)]',
  success: 'border-[var(--color-success)] focus:border-[var(--color-success)] focus:ring-[var(--color-success)]',
};

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-[var(--font-size-sm)]',
  md: 'px-3 py-2 text-[var(--font-size-md)]',
  lg: 'px-4 py-3 text-[var(--font-size-lg)]',
};

const classes = computed(() => {
  const resolvedVariant = props.errorMessage ? 'error' : props.variant;
  return cn(
    'block w-full rounded-md border bg-[var(--bg)] text-[var(--text)] placeholder:text-[var(--text-muted)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
    variantStyles[resolvedVariant],
    sizeStyles[props.size]
  );
});
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="inputId" class="text-[var(--font-size-sm)] font-medium text-[var(--text)]">
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
      :class="errorMessage ? 'text-[var(--font-size-sm)] text-[var(--color-error)]' : 'text-[var(--font-size-sm)] text-[var(--text-muted)]'"
      :role="errorMessage ? 'alert' : undefined"
    >
      {{ errorMessage || helperText }}
    </p>
  </div>
</template>
