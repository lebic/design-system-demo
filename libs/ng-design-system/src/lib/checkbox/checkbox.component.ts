import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'ds-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  template: `
    <div class="flex flex-col gap-1">
      <label [for]="inputId" class="inline-flex items-center gap-2 cursor-pointer select-none text-[var(--text)]">
        <input
          [id]="inputId"
          type="checkbox"
          [checked]="value()"
          [disabled]="disabled"
          [attr.aria-describedby]="helperText ? inputId + '-helper' : null"
          (change)="onChange($event)"
          class="h-4 w-4 rounded border-[var(--border-color)] accent-[var(--color-primary)] focus:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50"
        />
        @if (label) {
          <span class="text-[var(--font-size-md)]">{{ label }}</span>
        }
      </label>
      @if (helperText) {
        <p [id]="inputId + '-helper'" class="text-[var(--font-size-sm)] text-[var(--text-muted)] ml-6">{{ helperText }}</p>
      }
    </div>
  `,
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() helperText = '';
  @Input() inputId = `ds-checkbox-${Math.random().toString(36).slice(2, 9)}`;
  @Input() disabled = false;

  value = signal(false);

  private onChangeFn: (val: boolean) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(val: boolean): void {
    this.value.set(!!val);
  }

  registerOnChange(fn: (val: boolean) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.value.set(checked);
    this.onChangeFn(checked);
    this.onTouchedFn();
  }
}
