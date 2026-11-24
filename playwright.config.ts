import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
 testDir: './tests', fullyParallel: true,
 use: { channel: process.env.PLAYWRIGHT_CHANNEL, baseURL: 'http://127.0.0.1:4178', reducedMotion: 'reduce', trace: 'retain-on-failure' },
 webServer: { command: 'npm run preview -- --port 4178 --strictPort', url: 'http://127.0.0.1:4178', reuseExistingServer: !process.env.CI },
 projects: [ { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } }, { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } } ],
});
