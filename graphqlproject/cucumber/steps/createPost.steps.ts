import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import postData from "../../test-data/createPostData.json";

Given("I have a valid default post payload", function () {
  this.defaultPayload = postData.validPost;
});

When("I override the payload with custom post data", function () {
  this.customData = {
    title: "Hi GraphQL",
    body: "Testing mutation with Playwright",
  };

  this.payload = this.gqlClient.mergePayload(
    this.defaultPayload,
    this.customData
  );
});

When("I send the createPost GraphQL mutation", async function () {
  this.response = await this.gqlClient.createPost(this.payload);
});

Then("the response should contain the created post", function () {
  expect(this.response.data.createPost).toBeDefined();
});

Then("the title should match the custom value", function () {
  expect(this.response.data.createPost.title).toBe(this.payload.title);
});

Then("the body should match the custom value", function () {
  expect(this.response.data.createPost.body).toBe(this.payload.body);
});
