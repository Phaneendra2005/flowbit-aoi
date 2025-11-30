import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  use: {
    headless: true,
    baseURL: "http://localhost:5173",
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: "npm run dev",
    port: 5173,
    // re-use an existing server in dev, but in CI this will start it
    reuseExistingServer: process.env.CI ? false : true,
    timeout: 120_000,
  },
});
