import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'node',
    setupFiles: ['./test/setup.ts']
  },
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src'),
      '@test': resolve(__dirname, './test')
    }
  }
});
