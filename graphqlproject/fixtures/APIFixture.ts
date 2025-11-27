import { test as baseTest, request } from "@playwright/test";
import { GraphQLClient } from "../base/GraphqlClient";

type ApiFixture = {
  gqlClient: GraphQLClient;
};

export const test = baseTest.extend<ApiFixture>({
  
  gqlClient: async ({}, use) => {
    const context = await request.newContext();
    const client = new GraphQLClient(context);
    await use(client);
    await context.dispose();
  },
});

export const expect = test.expect;
