import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { CustomWorld } from "../helper/world";

Given("I have a user ID {string}", function (this: CustomWorld, userId: string) {
  this.worldData = { userId };
});

When("I fetch the user details by this ID", async function (this: CustomWorld) {
  const id = this.worldData.userId;
  const response = await this.gqlClient.getUser(id);
  this.worldData.response = response;
});

Then("the user response should contain the user details", function (this: CustomWorld) {
  const response = this.worldData.response;
  expect(response.data.user).toBeDefined();
});

Then("the user id should be {string}", function (this: CustomWorld, expectedId: string) {
  const response = this.worldData.response;
  expect(response.data.user.id).toBe(expectedId);
});
