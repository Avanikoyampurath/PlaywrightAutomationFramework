import { APIRequestContext } from "@playwright/test";
import { BaseClient } from "../../../core/BaseClient";
import { readJsonFile } from "../../../utils/DataReader";

export class BaseClientBnQ extends BaseClient {
  protected env: string;
  protected restBaseURL: string;
  protected graphqlBaseURL: string;

  constructor(requestContext: APIRequestContext) {
    super(requestContext);
    this.requestContext = requestContext;
    this.env = (process.env.ENV || "dev").toLowerCase();
    const envConfig = readJsonFile(`bnqproject/config/env.${this.env}.json`);
    this.restBaseURL = envConfig.restBaseURL;
    this.graphqlBaseURL = envConfig.graphqlBaseURL;

    console.log("running in...", this.env, "environment");
  }
}
