import {
  forwardRef,
  useId,
  useEffect,
  useRef,
  type InputHTMLAttributes,
} from 'react';
import { cn } from '@design-system/utils';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  indeterminate?: boolean;
  helperText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, indeterminate, helperText, id: externalId, ...props }, ref) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const innerRef = useRef<HTMLInputElement>(null);

    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) ?? innerRef;

    useEffect(() => {
      if (resolvedRef && 'current' in resolvedRef && resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate, resolvedRef]);

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={id}
          className="inline-flex items-center gap-2 cursor-pointer select-none text-[var(--text)]"
        >
          <input
            ref={resolvedRef}
            type="checkbox"
            id={id}
            className={cn(
              'h-4 w-4 rounded border-[var(--border-color)]',
              'text-[var(--color-primary)]',
              'focus:ring-[var(--color-primary)] focus:ring-offset-0',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'accent-[var(--color-primary)]',
              className
            )}
            aria-describedby={helperText ? `${id}-helper` : undefined}
            {...props}
          />
          {label && (
            <span className="text-[var(--font-size-md)]">{label}</span>
          )}
        </label>
        {helperText && (
          <p
            id={`${id}-helper`}
            className="text-[var(--font-size-sm)] text-[var(--text-muted)] ml-6"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
