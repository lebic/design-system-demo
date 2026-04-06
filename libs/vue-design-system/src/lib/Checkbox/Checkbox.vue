<script setup lang="ts">
import { ref, watch } from 'vue';

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
    <label :for="inputId" class="inline-flex items-center gap-2 cursor-pointer select-none text-[var(--text)]">
      <input
        ref="inputRef"
        :id="inputId"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :aria-describedby="helperText ? inputId + '-helper' : undefined"
        class="h-4 w-4 rounded border-[var(--border-color)] accent-[var(--color-primary)] focus:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50"
        @change="onChange"
      />
      <span v-if="label" class="text-[var(--font-size-md)]">{{ label }}</span>
    </label>
    <p
      v-if="helperText"
      :id="inputId + '-helper'"
      class="text-[var(--font-size-sm)] text-[var(--text-muted)] ml-6"
    >
      {{ helperText }}
    </p>
  </div>
</template>
