import { Page, Locator, expect } from "@playwright/test";
import path from "path";

export class MyDocumentPage {

    private page: Page;
    private documentPage: Locator;
    private documentPageUrl: string;
    private addNewDocumentButton: Locator;
    private addDocumentPageUrl:string;
    private chooseFileButton: Locator;
    private fileExistance: Locator;
    private saveButton: Locator;
    private documentType: Locator;
    private documentTypeList: Locator;
    private documentFor: Locator;
    private addTags: Locator;
    private addDescription: Locator;
    private cancelButton: Locator;
    private dateField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.documentPage = this.page.locator('[data-tooltip="My documents"]');
    this.documentPageUrl = "https://umrtest.com/scohn/upload-document";
    this.addNewDocumentButton = this.page.locator('button.add-document-btn.p-button');
    this.addDocumentPageUrl = "https://umrtest.com/scohn/upload-document/add-document";
    this.chooseFileButton = this.page.locator("input[type='file']");
    this.fileExistance = this.page.locator("div.file-info-container");
    this.saveButton = this.page.locator("button[type='submit']");
    this.documentType = this.page.locator("#pn_id_16");
    this.documentTypeList = this.page.locator("ul>p-selectitem>li");
    this.documentFor = this.page.locator("#pn_id_101");
    this.addTags = this.page.locator("div.tag-container");
    this.addDescription = this.page.locator("textarea[placeholder='Enter additional details about this document']");
    this.cancelButton = this.page.locator("//span[normalize-space(text())='Cancel']");
    this.dateField = this.page.locator("input[role='combobox']");
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

  async uploadDocument() {
    await this.chooseFileButton.setInputFiles(path.join(__dirname,"../test-datas/sample.pdf"));
  } 

  async isFileUploaded() {
    return await this.fileExistance.isVisible();
  }
  
  async saveButtonisenabled() {
    return await this.saveButton.isEnabled();
  }

  async validateListItem() {
    await this.documentType.click();
    const listItems = await this.documentTypeList.all();
    console.log("List items count: ", listItems.length);
    console.log("List items text: "+listItems);
  }
}