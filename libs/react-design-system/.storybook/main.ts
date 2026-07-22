import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// Nx runs this executor from the workspace root.
const r = (p: string) => resolve(process.cwd(), p);

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(cfg) {
    return mergeConfig(cfg, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          '@design-system/utils': r('shared/utils/src/index.ts'),
          '@design-system/tokens': r('libs/tokens/src/index.ts'),
          '@design-system/types': r('shared/types/src/index.ts'),
          '@design-system/recipes': r('shared/recipes/src/index.ts'),
        },
      },
    });
  },
};

export default config;
