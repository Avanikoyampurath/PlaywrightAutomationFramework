import { test, expect } from "../fixtures/APIFixture";

test("fetch user by ID", async ({ gqlClient }) => {
  const response = await gqlClient.getUser(1);
  console.log(response);

  expect(response.data.user).toBeDefined();
  expect(response.data.user.id).toBe("1");
});
