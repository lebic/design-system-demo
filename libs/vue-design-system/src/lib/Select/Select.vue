<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@design-system/utils';

type SelectSize = 'sm' | 'md' | 'lg';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

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

const sizeStyles: Record<SelectSize, string> = {
  sm: 'pl-3 pr-8 py-1.5 text-[var(--font-size-sm)]',
  md: 'pl-3 pr-8 py-2 text-[var(--font-size-md)]',
  lg: 'pl-4 pr-8 py-3 text-[var(--font-size-lg)]',
};

const classes = computed(() => {
  const variantStyle = props.errorMessage
    ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]'
    : 'border-[var(--border-color)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]';
  return cn(
    'block w-full rounded-md border bg-[var(--bg)] text-[var(--text)] appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
    variantStyle,
    sizeStyles[props.size]
  );
});
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="inputId" class="text-[var(--font-size-sm)] font-medium text-[var(--text)]">
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
      :class="errorMessage ? 'text-[var(--font-size-sm)] text-[var(--color-error)]' : 'text-[var(--font-size-sm)] text-[var(--text-muted)]'"
      :role="errorMessage ? 'alert' : undefined"
    >
      {{ errorMessage || helperText }}
    </p>
  </div>
</template>
