/** Canonical variant unions shared by every framework binding. */
export type Size = 'sm' | 'md' | 'lg';

export type ButtonIntent =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'ghost';

export type ButtonSize = Size;

export type InputVariant = 'default' | 'error' | 'success';
export type InputSize = Size;

export type SelectVariant = 'default' | 'error';
export type SelectSize = Size;

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
