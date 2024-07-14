import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Client-side base URL
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5137, // Server port
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  preview: {
    port: 3000, // Client preview port
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});