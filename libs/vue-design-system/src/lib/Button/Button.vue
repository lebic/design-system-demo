<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@design-system/utils';

type ButtonIntent = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const props = withDefaults(
  defineProps<{
    intent?: ButtonIntent;
    size?: ButtonSize;
    disabled?: boolean;
    isLoading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    class?: string;
  }>(),
  {
    intent: 'primary',
    size: 'md',
    disabled: false,
    isLoading: false,
    type: 'button',
  }
);

const emit = defineEmits<{ click: [event: MouseEvent] }>();

const intentStyles: Record<ButtonIntent, string> = {
  primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] focus-visible:ring-[var(--color-primary)]',
  secondary: 'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-hover)] focus-visible:ring-[var(--color-secondary)]',
  success: 'bg-[var(--color-success)] text-white hover:brightness-90 focus-visible:ring-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)] text-white hover:brightness-90 focus-visible:ring-[var(--color-warning)]',
  danger: 'bg-[var(--color-error)] text-white hover:brightness-90 focus-visible:ring-[var(--color-error)]',
  ghost: 'bg-transparent text-[var(--text)] border-[var(--border-color)] hover:bg-[var(--bg-secondary)] focus-visible:ring-[var(--color-primary)]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-[var(--font-size-sm)]',
  md: 'px-4 py-2 text-[var(--font-size-md)]',
  lg: 'px-6 py-3 text-[var(--font-size-lg)]',
};

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-2 font-medium rounded-md border border-transparent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none',
    intentStyles[props.intent],
    sizeStyles[props.size],
    props.class
  )
);
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled || isLoading"
    :type="type"
    :aria-busy="isLoading || undefined"
    :aria-disabled="(disabled || isLoading) || undefined"
    @click="emit('click', $event)"
  >
    <svg
      v-if="isLoading"
      class="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    <slot />
  </button>
</template>
