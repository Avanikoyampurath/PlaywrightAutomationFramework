import { BaseClientBnQ } from "./BaseClientBnQ";
import { test } from "../fixtures/APIFixture";
import { GET_USER } from "../graphql/queries/userQueries";
import { CREATE_POST } from "../graphql/mutations/postMutations";

export class GraphQLClient extends BaseClientBnQ {
  async graphqlRequest(query: string, variables: Record<string, any> = {}) {
    const requestData = { query, variables };

    console.log("=== GraphQL Request ===");
    console.log("Base URL:", this.graphqlBaseURL);
    console.log("Payload:", JSON.stringify(requestData, null, 2));

    const response = await this.requestContext.post(this.graphqlBaseURL, {
      data: requestData,
    });

    const result = await response.json();

    console.log("=== GraphQL Response ===");
    console.log(JSON.stringify(result, null, 2));

    test.info().attachments.push({
      name: "GraphQL Request Payload",
      body: Buffer.from(JSON.stringify(requestData, null, 2)),
      contentType: "application/json",
    });

    test.info().attachments.push({
      name: "GraphQL Response",
      body: Buffer.from(JSON.stringify(result, null, 2)),
      contentType: "application/json",
    });

    if (!response.ok()) {
      const msg = `GraphQL request failed: ${response.status()} - ${response.statusText()}`;
      console.error(msg);
      throw new Error(msg);
    }
    return result;
  }

  async getUser(id: number) {
    return this.graphqlRequest(GET_USER, { id });
  }

  async createPost(postData: Record<string, any>) {
    return this.graphqlRequest(CREATE_POST, { input: postData });
  }
}
