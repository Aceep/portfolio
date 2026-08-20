/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // `open` is deliberately off: the dev server also runs inside the container
    // from docker-compose, where there is no browser to launch.
    open: false,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      // The bar the suite already clears. It is here to stop coverage
      // sliding, not to chase a number: "62 tests" was a count, and there was
      // no way to tell what they actually reached.
      thresholds: {
        statements: 60,
        branches: 70,
        functions: 55,
        lines: 60,
      },
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/main.tsx', 'src/test/**', 'src/types/**', '**/*.test.{ts,tsx}'],
    },
  },
});
