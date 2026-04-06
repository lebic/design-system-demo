import {
  Component,
  Input,
  computed,
  forwardRef,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export type InputVariant = 'default' | 'error' | 'success';
export type InputSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="flex flex-col gap-1.5">
      @if (label) {
        <label [for]="inputId" class="text-[var(--font-size-sm)] font-medium text-[var(--text)]">{{ label }}</label>
      }
      <input
        [id]="inputId"
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [class]="classes()"
        [value]="value()"
        [attr.aria-invalid]="errorMessage ? true : null"
        [attr.aria-describedby]="descriptionId()"
        (input)="onInput($event)"
        (blur)="onTouchedFn()"
      />
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
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() variant: InputVariant = 'default';
  @Input() size: InputSize = 'md';
  @Input() errorMessage = '';
  @Input() helperText = '';
  @Input() disabled = false;
  @Input() inputId = `ds-input-${Math.random().toString(36).slice(2, 9)}`;

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

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChangeFn(val);
  }

  descriptionId = computed(() =>
    this.errorMessage || this.helperText ? `${this.inputId}-desc` : null
  );

  private readonly variantStyles = {
    default: 'border-[var(--border-color)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]',
    error: 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)] text-[var(--color-error)]',
    success: 'border-[var(--color-success)] focus:border-[var(--color-success)] focus:ring-[var(--color-success)]',
  };

  private readonly sizeStyles = {
    sm: 'px-3 py-1.5 text-[var(--font-size-sm)]',
    md: 'px-3 py-2 text-[var(--font-size-md)]',
    lg: 'px-4 py-3 text-[var(--font-size-lg)]',
  };

  classes = computed(() => {
    const resolvedVariant = this.errorMessage ? 'error' : this.variant;
    const base = 'block w-full rounded-md border bg-[var(--bg)] text-[var(--text)] placeholder:text-[var(--text-muted)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50';
    return `${base} ${this.variantStyles[resolvedVariant]} ${this.sizeStyles[this.size]}`;
  });
}
