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
import { checkboxRecipe, checkboxLabel, fieldHelp } from '@design-system/recipes';

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
      <label [for]="inputId" [class]="labelClass">
        <input
          [id]="inputId"
          type="checkbox"
          [checked]="value()"
          [disabled]="disabled"
          [attr.aria-describedby]="helperText ? inputId + '-helper' : null"
          (change)="onChange($event)"
          [class]="controlClass"
        />
        @if (label) {
          <span class="text-base">{{ label }}</span>
        }
      </label>
      @if (helperText) {
        <p [id]="inputId + '-helper'" [class]="helpClass">{{ helperText }}</p>
      }
    </div>
  `,
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() helperText = '';
  @Input() inputId = `ds-checkbox-${Math.random().toString(36).slice(2, 9)}`;
  @Input() disabled = false;

  readonly labelClass = checkboxLabel;
  readonly controlClass = checkboxRecipe();
  readonly helpClass = `${fieldHelp} ml-6`;

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
