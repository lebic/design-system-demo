import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

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

  private get sizeClass(): string {
    const map: Record<SelectSize, string> = {
      sm: 'pl-3 pr-8 py-1.5 text-[var(--font-size-sm)]',
      md: 'pl-3 pr-8 py-2 text-[var(--font-size-md)]',
      lg: 'pl-4 pr-8 py-3 text-[var(--font-size-lg)]',
    };
    return map[this.size];
  }

  render() {
    const variantClass = this.errorMessage
      ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]'
      : 'border-[var(--border-color)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]';
    const baseClass =
      'block w-full rounded-md border bg-[var(--bg)] text-[var(--text)] appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50';
    const descId = this.errorMessage || this.helperText ? `${this.inputId}-desc` : undefined;

    return (
      <div class="flex flex-col gap-1.5">
        {this.label && (
          <label htmlFor={this.inputId} class="text-[var(--font-size-sm)] font-medium text-[var(--text)]">
            {this.label}
          </label>
        )}
        <select
          id={this.inputId}
          value={this.value}
          disabled={this.disabled}
          class={`${baseClass} ${variantClass} ${this.sizeClass}`}
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
