import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { inputRecipe, type InputRecipeProps, fieldLabel, fieldHelp, fieldError } from '@design-system/recipes';
import { cn } from '@design-system/utils';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    InputRecipeProps {
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
          <label htmlFor={id} className={fieldLabel}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(inputRecipe({ variant: resolvedVariant, size }), className)}
          aria-invalid={!!errorMessage}
          aria-describedby={descriptionId}
          {...props}
        />
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

Input.displayName = 'Input';
