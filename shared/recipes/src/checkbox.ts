import { cva } from 'class-variance-authority';

/** Styling for the <input type="checkbox"> control. */
export const checkboxRecipe = cva(
  [
    'h-4 w-4 rounded-control border-line',
    'text-action accent-action',
    'focus:ring-action focus:ring-offset-0',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' ')
);
