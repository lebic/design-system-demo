import { forwardRef, useId, type SelectHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@design-system/utils';

const selectVariants = cva(
  [
    'block w-full rounded-md border bg-[var(--bg)] text-[var(--text)]',
    'appearance-none cursor-pointer',
    'transition-colors duration-[var(--transition-fast)]',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'bg-no-repeat bg-[right_0.75rem_center]',
    'bg-[url(\'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"%3E%3Cpath fill="none" stroke="%23475569" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m2 5 6 6 6-6"/%3E%3C/svg%3E\')]',
    'bg-[length:1rem]',
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
        ].join(' '),
      },
      size: {
        sm: 'pl-3 pr-8 py-1.5 text-[var(--font-size-sm)]',
        md: 'pl-3 pr-8 py-2 text-[var(--font-size-md)]',
        lg: 'pl-4 pr-8 py-3 text-[var(--font-size-lg)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  errorMessage?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      label,
      options,
      placeholder,
      errorMessage,
      helperText,
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
        <select
          ref={ref}
          id={id}
          className={cn(selectVariants({ variant: resolvedVariant, size }), className)}
          aria-invalid={!!errorMessage}
          aria-describedby={descriptionId}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
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

Select.displayName = 'Select';
