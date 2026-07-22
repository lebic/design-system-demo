import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { buttonRecipe } from '@design-system/recipes';
import type { ButtonIntent, ButtonSize } from '@design-system/types';

export type { ButtonIntent, ButtonSize } from '@design-system/types';

@Component({
  selector: 'ds-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="classes()"
      [disabled]="disabled || isLoading"
      [attr.aria-busy]="isLoading || null"
      [attr.aria-disabled]="disabled || isLoading || null"
      [attr.type]="type"
      (click)="clicked.emit($event)"
    >
      @if (isLoading) {
        <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      }
      <ng-content />
    </button>
  `,
})
export class ButtonComponent {
  @Input() intent: ButtonIntent = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() isLoading = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() clicked = new EventEmitter<MouseEvent>();

  classes(): string {
    return buttonRecipe({ intent: this.intent, size: this.size });
  }
}
