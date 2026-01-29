import { remote } from "webdriverio";
import path from "path";
import { ConfigReader } from "./ConfigReader";

export class DriverManager {
  private static driver: WebdriverIO.Browser | null = null;

  public static async createDriver(): Promise<void> {
    const applicationType = ConfigReader.getConfigValue("application.type");
    console.log("Application Type:", applicationType);

    if (applicationType === "local") {
      const options = {
        hostname: "127.0.0.1",
        port: 4723,
        path: "/",
        capabilities: {
          platformName: ConfigReader.getConfigValue("local.platform.name"),
          "appium:automationName": ConfigReader.getConfigValue(
            "local.automation.name",
          ),
          // "appium:udid": ConfigReader.getConfigValue("local.device.name"), //for real device
          "appium:deviceName": ConfigReader.getConfigValue("local.device.name"),
          "appium:platformVersion": ConfigReader.getConfigValue(
            "local.platform.version",
          ),
          "appium:app":
            path.resolve(__dirname, "..") +
            ConfigReader.getConfigValue("local.app.path"),
          "appium:appPackage": ConfigReader.getConfigValue("local.app.package"),
          "appium:appActivity":
            ConfigReader.getConfigValue("local.app.activity"),
          "appium:autoGrantPermissions": ConfigReader.getConfigValue(
            "local.app.autograndpermissions",
          ),
        },
      };

      console.log("Creating Appium session...");
      console.log(
        "Using App:",
        path.resolve(__dirname, "..") +
          ConfigReader.getConfigValue("local.app.path"),
      );
      console.log("Device:", ConfigReader.getConfigValue("local.device.name"));

      this.driver = (await remote(options as any)) as any;
    } else if (applicationType === "cloud") {
      const options = {
        protocol: "https",
        hostname: "ondemand.eu-central-1.saucelabs.com",
        port: 443,
        path: "/wd/hub",
        user: ConfigReader.getConfigValue("cloud.username"),
        key: ConfigReader.getConfigValue("cloud.accesskey"),
        capabilities: {
          platformName: ConfigReader.getConfigValue("cloud.platform.name"),
          "appium:app":
            "storage:filename=" + ConfigReader.getConfigValue("cloud.app.path"), // The filename of the mobile app
          "appium:deviceName": ConfigReader.getConfigValue("cloud.device.name"),
          "appium:platformVersion": ConfigReader.getConfigValue(
            "cloud.platform.version",
          ),
          "appium:automationName": ConfigReader.getConfigValue(
            "cloud.automation.name",
          ),
          "sauce:options": {
            build: "appium-build-ECVXT",
            name: "Appium Framework SauceLabs",
            deviceOrientation: "PORTRAIT",
          },
        },
      };

      console.log("Creating Appium session...");
      console.log("Using App:", ConfigReader.getConfigValue("cloud.app.path"));
      console.log("Device:", ConfigReader.getConfigValue("cloud.device.name"));

      this.driver = (await remote(options as any)) as any;
    }

    await this.driver!.setTimeout({ implicit: 10000 });
    console.log("Appium session started.");
  }

  // get existing driver
  public static getDriver(): WebdriverIO.Browser {
    if (!this.driver) {
      throw new Error("Driver not initialized. Call createDriver() first.");
    }
    return this.driver;
  }

  // close driver
  public static async quitDriver(): Promise<void> {
    if (this.driver) {
      await this.driver.deleteSession();
      console.log("Appium session closed.");
      this.driver = null;
    }
  }
}
