import { Page, expect } from "@playwright/test";
import { readJsonFile } from "../../../utils/DataReader";
import { BasePage } from "../../../core/BasePage";

export class BasePageBnQ extends BasePage {
  protected env: string;
  protected uiBaseURL: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.env = (process.env.ENV || "dev").toLowerCase();
    const envConfig = readJsonFile(
      `screwfixproject/config/env.${this.env}.json`,
    );
    this.uiBaseURL = envConfig.uiBaseURL;
    console.log("running in...", this.env, "environment");
  }

  async waitForElement(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async getElementText(selector: string) {
    return await this.page.textContent(selector);
  }

  async isElementVisible(selector: string) {
    return await this.page.isVisible(selector);
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async expectUrlContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text));
  }
}
