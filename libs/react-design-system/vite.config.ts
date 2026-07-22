import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
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
      name: 'ReactDesignSystem',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
