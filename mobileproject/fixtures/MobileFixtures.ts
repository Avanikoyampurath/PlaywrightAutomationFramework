import { test as base } from "@playwright/test";
import { DriverManager } from "../utils/DriverManager";
import type { Browser } from "webdriverio";
import { ConfigReader } from "../utils/ConfigReader";

type MobileFixtures = {
  driver: Browser;
};

export const test = base.extend<MobileFixtures>({
  driver: [
    async ({}, use) => {
      // Before each test
      // Initialize config
      ConfigReader.initConfig();
      await DriverManager.createDriver();
      const driver = DriverManager.getDriver();
      console.log("Driver started");

      await use(driver);

      // After each test
      await DriverManager.quitDriver();
      console.log("Driver stopped");
    },
    { scope: "test" },
  ],
});

export const expect = test.expect;
