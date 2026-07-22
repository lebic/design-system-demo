import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@design-system/utils': resolve(__dirname, '../../shared/utils/src/index.ts'),
      '@design-system/tokens': resolve(__dirname, '../../libs/tokens/src/index.ts'),
      '@design-system/types': resolve(__dirname, '../../shared/types/src/index.ts'),
      '@design-system/recipes': resolve(__dirname, '../../shared/recipes/src/index.ts'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueDesignSystem',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
  },
});
