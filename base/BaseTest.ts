import { APIRequestContext } from "@playwright/test";
import { readJsonFile } from "../utils/dataReader";

export class BaseTest {
  protected requestContext!: APIRequestContext;
  protected env: string;
  protected restBaseURL: string;
  protected graphqlBaseURL: string;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
    this.env = (process.env.ENV || "dev").toLowerCase();
    const envConfig = readJsonFile(`./config/env.${this.env}.json`);
    this.restBaseURL = envConfig.restBaseURL;
    this.graphqlBaseURL = envConfig.graphqlBaseURL;
    console.log("running in...", this.env, "environment");
  }

  public mergePayload(
    defaultPayload: Record<string, any>,
    overrides?: Record<string, any>,
  ) {
    if (!overrides) return defaultPayload;
    const merged: Record<string, any> = { ...defaultPayload };
    for (const key of Object.keys(overrides)) {
      const matchKey = Object.keys(defaultPayload).find(
        (k) => k.toLowerCase() === key.toLowerCase(),
      );
      if (matchKey) merged[matchKey] = overrides[key];
      else merged[key] = overrides[key];
    }
    return merged;
  }
}
