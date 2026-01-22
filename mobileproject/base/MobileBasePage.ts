import { ChainablePromiseElement } from "webdriverio";
import { DriverManager } from "../utils/DriverManager";

export type SwipeDirection = "up" | "down" | "left" | "right";

export interface ScrollUntilOptions {
  direction?: "down" | "up";
  maxSwipes?: number;
  // pause between swipes in ms
  swipePause?: number;
  // swipe length as fraction of screen (0-1)
  swipeLength?: number;
}

export default class MobileBasePage {
  protected driver: WebdriverIO.Browser;

  constructor(driver: WebdriverIO.Browser) {
    this.driver = driver;
  }

  protected async performSwipe(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    duration = 300,
  ) {
    try {
      await this.driver.performActions([
        {
          type: "pointer",
          id: "finger1",
          parameters: { pointerType: "touch" },
          actions: [
            {
              type: "pointerMove",
              duration: 0,
              x: Math.round(startX),
              y: Math.round(startY),
            },
            { type: "pointerDown", button: 0 },
            { type: "pause", duration: 10 },
            {
              type: "pointerMove",
              duration: duration,
              x: Math.round(endX),
              y: Math.round(endY),
            },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);
      try {
        await this.driver.releaseActions();
      } catch {}
    } catch (e) {
      try {
        const touchAction: any[] = [
          { action: "press", x: Math.round(startX), y: Math.round(startY) },
          { action: "wait", ms: duration },
          { action: "moveTo", x: Math.round(endX), y: Math.round(endY) },
          { action: "release" },
        ];
        await (this.driver as any).touchAction(touchAction);
      } catch (err) {
        console.warn("performSwipe fallback failed", err);
      }
    }
  }

  // Generic screen swipe helpers
  public async swipe(
    direction: SwipeDirection,
    duration = 300,
    swipeLength = 0.5,
  ) {
    // get window size once and reuse
    const windowSize = await this.driver.getWindowSize();
    const height = windowSize.height;
    const width = windowSize.width;

    console.log("height:", height, "width:", width);
    // center positions
    const centerX = Math.round(width * 0.5);
    const centerY = Math.round(height * 0.5);

    let startX = centerX;
    let startY = centerY;
    let endX = centerX;
    let endY = centerY;
    console.log(
      "startX:",
      startX,
      "startY:",
      startY,
      "endX:",
      endX,
      "endY:",
      endY,
    );

    const verticalDistance = Math.round(height * swipeLength);
    const horizontalDistance = Math.round(width * swipeLength);

    switch (direction) {
      case "up":
        startY = Math.round(height * 0.8);
        endY = startY - verticalDistance;
        break;
      case "down":
        startY = Math.round(height * 0.2);
        endY = startY + verticalDistance;
        break;
      case "left":
        startX = Math.round(width * 0.9);
        endX = startX - horizontalDistance;
        break;
      case "right":
        startX = Math.round(width * 0.1);
        endX = startX + horizontalDistance;
        break;
    }

    await this.performSwipe(startX, startY, endX, endY, duration);
    // small pause to let UI settle
    await this.driver.pause(300);
  }

  public async swipeUp(duration = 350, swipeLength = 0.5) {
    return this.swipe("up", duration, swipeLength);
  }
  public async swipeDown(duration = 350, swipeLength = 0.5) {
    return this.swipe("down", duration, swipeLength);
  }
  public async swipeLeft(duration = 350, swipeLength = 0.5) {
    return this.swipe("left", duration, swipeLength);
  }
  public async swipeRight(duration = 350, swipeLength = 0.5) {
    return this.swipe("right", duration, swipeLength);
  }

  public async scrollUntilVisible(
    promisableElement: ChainablePromiseElement,
    opts: ScrollUntilOptions = {},
  ): Promise<WebdriverIO.Element> {
    const {
      direction = "down",
      maxSwipes = 8,
      swipePause = 500,
      swipeLength = 0.5,
    } = opts;

    // const resolvedElement: WebdriverIO.Element =
    //   typeof element === "string"
    //     ? await this.sdriver.$(element)
    //     : await element;

    for (let attempt = 0; attempt < maxSwipes; attempt++) {
      try {
        if (await promisableElement.isDisplayed()) {
          return await promisableElement.getElement();
        }
      } catch {}

      if (direction === "down") {
        await this.swipeUp(350, swipeLength);
      } else {
        await this.swipeDown(350, swipeLength);
      }

      await this.driver.pause(swipePause);
    }

    if (await promisableElement.isDisplayed()) {
      return await promisableElement.getElement();
    }

    throw new Error(`Element not visible after ${maxSwipes} swipes`);
  }
}
