<script setup lang="ts">
import { ref } from 'vue';
import { Button, Checkbox, Input, Select } from '@design-system/vue';

const darkMode = ref(false);
const email = ref('');
const agreed = ref(false);
const framework = ref('');
const loading = ref(false);

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

function toggleDark() {
  darkMode.value = !darkMode.value;
  document.documentElement.setAttribute('data-theme', darkMode.value ? 'dark' : 'light');
}

function handleSubmit() {
  loading.value = true;
  setTimeout(() => { loading.value = false; }, 2000);
}
</script>

<template>
  <div
    :style="{
      minHeight: '100vh',
      backgroundColor: 'var(--bg)',
      color: 'var(--text)',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
    }"
  >
    <header
      :style="{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--border-color)',
      }"
    >
      <h1 :style="{ fontSize: '1.5rem', fontWeight: 700 }">
        💚 Vue Design System Demo
      </h1>
      <Button intent="ghost" @click="toggleDark">
        {{ darkMode ? '☀️ Light' : '🌙 Dark' }}
      </Button>
    </header>

    <main
      :style="{
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }"
    >
      <!-- Buttons -->
      <section>
        <h2 :style="{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }">Buttons</h2>
        <div :style="{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }">
          <Button intent="primary">Primary</Button>
          <Button intent="secondary">Secondary</Button>
          <Button intent="success">Success</Button>
          <Button intent="warning">Warning</Button>
          <Button intent="danger">Danger</Button>
          <Button intent="ghost">Ghost</Button>
        </div>
        <div :style="{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button :is-loading="loading" @click="handleSubmit">
            {{ loading ? 'Loading…' : 'Click to load' }}
          </Button>
        </div>
      </section>

      <!-- Input -->
      <section>
        <h2 :style="{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }">Input</h2>
        <div :style="{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }">
          <Input
            v-model="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            helper-text="We'll never share your email."
          />
          <Input
            label="Password"
            type="password"
            placeholder="Min 8 characters"
            error-message="Password is too short."
          />
          <Input label="Success state" model-value="Valid input" variant="success" />
        </div>
      </section>

      <!-- Select -->
      <section>
        <h2 :style="{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }">Select</h2>
        <div :style="{ maxWidth: '400px' }">
          <Select
            v-model="framework"
            label="Favorite framework"
            :options="frameworks"
            placeholder="Choose a framework…"
            helper-text="Pick your favorite JavaScript framework."
          />
        </div>
      </section>

      <!-- Checkbox -->
      <section>
        <h2 :style="{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }">Checkbox</h2>
        <div :style="{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }">
          <Checkbox v-model="agreed" label="I agree to the terms and conditions" />
          <Checkbox label="Subscribe to newsletter" helper-text="You can unsubscribe at any time." />
          <Checkbox label="Indeterminate state" :indeterminate="true" />
          <Checkbox label="Disabled checkbox" :disabled="true" />
        </div>
      </section>
    </main>
  </div>
</template>
