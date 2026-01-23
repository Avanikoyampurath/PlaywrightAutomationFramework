import fs from "fs";
import path from "path";

export class ConfigReader {
  private static prop: Map<string, string> = new Map();
  private static initialized: boolean = false;

  public static initConfig(): void {
    if (this.initialized) {
      return;
    }

    const configPath = path.resolve(__dirname, "./config/config.properties");

    if (!fs.existsSync(configPath)) {
      throw new Error(`Config file not found at ${configPath}`);
    }

    try {
      const content = fs.readFileSync(configPath, "utf-8");
      this.parseProperties(content);
      this.initialized = true;
      console.log("✅ Configuration initialized successfully");
    } catch (error) {
      throw new Error(`Failed to load config: ${error}`);
    }
  }

  private static parseProperties(content: string): void {
    const lines = content.split("\n");

    lines.forEach((line) => {
      // Skip empty lines and comments
      if (line.trim() === "" || line.trim().startsWith("#")) {
        return;
      }

      const [key, value] = line.split("=");

      if (key && value) {
        this.prop.set(key.trim(), value.trim());
      }
    });
  }

  public static getConfigValue(key: string): string | null {
    if (!this.initialized) {
      this.initConfig();
    }

    const value = this.prop.get(key);
    if (!value) {
      console.warn(`Configuration key not found: ${key}`);
      return null;
    }

    return value;
  }

  public static getAllProperties(): Map<string, string> {
    if (!this.initialized) {
      this.initConfig();
    }
    return this.prop;
  }

  public static reset(): void {
    this.prop.clear();
    this.initialized = false;
  }
}
