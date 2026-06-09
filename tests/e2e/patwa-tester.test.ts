import { expect, test } from "@playwright/test";

test.describe("Patwa tester", () => {
  test("prepares a public-safe review note without saving", async ({ page }) => {
    await page.goto("/patwa-tester");

    await expect(
      page.getByRole("heading", { name: "Patwa feedback tester" })
    ).toBeVisible();
    await expect(page.getByText("Review mode only.")).toBeVisible();

    await page
      .getByLabel("Phrase or prompt")
      .fill("Short original family-safe phrase");
    await page
      .getByLabel("What it means")
      .fill("A simple meaning written for review.");
    await page.getByLabel("Wanted action").selectOption("Reply naturally");
    await page.getByLabel("Understood correctly").selectOption("Partly");
    await page.getByLabel("Sounded natural").selectOption("Mostly");
    await page
      .getByLabel("Better wording")
      .fill("A calmer version that keeps the intent clear.");
    await page
      .getByLabel("Context notes")
      .fill("Casual wording, no private message or copied material.");
    await page.getByLabel("Needs more context").check();

    await page.getByRole("button", { name: "Prepare review note" }).click();

    const packet = page.getByTestId("patwa-review-packet");
    await expect(packet).toContainText(
      "Thank you for helping BEN.AI improve"
    );
    await expect(packet).toContainText("It has not been saved.");
    await expect(packet).toContainText("Reply naturally");
    await expect(packet).toContainText("Needs more context");
  });
});
