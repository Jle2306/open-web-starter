import { test, expect } from "@playwright/test";
import { fillBooking } from "./helpers";

test("booking validates required fields and completes without a network insert", async ({ page }) => {
  let inserts = 0;
  page.on("request", (request) => { if (request.url().includes("/rest/v1/")) inserts++; });
  await page.goto("/starters/booking/");
  await page.getByRole("button", { name: "Submit request" }).click();
  await expect(page.getByRole("status")).toContainText("Choose a valid service.");
  await expect(page.getByRole("button", { name: "12:00 · unavailable" })).toBeDisabled();
  await fillBooking(page);
  await page.getByLabel("Email", { exact: true }).fill("invalid");
  await page.getByRole("button", { name: "Submit request" }).click();
  await expect(page.getByRole("status")).toContainText("valid email");
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue("Example Person");
  await page.getByLabel("Email", { exact: true }).fill("example@example.com");
  await page.getByRole("button", { name: "Submit request" }).click();
  await expect(page.getByRole("status")).toContainText("Nothing was sent or saved");
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue("");
  expect(inserts).toBe(0);
});

test("CRM filters, edits and resets synthetic records", async ({ page }) => {
  await page.goto("/starters/crm/");
  await page.getByLabel("Search records").fill("example studio");
  await expect(page.getByRole("status")).toHaveText("1 matching records");
  await page.getByRole("button", { name: "View Example Studio" }).click();
  await page.getByRole("combobox", { name: "Record status", exact: true }).selectOption("Won");
  await page.getByRole("combobox", { name: "Filter status", exact: true }).selectOption("New");
  await expect(page.getByText("No records match.", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Reset demo" }).click();
  await expect(page.getByRole("status")).toHaveText("3 matching records");
  await expect(page.getByRole("combobox", { name: "Record status", exact: true })).toHaveValue("New");
});

test("order collects quantities and clearly reports no actual order", async ({ page }) => {
  await page.goto("/starters/order-collection/");
  await page.getByRole("button", { name: "Submit demo order" }).click();
  await expect(page.getByRole("status")).toContainText("Add at least one product");
  await page.getByLabel("Quantity for Example notebook").fill("2");
  await page.getByLabel("Quantity for Example pencil set").fill("1");
  await expect(page.getByText("Estimated total: $20.50", { exact: true })).toBeVisible();
  await page.getByLabel("Name", { exact: true }).fill("Example Person");
  await page.getByLabel("Email", { exact: true }).fill("example@example.com");
  await page.getByRole("button", { name: "Submit demo order" }).click();
  await expect(page.getByRole("status")).toContainText("no order was placed and no payment was taken");
  await expect(page.getByLabel("Quantity for Example notebook")).toHaveValue("0");
});

test("all starter routes render without page errors or horizontal overflow", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of ["/", "/starters/", "/docs/", "/starters/booking/", "/starters/crm/", "/starters/admin/", "/starters/personal-brand/", "/starters/course-landing/", "/starters/order-collection/"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    const name = route === "/" ? "home" : route.replaceAll("/", "_");
    const screenshot = testInfo.outputPath(`${name}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });
    await testInfo.attach(name, { path: screenshot, contentType: "image/png" });
  }
  expect(errors).toEqual([]);
});
