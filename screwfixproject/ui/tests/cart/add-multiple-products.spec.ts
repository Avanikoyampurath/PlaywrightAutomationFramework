import { test, expect } from "../../fixtures/auth";
import { InventoryPage } from "../../pages/InventoryPage";

const products = [
  { name: "sauce-labs-backpack", display: "Sauce Labs Backpack" },
  { name: "sauce-labs-bike-light", display: "Sauce Labs Bike Light" },
  { name: "sauce-labs-bolt-t-shirt", display: "Sauce Labs Bolt T-Shirt" },
];

test.describe("Add Multiple Products to Cart", () => {
  test("should add multiple products and verify cart", async ({
    authenticatedPage,
  }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);

    // Add each product to cart
    for (const product of products) {
      const buttonState = await inventoryPage.getButtonState(product.name);
      await expect(buttonState.isAddVisible).toBe(true);
      await inventoryPage.addToCart(product.name);
    }

    // Verify cart badge count
    await expect(await inventoryPage.getCartBadgeVisibility()).toBe(true);
    await expect(await inventoryPage.getCartCount()).toBe(
      products.length.toString(),
    );

    // Open cart and verify all products are present
    await inventoryPage.openCart();
    const cartItems = authenticatedPage.locator(".cart_item");
    await expect(cartItems).toHaveCount(products.length);
    for (const product of products) {
      await expect(
        authenticatedPage.locator(".cart_item .inventory_item_name", {
          hasText: product.display,
        }),
      ).toBeVisible();
    }
  });
});
