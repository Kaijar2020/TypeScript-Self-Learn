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
    private docUploadToastMsg: Locator;
    private docMenuBtn: Locator;
    private docDeleteBtn: Locator;
    private docEditBtn: Locator;
    private docDeleteToastMsg: Locator;
    private docViewBtn: Locator;
    private docCloseBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.documentPage = this.page.locator('[data-tooltip="My documents"]');
    this.documentPageUrl = "https://umrtest.com/scohn/upload-document";
    this.addNewDocumentButton = this.page.locator('button.add-document-btn.p-button');
    this.addDocumentPageUrl = "https://umrtest.com/scohn/upload-document/add-document";
    this.chooseFileButton = this.page.locator("input[type='file']");
    this.fileExistance = this.page.locator("div.file-info-container");
    this.saveButton = this.page.locator("button[type='submit']");
    this.documentType = this.page.getByPlaceholder('Select record type');
    this.documentTypeList = this.page.locator("ul>p-selectitem>li");
    this.documentFor = this.page.locator("#pn_id_101");
    this.addTags = this.page.locator("div.tag-container");
    this.addDescription = this.page.locator("textarea[placeholder='Enter additional details about this document']");
    this.cancelButton = this.page.locator("//span[normalize-space(text())='Cancel']");
    this.dateField = this.page.locator("input[role='combobox']");
    this.docUploadToastMsg = this.page.locator("div").filter({ hasText: 'Success Document Uploaded' }).nth(2);
    this.docMenuBtn = this.page.locator("p-speeddial").getByRole("button");
    this.docDeleteBtn = this.page.locator("(//li[@class='p-speeddial-item ng-star-inserted']//button)[2]");
    this.docEditBtn = this.page.locator("(//li[@class='p-speeddial-item ng-star-inserted']//button)[1]");
    this.docDeleteToastMsg = this.page.locator('div').filter({ hasText: 'Success Document Deleted' }).nth(2);
    this.docViewBtn = this.page.getByText('View Document').first();
    this.docCloseBtn = this.page.getByRole('button', { name: 'Close' });
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

  async clickSaveButton() {
    await this.saveButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton.click(); 
  }

  // async validateListItem() {
  //   await this.documentType.click();
  //   const listItems = await this.documentTypeList.all();
  //   let count = 0
  //   for (const item of listItems) {
  //     count++;
  //   }
  //   return count;
  // }

  async selectDocumentType(type: string) {
    await this.documentType.waitFor({ state: 'visible', timeout: 2000 });
    await this.documentType.click();
    let options = await this.documentTypeList.all();
    for (let option of options) {
      if (await option.textContent() === type) {
        await option.click({ force: true });
        break;
      }
    }
  }
  async typeTags(tags: string[]) {
    for (const tag of tags) {
      await this.addTags.click();
      await this.page.keyboard.type(tag);
      await this.page.keyboard.press('Enter');
    }
  }
  async typeDescription(description: string) {
    await this.addDescription.fill(description);
  }
  async docUploadCheck() {
    await this.docUploadToastMsg.waitFor({ state: 'visible', timeout: 2000 });
    return await this.docUploadToastMsg.textContent();
  }
  async docmentDelete(){
        await this.docMenuBtn.waitFor({ state: 'visible', timeout: 1000 });
        await this.docMenuBtn.click({force: true});
        await this.docDeleteBtn.waitFor({ state: 'visible',timeout: 1000 });
        await this.docDeleteBtn.click();
  }
  async docDeleteCheck() {
    await this.docDeleteToastMsg.waitFor({ state: 'visible', timeout: 2000 });
    return await this.docDeleteToastMsg.textContent();
  }

  async clickDocViewBtn() {
    await this.docViewBtn.waitFor({ state: 'visible' });
    await this.docViewBtn.click();
  }

  async clickDocCloseBtn() {
    await this.docCloseBtn.waitFor({ state: 'visible' });
    await this.docCloseBtn.click();
  }

}