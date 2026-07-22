import {
  Component,
  Input,
  computed,
  forwardRef,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { selectRecipe, fieldLabel, fieldHelp, fieldError } from '@design-system/recipes';
import type { SelectSize, SelectOption } from '@design-system/types';

export type { SelectSize, SelectOption } from '@design-system/types';

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
        <label [for]="inputId" [class]="labelClass">{{ label }}</label>
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
          [class]="errorMessage ? errorClass : helpClass"
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

  readonly labelClass = fieldLabel;
  readonly helpClass = fieldHelp;
  readonly errorClass = fieldError;

  classes(): string {
    return selectRecipe({
      variant: this.errorMessage ? 'error' : 'default',
      size: this.size,
    });
  }
}
