import type { Preview, Decorator } from '@storybook/react';
import '../../../shared/styles/tailwind.css';

/** Reflect the toolbar globals onto <html> so token blocks resolve. */
const withBrandTheme: Decorator = (Story, context) => {
  const { brand, theme } = context.globals;
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    // 'default' brand = no attribute (base tokens win).
    if (brand && brand !== 'default') root.setAttribute('data-brand', brand);
    else root.removeAttribute('data-brand');
    root.setAttribute('data-theme', theme ?? 'light');
  }
  return Story();
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    brand: {
      description: 'Design brand (color + radius identity)',
      defaultValue: 'default',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default (rounded)' },
          { value: 'corp', title: 'Corp (square)' },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Light / dark mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withBrandTheme],
};

export default preview;
