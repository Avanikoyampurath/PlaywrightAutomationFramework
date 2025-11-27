import { test, expect } from "../fixtures/BaseTest";
import { LoginTestData } from "../test-data/login-data";

test.describe("Sauce Demo Login Functionality", () => {

  test("successful login with standard user", async ({loginPage}) => {
    await loginPage.login(
      LoginTestData.validUser.username,
      LoginTestData.validUser.password,
    );
    expect(loginPage.validatePageTitle,"Products");
  });

  test("locked out user cannot login", async ({loginPage}) => {
    await loginPage.login(
      LoginTestData.lockedOutUser.username,
      LoginTestData.lockedOutUser.password,
    );
    expect(loginPage.expectErrorMessage,"Epic sadface: Sorry, this user has been locked out.") ;
  });

  test("invalid credentials show error message", async ({loginPage}) => {
    await loginPage.login(
      LoginTestData.invalidUser.username,
      LoginTestData.invalidUser.password,
    );
    expect  (loginPage.expectErrorMessage,
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("empty credentials validation", async ({loginPage}) => {
    await loginPage.clickLoginButton();
    expect (loginPage.expectErrorMessage,"Epic sadface: Username is required");
  });

  test("empty password validation", async ({loginPage}) => {
    await loginPage.enterUsername(LoginTestData.validUser.username);
    await loginPage.clickLoginButton();
    expect (loginPage.expectErrorMessage,"Epic sadface: Password is required");
  });

  test("problem user can login", async ({loginPage}) => {
    await loginPage.login(
      LoginTestData.problemUser.username,
      LoginTestData.problemUser.password,
    );
    expect (loginPage.validatePageTitle,"Products");
  });

  test("performance glitch user login timing", async ({loginPage}) => {
    const startTime = Date.now();
    await loginPage.login(
      LoginTestData.performanceGlitchUser.username,
      LoginTestData.performanceGlitchUser.password,
    );
    expect (loginPage.validatePageTitle,"Products");
    const endTime = Date.now();
    const loginTime = endTime - startTime;

    // Performance glitch user should take longer than 2 seconds but less than 10 seconds
    expect(loginTime).toBeGreaterThan(2000);
    expect(loginTime).toBeLessThan(10000);
  });
});
