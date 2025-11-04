import { test, expect } from "../../fixtures/APIFixture";

test("Update user", async ({ restClient }) => {
  const { response, payload } = await restClient.updateUser();

  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(body);
  expect(body.name).toBe(payload.name);
  expect(body.job).toBe(payload.job);
});
