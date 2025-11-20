import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../helper/world";
import { LoginPage } from "../../src/pages/LoginPage";
import { InventoryPage } from "../../src/pages/InventoryPage";
import { expect } from "playwright/test";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

Given("I am on login page", async function (this: CustomWorld) { 
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

When("I login with valid credentials", async function (this: CustomWorld) { 
  await loginPage.login("standard_user", "secret_sauce");
  inventoryPage = new InventoryPage(this.page);
});

Then("I should land on inventory page", async function (this: CustomWorld) { 
  expect(inventoryPage.isInventoryPageVisible()).toBeTruthy();
});
