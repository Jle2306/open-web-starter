import { test, expect } from "@playwright/test";
import { fillBooking } from "./helpers";

// Requests are intercepted; these tests do NOT validate a live Supabase service/RLS.
test("failed insert preserves values and retry sends one pending request", async ({ page }) => {
  let attempts = 0;
  await page.route("http://127.0.0.1:54321/rest/v1/bookings", async (route) => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "POST, OPTIONS" } });
      return;
    }
    attempts++;
    expect(route.request().postDataJSON()).toMatchObject({ service_id: "consultation", customer_name: "Example Person", status: "pending" });
    await route.fulfill({ status: attempts === 1 ? 403 : 201, headers: { "access-control-allow-origin": "*" }, body: "" });
  });
  await page.goto("/starters/booking/");
  await fillBooking(page);
  await page.getByRole("button", { name: "Submit request" }).click();
  await expect(page.getByRole("status")).toContainText("not saved (HTTP 403)");
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue("Example Person");
  await page.getByRole("button", { name: "Submit request" }).click();
  await expect(page.getByRole("status")).toContainText("pending. Availability is not confirmed");
  expect(attempts).toBe(2);
});

test("transport failure does not become a successful demo submission", async ({ page }) => {
  await page.route("http://127.0.0.1:54321/rest/v1/bookings", (route) => route.abort("failed"));
  await page.goto("/starters/booking/");
  await fillBooking(page);
  await page.getByRole("button", { name: "Submit request" }).click();
  await expect(page.getByRole("status")).not.toBeEmpty();
  await expect(page.getByRole("status")).not.toContainText("Demo complete");
  await expect(page.getByRole("status")).not.toContainText("Request saved");
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue("Example Person");
  await expect(page.getByRole("button", { name: "Submit request" })).toBeEnabled();
});
