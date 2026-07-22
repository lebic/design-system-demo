import { Component, Prop, State, h, Event, EventEmitter } from '@stencil/core';
import { inputRecipe, fieldLabel, fieldHelp, fieldError } from '@design-system/recipes';
import type { InputVariant, InputSize } from '@design-system/types';

export type { InputVariant, InputSize } from '@design-system/types';

@Component({
  tag: 'ds-input',
  shadow: false,
})
export class DsInput {
  @Prop({ mutable: true }) value = '';
  @Prop() label = '';
  @Prop() placeholder = '';
  @Prop() type = 'text';
  @Prop() variant: InputVariant = 'default';
  @Prop() size: InputSize = 'md';
  @Prop() errorMessage = '';
  @Prop() helperText = '';
  @Prop() disabled = false;
  @Prop() inputId = `ds-input-${Math.random().toString(36).slice(2, 9)}`;

  @Event() dsInput!: EventEmitter<string>;

  render() {
    const descId = this.errorMessage || this.helperText ? `${this.inputId}-desc` : undefined;

    return (
      <div class="flex flex-col gap-1.5">
        {this.label && (
          <label htmlFor={this.inputId} class={fieldLabel}>
            {this.label}
          </label>
        )}
        <input
          id={this.inputId}
          type={this.type}
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          class={inputRecipe({
            variant: this.errorMessage ? 'error' : this.variant,
            size: this.size,
          })}
          aria-invalid={this.errorMessage ? 'true' : undefined}
          aria-describedby={descId}
          onInput={(e: Event) => {
            const val = (e.target as HTMLInputElement).value;
            this.value = val;
            this.dsInput.emit(val);
          }}
        />
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
