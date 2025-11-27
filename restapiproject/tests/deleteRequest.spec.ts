import { test, expect } from "../fixtures/APIFixture";

test("DELETE user", async ({ restClient }) => {
  const response = await restClient.deleteUser();
  expect(response.status()).toBe(204);
});
