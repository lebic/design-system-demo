import {
  Component,
  Input,
  computed,
  forwardRef,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'ds-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="flex flex-col gap-1.5">
      @if (label) {
        <label [for]="inputId" class="text-[var(--font-size-sm)] font-medium text-[var(--text)]">{{ label }}</label>
      }
      <select
        [id]="inputId"
        [disabled]="disabled"
        [class]="classes()"
        [value]="value()"
        [attr.aria-invalid]="errorMessage ? true : null"
        [attr.aria-describedby]="descriptionId()"
        (change)="onChange($event)"
        (blur)="onTouchedFn()"
      >
        @if (placeholder) {
          <option value="" disabled>{{ placeholder }}</option>
        }
        @for (opt of options; track opt.value) {
          <option [value]="opt.value" [disabled]="opt.disabled ?? false">{{ opt.label }}</option>
        }
      </select>
      @if (errorMessage || helperText) {
        <p
          [id]="inputId + '-desc'"
          [class]="errorMessage ? 'text-[var(--font-size-sm)] text-[var(--color-error)]' : 'text-[var(--font-size-sm)] text-[var(--text-muted)]'"
          [attr.role]="errorMessage ? 'alert' : null"
        >
          {{ errorMessage || helperText }}
        </p>
      }
    </div>
  `,
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() options: SelectOption[] = [];
  @Input() size: SelectSize = 'md';
  @Input() errorMessage = '';
  @Input() helperText = '';
  @Input() disabled = false;
  @Input() inputId = `ds-select-${Math.random().toString(36).slice(2, 9)}`;

  value = signal('');

  onChangeFn: (val: string) => void = () => {};
  onTouchedFn: () => void = () => {};

  writeValue(val: string): void {
    this.value.set(val ?? '');
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.value.set(val);
    this.onChangeFn(val);
    this.onTouchedFn();
  }

  descriptionId = computed(() =>
    this.errorMessage || this.helperText ? `${this.inputId}-desc` : null
  );

  private readonly sizeStyles = {
    sm: 'pl-3 pr-8 py-1.5 text-[var(--font-size-sm)]',
    md: 'pl-3 pr-8 py-2 text-[var(--font-size-md)]',
    lg: 'pl-4 pr-8 py-3 text-[var(--font-size-lg)]',
  };

  classes = computed(() => {
    const variantStyle = this.errorMessage
      ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]'
      : 'border-[var(--border-color)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]';
    const base = 'block w-full rounded-md border bg-[var(--bg)] text-[var(--text)] appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50';
    return `${base} ${variantStyle} ${this.sizeStyles[this.size]}`;
  });
}
