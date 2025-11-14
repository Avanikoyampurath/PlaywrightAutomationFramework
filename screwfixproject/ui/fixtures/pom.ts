import { Page, test as baseTest, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { AuthFixtures } from "./auth";

export interface PomFixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  authenticatedPage: AuthFixtures["authenticatedPage"];
   
}

export const test = baseTest.extend<PomFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  inventoryPage: async ({authenticatedPage}, use) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    await use(inventoryPage);
  }

});

  