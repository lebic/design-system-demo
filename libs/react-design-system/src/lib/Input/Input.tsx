import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@design-system/utils';

const inputVariants = cva(
  [
    'block w-full rounded-md border bg-[var(--bg)] text-[var(--text)]',
    'placeholder:text-[var(--text-muted)]',
    'transition-colors duration-[var(--transition-fast)]',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'border-[var(--border-color)]',
          'focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]',
        ].join(' '),
        error: [
          'border-[var(--color-error)]',
          'focus:border-[var(--color-error)] focus:ring-[var(--color-error)]',
          'text-[var(--color-error)]',
        ].join(' '),
        success: [
          'border-[var(--color-success)]',
          'focus:border-[var(--color-success)] focus:ring-[var(--color-success)]',
        ].join(' '),
      },
      size: {
        sm: 'px-3 py-1.5 text-[var(--font-size-sm)]',
        md: 'px-3 py-2 text-[var(--font-size-md)]',
        lg: 'px-4 py-3 text-[var(--font-size-lg)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      label,
      helperText,
      errorMessage,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const resolvedVariant = errorMessage ? 'error' : variant;
    const descriptionId = helperText || errorMessage ? `${id}-desc` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-[var(--font-size-sm)] font-medium text-[var(--text)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(inputVariants({ variant: resolvedVariant, size }), className)}
          aria-invalid={!!errorMessage}
          aria-describedby={descriptionId}
          {...props}
        />
        {(helperText || errorMessage) && (
          <p
            id={descriptionId}
            className={cn(
              'text-[var(--font-size-sm)]',
              errorMessage
                ? 'text-[var(--color-error)]'
                : 'text-[var(--text-muted)]'
            )}
            role={errorMessage ? 'alert' : undefined}
          >
            {errorMessage ?? helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
