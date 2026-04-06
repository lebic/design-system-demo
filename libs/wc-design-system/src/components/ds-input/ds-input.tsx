import { Component, Prop, State, h, Event, EventEmitter } from '@stencil/core';

export type InputVariant = 'default' | 'error' | 'success';
export type InputSize = 'sm' | 'md' | 'lg';

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

  private get variantClass(): string {
    const resolved = this.errorMessage ? 'error' : this.variant;
    const map: Record<InputVariant, string> = {
      default: 'border-[var(--border-color)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]',
      error: 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)] text-[var(--color-error)]',
      success: 'border-[var(--color-success)] focus:border-[var(--color-success)] focus:ring-[var(--color-success)]',
    };
    return map[resolved];
  }

  private get sizeClass(): string {
    const map: Record<InputSize, string> = {
      sm: 'px-3 py-1.5 text-[var(--font-size-sm)]',
      md: 'px-3 py-2 text-[var(--font-size-md)]',
      lg: 'px-4 py-3 text-[var(--font-size-lg)]',
    };
    return map[this.size];
  }

  render() {
    const baseClass =
      'block w-full rounded-md border bg-[var(--bg)] text-[var(--text)] placeholder:text-[var(--text-muted)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50';
    const descId = this.errorMessage || this.helperText ? `${this.inputId}-desc` : undefined;

    return (
      <div class="flex flex-col gap-1.5">
        {this.label && (
          <label htmlFor={this.inputId} class="text-[var(--font-size-sm)] font-medium text-[var(--text)]">
            {this.label}
          </label>
        )}
        <input
          id={this.inputId}
          type={this.type}
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          class={`${baseClass} ${this.variantClass} ${this.sizeClass}`}
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
            class={
              this.errorMessage
                ? 'text-[var(--font-size-sm)] text-[var(--color-error)]'
                : 'text-[var(--font-size-sm)] text-[var(--text-muted)]'
            }
            role={this.errorMessage ? 'alert' : undefined}
          >
            {this.errorMessage || this.helperText}
          </p>
        )}
      </div>
    );
  }
}
