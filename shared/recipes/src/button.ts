import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Framework-agnostic Button styling. Every stack (React/Vue/Angular/Stencil)
 * binds its props to this one recipe, so a variant change lands everywhere.
 *
 * Classes reference the semantic Tailwind vocabulary (bg-action, rounded-control,
 * …) defined in libs/tokens/src/theme.css — never raw colors or radii. That is
 * what lets a [data-brand] / [data-theme] block restyle the button with zero
 * component changes (e.g. corp brand → rounded-control resolves to 0 → square).
 */
export const buttonRecipe = cva(
  [
    'inline-flex items-center justify-center gap-2 select-none',
    'font-medium border border-transparent rounded-control',
    'transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      intent: {
        primary:
          'bg-action text-on-action hover:bg-action-hover focus-visible:ring-action',
        secondary:
          'bg-secondary text-on-secondary hover:bg-secondary-hover focus-visible:ring-secondary',
        success:
          'bg-success text-on-success hover:brightness-90 focus-visible:ring-success',
        warning:
          'bg-warning text-on-warning hover:brightness-90 focus-visible:ring-warning',
        danger:
          'bg-danger text-on-danger hover:bg-danger-hover focus-visible:ring-danger',
        ghost:
          'bg-transparent text-fg border-line hover:bg-surface-muted focus-visible:ring-action',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  }
);

export type ButtonRecipeProps = VariantProps<typeof buttonRecipe>;
