import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@design-system/utils': resolve(__dirname, '../../shared/utils/src/index.ts'),
      '@design-system/tokens': resolve(__dirname, '../../libs/tokens/src/index.ts'),
      '@design-system/types': resolve(__dirname, '../../shared/types/src/index.ts'),
      '@design-system/recipes': resolve(__dirname, '../../shared/recipes/src/index.ts'),
      '@design-system/vue': resolve(__dirname, '../../libs/vue-design-system/src/index.ts'),
    },
  },
});
