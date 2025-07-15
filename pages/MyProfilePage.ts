import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MyProfilePage extends BasePage {

    //protected page: Page;
    protected profilePage : Locator;
    protected generalInfoValue: Locator;
    protected profilePageUrl: string = "https://umrtest.com/scohn/user-profile";


    constructor( page: Page) {
    super(page); 
    this.profilePage = this.page.locator('[data-tooltip="My Profile"]');
    this.generalInfoValue = this.page.locator('//div[@class="info-grid"]//div[@class="info-value"]');
  }

    async navigateToProfilePage() {
      await this._click(this.profilePage);
    }
    
    async isProfilePageVisible() {
      return await this._verifyURL(this.profilePageUrl);
    }

    async getGeneralInfoValues() {
      const values: string[] = [];
      const count = await this.generalInfoValue.count();
      for (let i = 0; i < count; i++) {
        const infoValue = this.generalInfoValue.nth(i);
        values.push(await this._getText(infoValue));
      }
      return values;
    }
}
