import MobileBasePage from "../base/MobileBasePage";

export default class ProductPage extends MobileBasePage {
  private readonly targetElementSelector =
    '//android.widget.TextView[@content-desc="store item text" and @text="Sauce Labs Onesie"]';
  private readonly firstProduct =
    '(//android.view.ViewGroup[@content-desc="store item"])[1]/android.view.ViewGroup[1]/android.widget.ImageView';
  private readonly firstProductPrice =
    '//android.widget.TextView[@content-desc="product price"]';

  async selectFirstProductAndVerifyPrice() {
    await this.driver.pause(5000);
    console.log("App launched! Current package:");
    const selectProduct = this.driver.$(this.firstProduct);
    await selectProduct.click();
    const price = this.driver.$(this.firstProductPrice);
    const priceText = await price.getText();
    return priceText;
  }

  async verifySwipeFunctionality() {
    console.log("Performing swipe up...");
    const { width, height } = await this.driver.getWindowSize();
    const startX = width / 2;
    const startY = height * 0.8;
    const endY = height * 0.2;

    await this.performSwipe(startX, startY, startX, endY, 500);
    await this.driver.pause(1000);
  }

  async verifyScrollFunctionality() {
    console.log("Performing scroll down...");
    await this.swipeUp();
  }

  async verifyScrollUntilElementPresentFunctionality() {
    console.log("Scrolling until element is present...");
    // const maxScrolls = 5;
    // let scrollCount = 0;
    const targetElement = await this.driver.$(this.targetElementSelector);

    await this.scrollUntilVisible(targetElement);
    const isDisplayed = await targetElement.isDisplayed();
    if (isDisplayed) {
      console.log("Target element is now visible.");
      await targetElement.click();
    }
    return isDisplayed;
  }
}
