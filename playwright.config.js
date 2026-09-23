import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
   reporter: [['list'], ['html', { open: 'never' }]],
  fullyParallel: false,
  timeout: 30000,
  use: { baseURL: 'http://localhost:4173' },
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    timeout: 60000,
  },
  projects: [
   { name: 'desktop', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
  { name: 'mobile', use: { ...devices['Pixel 7'], channel: 'msedge' } },
  ],
  
});