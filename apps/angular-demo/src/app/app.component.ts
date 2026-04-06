import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ButtonComponent,
  CheckboxComponent,
  InputComponent,
  SelectComponent,
} from '@design-system/ng';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    CheckboxComponent,
    InputComponent,
    SelectComponent,
  ],
  template: `
    <div [style.backgroundColor]="'var(--bg)'" [style.color]="'var(--text)'" style="min-height:100vh;padding:2rem;font-family:system-ui,sans-serif;">
      <header style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;padding-bottom:1rem;border-bottom:1px solid var(--border-color);">
        <h1 style="font-size:1.5rem;font-weight:700;">🅰️ Angular Design System Demo</h1>
        <ds-button intent="ghost" (clicked)="toggleDark()">
          {{ darkMode() ? '☀️ Light' : '🌙 Dark' }}
        </ds-button>
      </header>

      <main style="max-width:800px;margin:0 auto;display:flex;flex-direction:column;gap:2rem;">

        <section>
          <h2 style="margin-bottom:1rem;font-size:1.25rem;font-weight:600;">Buttons</h2>
          <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
            <ds-button intent="primary">Primary</ds-button>
            <ds-button intent="secondary">Secondary</ds-button>
            <ds-button intent="success">Success</ds-button>
            <ds-button intent="warning">Warning</ds-button>
            <ds-button intent="danger">Danger</ds-button>
            <ds-button intent="ghost">Ghost</ds-button>
          </div>
          <div style="display:flex;gap:0.75rem;margin-top:0.75rem;">
            <ds-button size="sm">Small</ds-button>
            <ds-button size="md">Medium</ds-button>
            <ds-button size="lg">Large</ds-button>
            <ds-button [isLoading]="loading()" (clicked)="handleSubmit()">
              {{ loading() ? 'Loading…' : 'Click to load' }}
            </ds-button>
          </div>
        </section>

        <section>
          <h2 style="margin-bottom:1rem;font-size:1.25rem;font-weight:600;">Input</h2>
          <div style="display:flex;flex-direction:column;gap:1rem;max-width:400px;">
            <ds-input label="Email address" type="email" placeholder="you@example.com" helperText="We'll never share your email." />
            <ds-input label="Password" type="password" placeholder="Min 8 characters" errorMessage="Password is too short." />
            <ds-input label="Success state" variant="success" />
          </div>
        </section>

        <section>
          <h2 style="margin-bottom:1rem;font-size:1.25rem;font-weight:600;">Select</h2>
          <div style="max-width:400px;">
            <ds-select
              label="Favorite framework"
              [options]="frameworks"
              placeholder="Choose a framework…"
              helperText="Pick your favorite JavaScript framework."
            />
          </div>
        </section>

        <section>
          <h2 style="margin-bottom:1rem;font-size:1.25rem;font-weight:600;">Checkbox</h2>
          <div style="display:flex;flex-direction:column;gap:0.75rem;">
            <ds-checkbox label="I agree to the terms and conditions" />
            <ds-checkbox label="Subscribe to newsletter" helperText="You can unsubscribe at any time." />
            <ds-checkbox label="Disabled checkbox" [disabled]="true" />
          </div>
        </section>

      </main>
    </div>
  `,
})
export class AppComponent {
  darkMode = signal(false);
  loading = signal(false);

  frameworks = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
  ];

  toggleDark() {
    this.darkMode.update((d) => !d);
    document.documentElement.setAttribute(
      'data-theme',
      this.darkMode() ? 'dark' : 'light'
    );
  }

  handleSubmit() {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 2000);
  }
}
