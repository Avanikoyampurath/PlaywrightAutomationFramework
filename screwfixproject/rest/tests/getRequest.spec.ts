import { test, expect } from "../../fixtures/APIFixture";

test("Get users", async ({ restClient }) => {
  const {response} = await restClient.getUser();
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  console.log(body);
  expect(body.page).toBe(2);
  expect(body.data.length).toBeGreaterThan(0);
});
