import { test, expect } from "../../fixtures/APIFixture";
import postData from "../../graphql/test-data/createPostData.json";

test("create new post", async ({ gqlClient }) => {
  const defaultPayload = postData.validPost;

  const customData = {
    title: "Hi GraphQL",
    body: "Testing mutation with Playwright",
  };

  const payload = gqlClient.mergePayload(defaultPayload, customData);
  const response = await gqlClient.createPost(payload);
  console.log("GraphQL Response:", response);

  expect(response.data.createPost).toBeDefined();
  expect(response.data.createPost.title).toBe(payload.title);
});
