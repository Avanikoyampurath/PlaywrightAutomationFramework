import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../helper/world";


Given("I am on the login page", async function (this: CustomWorld) {
  await this.page.goto("https://www.saucedemo.com/");
});

When(
  "I login using username {string} and password {string}",
  async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage.login(username, password);
  }
);

Then(
  "I should be on the Products page",
  async function (this: CustomWorld) {
    expect(this.loginPage.validatePageTitle,"Products");
  }
);

Then(
  "I should see the login error message {string}",
  async function (this: CustomWorld, expectedMessage: string) {
     expect(this.loginPage.expectErrorMessage,expectedMessage) ;
    });

When("I click login without entering any credentials", async function (this: CustomWorld) {
  await this.loginPage.clickLoginButton();
});

When("I enter only username {string}", async function (this: CustomWorld, username: string) {
  await this.loginPage.enterUsername(username);
});

When(
  "I login as performance glitch user using username {string} and password {string}",
  { timeout: 30000 },
  async function (this: CustomWorld, username: string, password: string) {
    const start = Date.now();
    await this.loginPage.login(username, password);
    const end = Date.now();
    this.worldData.loginDuration = end - start;
  }
);

Then(
  "login should take between {int} and {int} seconds",
  async function (this: CustomWorld, minSec: number, maxSec: number) {
    const duration = this.worldData.loginDuration;
    expect(duration).toBeGreaterThan(minSec * 1000);
    expect(duration).toBeLessThan(maxSec * 1000);
  }
);

