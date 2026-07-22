import {
  Component,
  Input,
  computed,
  forwardRef,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { inputRecipe, fieldLabel, fieldHelp, fieldError } from '@design-system/recipes';
import type { InputVariant, InputSize } from '@design-system/types';

export type { InputVariant, InputSize } from '@design-system/types';

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
        <label [for]="inputId" [class]="labelClass">{{ label }}</label>
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
          [class]="errorMessage ? errorClass : helpClass"
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

  readonly labelClass = fieldLabel;
  readonly helpClass = fieldHelp;
  readonly errorClass = fieldError;

  classes(): string {
    return inputRecipe({
      variant: this.errorMessage ? 'error' : this.variant,
      size: this.size,
    });
  }
}
