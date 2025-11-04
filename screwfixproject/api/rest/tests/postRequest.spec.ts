import { test, expect } from "../../fixtures/APIFixture";
import { userSchema,User } from "../../schema/UserSchema";

test("create user", async ({ restClient }) => {

  const user: User={};
  user.name="Tom";
  user.age=24;
  user.job="Developer";
  const customData=userSchema.parse(user);
  const { response, payload } = await restClient.createUser(customData);
  expect(response.status()).toBe(201);
  const body = await response.json();
  console.log(body);
  expect(body.name).toBe(payload.name);
  expect(body.job).toBe(payload.job);
  expect(body.age).toBe(payload.age);
});
