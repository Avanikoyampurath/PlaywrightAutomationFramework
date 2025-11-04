import { test, expect } from "../../fixtures/APIFixture";

test("create user", async ({ restClient }) => {
  const customData = { Name: "Tom", age: "24" };

  const { response, payload } = await restClient.createUser(customData);
  expect(response.status()).toBe(201);
  const body = await response.json();
  console.log(body);
  expect(body.name).toBe(payload.name);
  expect(body.job).toBe(payload.job);
});
