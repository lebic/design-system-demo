import { forwardRef, useId, type SelectHTMLAttributes } from 'react';
import {
  selectRecipe,
  type SelectRecipeProps,
  fieldLabel,
  fieldHelp,
  fieldError,
} from '@design-system/recipes';
import type { SelectOption } from '@design-system/types';
import { cn } from '@design-system/utils';

export type { SelectOption } from '@design-system/types';

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    SelectRecipeProps {
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
          <label htmlFor={id} className={fieldLabel}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={cn(selectRecipe({ variant: resolvedVariant, size }), className)}
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
            className={errorMessage ? fieldError : fieldHelp}
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
