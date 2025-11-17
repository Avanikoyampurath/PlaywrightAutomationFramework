import { BaseClientScrewfix } from "./BaseClientScrewfix";
import endpoints from "../rest/config/endpoints";
import { readJsonFile } from "../../utils/DataReader";
import { APIRequestContext } from "@playwright/test";
import {test} from "../fixtures/APIFixture";

export class RestClient extends BaseClientScrewfix {
  constructor(requestContext: APIRequestContext) {
    super(requestContext);
  }

  async createUser(overrides?: Record<string, any>) {
    const defaultPayload = readJsonFile(
      `screwfixproject/rest/test-data/${this.env}/createUser.json`,
    );
    const payload = this.mergePayload(defaultPayload, overrides);

    const response = await this.requestContext.post(
      `${this.restBaseURL}${endpoints.createUser}`,
      { data: payload },
    );
    const result = await response.json();
    this.attachRestLogs(`${this.restBaseURL}${endpoints.createUser}`, payload, result);
    return { response, payload,result };
  }

  async updateUser(overrides?: Record<string, any>) {
    const defaultPayload = readJsonFile(
      `screwfixproject/rest/test-data/${this.env}/updateUser.json`,
    );
    const payload = this.mergePayload(defaultPayload, overrides);
    const response = await this.requestContext.put(
      `${this.restBaseURL}${endpoints.updateUser}`,
      { data: payload },
    );
    const result = await response.json();
    this.attachRestLogs( `${this.restBaseURL}${endpoints.updateUser}`, payload, result);
    return { response, payload,result };
  }

  async getUser() {
    
    const url = `${this.restBaseURL}${endpoints.getUser}`;
    const response = await this.requestContext.get(url);
    const result = await response.json();
    this.attachRestLogs(url, null, result);
    return { response, result };
  }

  async deleteUser() {
    const url = `${this.restBaseURL}${endpoints.deleteUser}`;
    const response = await this.requestContext.delete(url); 
    this.attachRestLogs( url, null);
    return response;
  }

  private attachRestLogs( url: string, payload: any, responseBody?: any) {
  const requestLog = {
    baseURL: this.restBaseURL,
    fullURL: url,
    payload: payload || {}
  };

  const responseLog = {
    response: responseBody
  };

  test.info().attachments.push({
    name: "GraphQL Request Payload",
    body: Buffer.from(JSON.stringify(requestLog, null, 2)),
    contentType: "application/json"
  });

  test.info().attachments.push({
    name: "GraphQL Response Payload",
    body: Buffer.from(JSON.stringify(responseLog, null, 2)),
    contentType: "application/json"
  });
}
}
