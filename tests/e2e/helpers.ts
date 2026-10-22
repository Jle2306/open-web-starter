import type { Page } from "@playwright/test";

export async function fillBooking(page: Page) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
  await page.getByRole("radio", { name: "Introductory consultation" }).check();
  await page.getByLabel("Date (within 90 days)").fill(date);
  await page.getByRole("button", { name: "09:00", exact: true }).click();
  await page.getByLabel("Name", { exact: true }).fill("Example Person");
  await page.getByLabel("Email", { exact: true }).fill("example@example.com");
}
