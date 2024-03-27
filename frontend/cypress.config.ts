import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://localhost:3000/',
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
