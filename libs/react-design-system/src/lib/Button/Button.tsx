import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@design-system/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-md border border-transparent',
    'transition-all duration-[var(--transition-base)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none',
  ].join(' '),
  {
    variants: {
      intent: {
        primary: [
          'bg-[var(--color-primary)] text-white',
          'hover:bg-[var(--color-primary-hover)]',
          'focus-visible:ring-[var(--color-primary)]',
        ].join(' '),
        secondary: [
          'bg-[var(--color-secondary)] text-white',
          'hover:bg-[var(--color-secondary-hover)]',
          'focus-visible:ring-[var(--color-secondary)]',
        ].join(' '),
        success: [
          'bg-[var(--color-success)] text-white',
          'hover:brightness-90',
          'focus-visible:ring-[var(--color-success)]',
        ].join(' '),
        warning: [
          'bg-[var(--color-warning)] text-white',
          'hover:brightness-90',
          'focus-visible:ring-[var(--color-warning)]',
        ].join(' '),
        danger: [
          'bg-[var(--color-error)] text-white',
          'hover:brightness-90',
          'focus-visible:ring-[var(--color-error)]',
        ].join(' '),
        ghost: [
          'bg-transparent text-[var(--text)]',
          'border-[var(--border-color)]',
          'hover:bg-[var(--bg-secondary)]',
          'focus-visible:ring-[var(--color-primary)]',
        ].join(' '),
      },
      size: {
        sm: 'px-3 py-1.5 text-[var(--font-size-sm)]',
        md: 'px-4 py-2 text-[var(--font-size-md)]',
        lg: 'px-6 py-3 text-[var(--font-size-lg)]',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ intent, size }), className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
