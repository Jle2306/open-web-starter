import { defineConfig, devices } from "@playwright/test";

const connected = process.env.E2E_CONNECTED === "1";
export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: connected ? "connected.spec.ts" : "demo.spec.ts",
  outputDir: connected ? "test-results/connected" : "test-results/demo",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  globalTimeout: 180000,
  reporter: [["list"], ["html", { open: "never", outputFolder: connected ? "playwright-report/connected" : "playwright-report/demo" }]],
  use: { baseURL: "http://127.0.0.1:3101", channel: "chromium", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run build && node scripts/serve-export.mjs",
    url: "http://127.0.0.1:3101",
    reuseExistingServer: false,
    timeout: 120000,
    env: {
      NEXT_PUBLIC_SUPABASE_URL: connected ? "http://127.0.0.1:54321" : "",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: connected ? "example-public-client-key" : "",
    },
  },
});
