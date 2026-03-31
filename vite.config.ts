import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // In dev mode, serve the docs. In build mode, compile the component library.
  build: command === 'build'
    ? {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'KardiaDS',
          fileName: (format) => `kardia-ds.${format}.js`,
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react/jsx-runtime': 'jsxRuntime',
            },
          },
        },
      }
    : {},
}));
