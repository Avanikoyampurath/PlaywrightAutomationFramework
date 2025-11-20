import { IWorldOptions,setWorldConstructor, World} from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "playwright";
import { LoginPage } from "../../ui/pages/LoginPage";
import { InventoryPage } from "../../ui/pages/InventoryPage";


export class CustomWorld extends World{
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  inventoryPage!: InventoryPage;
  worldData: Record<string, any> = {};

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.loginPage=new LoginPage(this.page);
    this.inventoryPage=new InventoryPage(this.page);  
  }
}

setWorldConstructor(CustomWorld);
