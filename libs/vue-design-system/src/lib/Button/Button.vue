<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@design-system/utils';
import { buttonRecipe } from '@design-system/recipes';
import type { ButtonIntent, ButtonSize } from '@design-system/types';

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

const classes = computed(() =>
  cn(buttonRecipe({ intent: props.intent, size: props.size }), props.class)
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
