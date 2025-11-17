import { test as baseTest, request } from "@playwright/test";
import { RestClient } from "../base/RestClient";
import { GraphQLClient } from "../base/GraphqlClient";

type ApiFixture = {
  restClient: RestClient;
  gqlClient: GraphQLClient;
};

export const test = baseTest.extend<ApiFixture>({
  restClient: async ({}, use) => {
    const context = await request.newContext();
    const client = new RestClient(context);
    await use(client);
    await context.dispose();
  },
  gqlClient: async ({}, use) => {
    const context = await request.newContext();
    const client = new GraphQLClient(context);
    await use(client);
    await context.dispose();
  },
});

export const expect = test.expect;
