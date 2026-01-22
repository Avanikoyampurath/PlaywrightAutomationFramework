import { defineConfig } from "@playwright/test";
import { readJsonFile } from "./utils/DataReader";

const DEFAULT_ENV = "qa";
const ENV = process.env.ENV || DEFAULT_ENV;
process.env.ENV = ENV;
const envConfig = readJsonFile(`./bnqproject/config/env.${ENV}.json`);

export default defineConfig({
  timeout: 120000,

  use: {
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    extraHTTPHeaders: {
      "x-api-key": envConfig.apiKey,
      "Content-Type": "application/json",
    },
  },
  reporter: [["list"], ["allure-playwright"], ["html", { open: "never" }]],

  outputDir: "test-results/",
});
