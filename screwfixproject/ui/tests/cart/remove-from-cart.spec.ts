// spec: test-plans/cart-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "../../fixtures/BaseTest";

test.describe("Removing Products", () => {
  test("Remove from Cart Page", async ({ page }) => {
    // 1. Ensure user is logged in as standard_user and on the inventory page.
    await page.goto("https://www.saucedemo.com");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // 2. Add "sauce-labs-backpack" to cart by clicking Add to cart.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 3. Open the cart page.
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 4. Click Remove button for "sauce-labs-backpack" on the cart page.
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // 5. Verify product disappears from cart (no cart items present) and cart badge updates accordingly.
    const cartItems = await page.locator(".cart_item").count();
    expect(cartItems).toBe(0);
    const badgeCount = await page.locator(".shopping_cart_badge").count();
    expect(badgeCount).toBe(0);
  });
});
