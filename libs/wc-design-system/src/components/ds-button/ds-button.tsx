import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

export type ButtonIntent = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ds-button',
  shadow: false,
  styles: `
    :host { display: inline-block; }
  `,
})
export class DsButton {
  @Prop() intent: ButtonIntent = 'primary';
  @Prop() size: ButtonSize = 'md';
  @Prop() disabled = false;
  @Prop() isLoading = false;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  @Event() dsClick!: EventEmitter<MouseEvent>;

  private get intentClass(): string {
    const map: Record<ButtonIntent, string> = {
      primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]',
      secondary: 'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-hover)]',
      success: 'bg-[var(--color-success)] text-white hover:brightness-90',
      warning: 'bg-[var(--color-warning)] text-white hover:brightness-90',
      danger: 'bg-[var(--color-error)] text-white hover:brightness-90',
      ghost: 'bg-transparent text-[var(--text)] border-[var(--border-color)] hover:bg-[var(--bg-secondary)]',
    };
    return map[this.intent];
  }

  private get sizeClass(): string {
    const map: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-[var(--font-size-sm)]',
      md: 'px-4 py-2 text-[var(--font-size-md)]',
      lg: 'px-6 py-3 text-[var(--font-size-lg)]',
    };
    return map[this.size];
  }

  render() {
    const baseClass =
      'inline-flex items-center justify-center gap-2 font-medium rounded-md border border-transparent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none';

    return (
      <button
        type={this.type}
        class={`${baseClass} ${this.intentClass} ${this.sizeClass}`}
        disabled={this.disabled || this.isLoading}
        aria-busy={this.isLoading}
        aria-disabled={this.disabled || this.isLoading}
        onClick={(e: MouseEvent) => this.dsClick.emit(e)}
      >
        {this.isLoading && (
          <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        <slot />
      </button>
    );
  }
}
