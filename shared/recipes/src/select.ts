import { cva, type VariantProps } from 'class-variance-authority';

const CHEVRON =
  "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22%3E%3Cpath fill=%22none%22 stroke=%22%23475569%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22m2 5 6 6 6-6%22/%3E%3C/svg%3E')]";

/** Styling for the <select> control (with custom chevron). */
export const selectRecipe = cva(
  [
    'block w-full rounded-control border bg-surface text-fg',
    'appearance-none cursor-pointer transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]',
    CHEVRON,
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'border-line focus:border-action focus:ring-action',
        error: 'border-danger focus:border-danger focus:ring-danger',
      },
      size: {
        sm: 'pl-3 pr-8 py-1.5 text-sm',
        md: 'pl-3 pr-8 py-2 text-base',
        lg: 'pl-4 pr-8 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type SelectRecipeProps = VariantProps<typeof selectRecipe>;
