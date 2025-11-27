import { Page, expect } from "@playwright/test";
import { BasePageUI } from "uiproject/pages/BasePageUI";

export class LoginPage extends BasePageUI {
  private readonly baseUrl = this.uiBaseURL;
  // Selectors
  private readonly usernameInput = '[data-test="username"]';
  private readonly passwordInput = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';
  private readonly inventoryHeading = ".title";

  constructor(page: Page) {
    super(page);
    console.log(this.baseUrl);
  }

  async goto() {
    await this.page.goto(this.baseUrl);
  }

  async enterUsername(username: string) {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async getErrorMessage() {
    await this.waitForElement(this.errorMessage);
    return this.getElementText(this.errorMessage);
  }

  async expectErrorMessage() {
    return this.page.locator(this.errorMessage);
  }

  async validatePageTitle() {
    await this.expectUrlContains("/inventory.html");
    return this.page.locator(this.inventoryHeading);
      
  }
}
