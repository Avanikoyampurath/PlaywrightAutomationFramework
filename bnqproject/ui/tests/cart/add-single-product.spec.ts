import { test, expect } from "../../fixtures/auth";
import { InventoryPage } from "../../pages/InventoryPage";

test.describe("Add Single Product to Cart", () => {
  test("should add single product to cart successfully", async ({
    authenticatedPage,
  }) => {
    // Initialize page object
    const inventoryPage = new InventoryPage(authenticatedPage);

    // Constants
    const productName = "sauce-labs-backpack";

    // Verify initial state
    await expect(await inventoryPage.getCartBadgeVisibility()).toBe(false);

    // Get initial button state
    const initialState = await inventoryPage.getButtonState(productName);
    await expect(initialState.isAddVisible).toBe(true);
    await expect(initialState.isRemoveVisible).toBe(false);

    // Add product to cart
    await inventoryPage.addToCart(productName);

    // Verify cart badge
    await expect(await inventoryPage.getCartBadgeVisibility()).toBe(true);
    await expect(await inventoryPage.getCartCount()).toBe("1");

    // Verify button state changed
    const finalState = await inventoryPage.getButtonState(productName);
    await expect(finalState.isAddVisible).toBe(false);
    await expect(finalState.isRemoveVisible).toBe(true);

    // Verify cart contents
    await inventoryPage.openCart();
    const cartItem = authenticatedPage.locator(".cart_item");
    await expect(cartItem).toHaveCount(1);
    await expect(cartItem.locator(".inventory_item_name")).toHaveText(
      "Sauce Labs Backpack",
    );
  });

  test("should handle add to cart button state correctly", async ({
    authenticatedPage,
  }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    const productName = "sauce-labs-backpack";

    // Add product
    await inventoryPage.addToCart(productName);

    // Verify button state changed
    let buttonState = await inventoryPage.getButtonState(productName);
    await expect(buttonState.isRemoveVisible).toBe(true);
    await expect(buttonState.isAddVisible).toBe(false);

    // Remove product
    await inventoryPage.removeFromCart(productName);

    // Verify button state changed back
    buttonState = await inventoryPage.getButtonState(productName);
    await expect(buttonState.isAddVisible).toBe(true);
    await expect(buttonState.isRemoveVisible).toBe(false);
  });

  test("should update cart badge correctly", async ({ authenticatedPage }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    const productName = "sauce-labs-backpack";

    // Initially no badge
    await expect(await inventoryPage.getCartBadgeVisibility()).toBe(false);

    // Add product
    await inventoryPage.addToCart(productName);

    // Verify badge shows "1"
    await expect(await inventoryPage.getCartBadgeVisibility()).toBe(true);
    await expect(await inventoryPage.getCartCount()).toBe("1");

    // Remove product
    await inventoryPage.removeFromCart(productName);

    // Verify badge is gone
    await expect(await inventoryPage.getCartBadgeVisibility()).toBe(false);
  });
});
