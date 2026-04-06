export const tokens = {
  colors: {
    primary: 'var(--color-primary)',
    primaryHover: 'var(--color-primary-hover)',
    secondary: 'var(--color-secondary)',
    secondaryHover: 'var(--color-secondary-hover)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
  },
  bg: {
    default: 'var(--bg)',
    secondary: 'var(--bg-secondary)',
  },
  text: {
    default: 'var(--text)',
    secondary: 'var(--text-secondary)',
    muted: 'var(--text-muted)',
  },
  border: {
    color: 'var(--border-color)',
    width: 'var(--border-width)',
  },
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
  },
  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    full: 'var(--radius-full)',
  },
  fontSize: {
    xs: 'var(--font-size-xs)',
    sm: 'var(--font-size-sm)',
    md: 'var(--font-size-md)',
    lg: 'var(--font-size-lg)',
  },
  shadow: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
  },
  transition: {
    fast: 'var(--transition-fast)',
    base: 'var(--transition-base)',
  },
};

export type Tokens = typeof tokens;
