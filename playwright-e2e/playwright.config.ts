import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  fullyParallel: true, // Set to false to run tests serially within the same project
  workers: 1, // Set to 1 to run tests serially within the same project
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    }
    // Add more configurations as needed
  ],
});
