import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/kardia_design_system/',
  build: {
    outDir: 'docs-dist',
  },
});
