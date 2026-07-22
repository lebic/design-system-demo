import { cva, type VariantProps } from 'class-variance-authority';

/** Styling for the <input> control. Shared by every framework binding. */
export const inputRecipe = cva(
  [
    'block w-full rounded-control border bg-surface text-fg',
    'placeholder:text-fg-muted transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'border-line focus:border-action focus:ring-action',
        error: 'border-danger focus:border-danger focus:ring-danger text-danger',
        success: 'border-success focus:border-success focus:ring-success',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-3 py-2 text-base',
        lg: 'px-4 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type InputRecipeProps = VariantProps<typeof inputRecipe>;
