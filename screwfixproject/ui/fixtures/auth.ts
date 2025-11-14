import { Page, test as baseTest, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export interface AuthFixtures {
  authenticatedPage: Page;
  standardUser: Page;
  performanceUser: Page;
}

export const test = baseTest.extend<AuthFixtures>({
  
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await use(page);
  },

  standardUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await use(page);
  },

  performanceUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("performance_glitch_user", "secret_sauce");
    await use(page);
  },
});

