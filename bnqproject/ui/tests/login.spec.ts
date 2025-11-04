import { test, expect } from "../fixtures/auth";
import { LoginPage } from "../pages/LoginPage";
import { LoginTestData } from "../test-data/login-data";

test.describe("Sauce Demo Login Functionality", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("successful login with standard user", async () => {
    await loginPage.login(
      LoginTestData.validUser.username,
      LoginTestData.validUser.password,
    );
    await loginPage.expectSuccessfulLogin();
  });

  test("locked out user cannot login", async () => {
    await loginPage.login(
      LoginTestData.lockedOutUser.username,
      LoginTestData.lockedOutUser.password,
    );
    await loginPage.expectErrorMessage(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });

  test("invalid credentials show error message", async () => {
    await loginPage.login(
      LoginTestData.invalidUser.username,
      LoginTestData.invalidUser.password,
    );
    await loginPage.expectErrorMessage(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("empty credentials validation", async () => {
    await loginPage.clickLoginButton();
    await loginPage.expectErrorMessage("Epic sadface: Username is required");
  });

  test("empty password validation", async () => {
    await loginPage.enterUsername(LoginTestData.validUser.username);
    await loginPage.clickLoginButton();
    await loginPage.expectErrorMessage("Epic sadface: Password is required");
  });

  test("problem user can login", async () => {
    await loginPage.login(
      LoginTestData.problemUser.username,
      LoginTestData.problemUser.password,
    );
    await loginPage.expectSuccessfulLogin();
  });

  test("performance glitch user login timing", async () => {
    const startTime = Date.now();
    await loginPage.login(
      LoginTestData.performanceGlitchUser.username,
      LoginTestData.performanceGlitchUser.password,
    );
    await loginPage.expectSuccessfulLogin();
    const endTime = Date.now();
    const loginTime = endTime - startTime;

    // Performance glitch user should take longer than 2 seconds but less than 10 seconds
    expect(loginTime).toBeGreaterThan(2000);
    expect(loginTime).toBeLessThan(10000);
  });
});
