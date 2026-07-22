import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';
import { buttonRecipe } from '@design-system/recipes';
import type { ButtonIntent, ButtonSize } from '@design-system/types';

export type { ButtonIntent, ButtonSize } from '@design-system/types';

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

  render() {
    return (
      <button
        type={this.type}
        class={buttonRecipe({ intent: this.intent, size: this.size })}
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
