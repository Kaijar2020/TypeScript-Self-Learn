import { Page, Locator, expect } from "@playwright/test";

export class MyDocumentPage {

    private page: Page;
    private documentPage: Locator;
    private documentPageUrl: string;
    private addNewDocumentButton: Locator;
    private addDocumentPageUrl:string;
    private chooseFileButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.documentPage = this.page.locator('[data-tooltip="My documents"]');
    this.documentPageUrl = "https://umrtest.com/scohn/upload-document";
    this.addNewDocumentButton = this.page.locator('button.add-document-btn.p-button');
    this.addDocumentPageUrl = "https://umrtest.com/scohn/upload-document/add-document";
    this.chooseFileButton = this.page.locator("[label='Choose']");
  }

  async navigateToDocumentPage() {
    await this.documentPage.click();
  }

  async isDocumentPageVisible(){
    const url =  this.page.url();
    return url.includes(this.documentPageUrl) ? true : false;
  }
  async clickAddNewDocumentButton() {
    await this.addNewDocumentButton.click();
  }
  async isAddNewDocumentPageVisible() {
    const url = this.page.url();
    return url.includes(this.addDocumentPageUrl) ? true : false;
  }

  async uploadDocument(filePath: string) {
    await this.chooseFileButton.setInputFiles(filePath);
  } 

}