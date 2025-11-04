// spec: test-plans/cart-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "../../fixtures/auth";

test.describe("Removing Products", () => {
  test("Remove from Inventory Page", async ({ standardUser: page }) => {
    // Using the `standardUser` fixture - user is already logged in and on the inventory page.

    const addBtn = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    const removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
    const cartBadge = page.locator(".shopping_cart_badge");

    // 2. Add "sauce-labs-backpack" to cart by clicking Add to cart
    await addBtn.click();

    // 3. Verify cart badge shows "1" and button changed to "Remove"
    await expect(cartBadge).toHaveText("1");
    await expect(removeBtn).toHaveText("Remove");

    // 4. Click the Remove button for "sauce-labs-backpack" on the inventory page.
    await removeBtn.click();

    // 5. Verify cart badge is no longer present
    await expect(page.locator(".shopping_cart_badge")).toHaveCount(0);

    // 6. Verify the product's button text changed back to "Add to cart".
    await expect(addBtn).toHaveText("Add to cart");
  });
});
