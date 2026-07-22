import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@design-system/utils': resolve(__dirname, '../../shared/utils/src/index.ts'),
      '@design-system/tokens': resolve(__dirname, '../../libs/tokens/src/index.ts'),
      '@design-system/types': resolve(__dirname, '../../shared/types/src/index.ts'),
      '@design-system/recipes': resolve(__dirname, '../../shared/recipes/src/index.ts'),
      '@design-system/react': resolve(__dirname, '../../libs/react-design-system/src/index.ts'),
    },
  },
});
