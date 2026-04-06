import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@design-system/utils': resolve(__dirname, '../../shared/utils/src/index.ts'),
      '@design-system/tokens': resolve(__dirname, '../../libs/tokens/src/index.ts'),
      '@design-system/vue': resolve(__dirname, '../../libs/vue-design-system/src/index.ts'),
    },
  },
});
