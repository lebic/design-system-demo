import {
  forwardRef,
  useId,
  useEffect,
  useRef,
  type InputHTMLAttributes,
} from 'react';
import { checkboxRecipe, checkboxLabel, fieldHelp } from '@design-system/recipes';
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
        <label htmlFor={id} className={checkboxLabel}>
          <input
            ref={resolvedRef}
            type="checkbox"
            id={id}
            className={cn(checkboxRecipe(), className)}
            aria-describedby={helperText ? `${id}-helper` : undefined}
            {...props}
          />
          {label && <span className="text-base">{label}</span>}
        </label>
        {helperText && (
          <p id={`${id}-helper`} className={cn(fieldHelp, 'ml-6')}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
