import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';
import { selectRecipe, fieldLabel, fieldHelp, fieldError } from '@design-system/recipes';
import type { SelectSize, SelectOption } from '@design-system/types';

export type { SelectSize, SelectOption } from '@design-system/types';

@Component({
  tag: 'ds-select',
  shadow: false,
})
export class DsSelect {
  @Prop({ mutable: true }) value = '';
  @Prop() label = '';
  @Prop() placeholder = '';
  @Prop() options: SelectOption[] = [];
  @Prop() size: SelectSize = 'md';
  @Prop() errorMessage = '';
  @Prop() helperText = '';
  @Prop() disabled = false;
  @Prop() inputId = `ds-select-${Math.random().toString(36).slice(2, 9)}`;

  @Event() dsChange!: EventEmitter<string>;

  render() {
    const descId = this.errorMessage || this.helperText ? `${this.inputId}-desc` : undefined;

    return (
      <div class="flex flex-col gap-1.5">
        {this.label && (
          <label htmlFor={this.inputId} class={fieldLabel}>
            {this.label}
          </label>
        )}
        <select
          id={this.inputId}
          value={this.value}
          disabled={this.disabled}
          class={selectRecipe({
            variant: this.errorMessage ? 'error' : 'default',
            size: this.size,
          })}
          aria-invalid={this.errorMessage ? 'true' : undefined}
          aria-describedby={descId}
          onChange={(e: Event) => {
            const val = (e.target as HTMLSelectElement).value;
            this.value = val;
            this.dsChange.emit(val);
          }}
        >
          {this.placeholder && <option value="" disabled>{this.placeholder}</option>}
          {this.options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {(this.errorMessage || this.helperText) && (
          <p
            id={descId}
            class={this.errorMessage ? fieldError : fieldHelp}
            role={this.errorMessage ? 'alert' : undefined}
          >
            {this.errorMessage || this.helperText}
          </p>
        )}
      </div>
    );
  }
}
