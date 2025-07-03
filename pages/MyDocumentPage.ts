import { Page, Locator, expect } from "@playwright/test";

export class MyDocumentPage {

    private page: Page;
    private documentPage: Locator;
    private documentPageUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.documentPage = this.page.locator('[data-tooltip="My documents"]');
    this.documentPageUrl = "https://umrtest.com/scohn/upload-document";
  }

  async navigateToDocumentPage() {
    await this.documentPage.click();
  }

  async isDocumentPageVisible(){
    const url =  this.page.url();
    return url.includes(this.documentPageUrl) ? true : false;
  }
}