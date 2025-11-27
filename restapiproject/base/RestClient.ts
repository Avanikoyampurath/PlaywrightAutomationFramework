import { BaseClientRestAPI} from "./BaseClientRestAPI";
import endpoints from "../config/endpoints";
import { readJsonFile } from "../../utils/DataReader";
import { APIRequestContext } from "@playwright/test";

export class RestClient extends BaseClientRestAPI {
  constructor(requestContext: APIRequestContext) {
    super(requestContext);
  }

  async createUser(overrides?: Record<string, any>) {
    const defaultPayload = readJsonFile(
      `bnqproject/api/rest/test-data/${this.env}/createUser.json`,
    );
    const payload = this.mergePayload(defaultPayload, overrides);
    const response = await this.requestContext.post(
      `${this.restBaseURL}${endpoints.createUser}`,
      { data: payload },
    );
    return { response, payload };
  }

  async updateUser(overrides?: Record<string, any>) {
    const defaultPayload = readJsonFile(
      `bnqproject/api/rest/test-data/${this.env}/updateUser.json`,
    );
    const payload = this.mergePayload(defaultPayload, overrides);
    const response = await this.requestContext.put(
      `${this.restBaseURL}${endpoints.updateUser}`,
      { data: payload },
    );
    return { response, payload };
  }

  async getUser() {
    return await this.requestContext.get(
      `${this.restBaseURL}${endpoints.getUser}`,
    );
  }

  async deleteUser() {
    return await this.requestContext.delete(
      `${this.restBaseURL}${endpoints.deleteUser}`,
    );
  }
}
