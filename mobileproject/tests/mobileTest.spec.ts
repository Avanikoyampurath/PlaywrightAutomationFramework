// import { test, expect } from "@playwright/test";
import { test, expect } from "../fixtures/MobileFixtures";
import ProductPage from "../pages/ProductPage";

//change the application.type in config.properties to local/cloud before running the test accordingly
test("Appium - Launch Android app and verify Scroll", async ({ driver }) => {
  const productPage = new ProductPage(driver);

  //working
  // const priceText = await productPage.selectFirstProductAndVerifyPrice();
  // console.log("Selected product price:", priceText);
  // expect(priceText).toBe("$29.99");

  //working
  // await productPage.verifyScrollFunctionality();
  const isVisible =
    await productPage.verifyScrollUntilElementPresentFunctionality();
  expect(isVisible).toBe(true);
});
