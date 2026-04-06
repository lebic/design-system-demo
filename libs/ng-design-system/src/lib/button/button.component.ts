import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonIntent =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

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

  private readonly intentStyles: Record<ButtonIntent, string> = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] focus-visible:ring-[var(--color-primary)]',
    secondary: 'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-hover)] focus-visible:ring-[var(--color-secondary)]',
    success: 'bg-[var(--color-success)] text-white hover:brightness-90 focus-visible:ring-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)] text-white hover:brightness-90 focus-visible:ring-[var(--color-warning)]',
    danger: 'bg-[var(--color-error)] text-white hover:brightness-90 focus-visible:ring-[var(--color-error)]',
    ghost: 'bg-transparent text-[var(--text)] border-[var(--border-color)] hover:bg-[var(--bg-secondary)] focus-visible:ring-[var(--color-primary)]',
  };

  private readonly sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-[var(--font-size-sm)]',
    md: 'px-4 py-2 text-[var(--font-size-md)]',
    lg: 'px-6 py-3 text-[var(--font-size-lg)]',
  };

  classes = computed(() => {
    const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-md border border-transparent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none';
    return `${base} ${this.intentStyles[this.intent]} ${this.sizeStyles[this.size]}`;
  });
}
