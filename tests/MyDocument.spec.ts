import{test,expect, type Page}from'@playwright/test';
import{LoginPage}from'../pages/LoginPage'; 
import{MyDocumentPage}from'../pages/MyDocumentPage';
import data from '../test-datas/data.json';

test.describe('MyDocument', () => {
  let page: Page; // Declare page variable to hold the page instance
  let loginPage: LoginPage;
  let documentPage: MyDocumentPage;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage(); // Create a new page instance
    loginPage = new LoginPage(page);
    documentPage = new MyDocumentPage(page);
    await page.goto(data.baseURL); 
    await loginPage.enterUsername(data.email);
    await loginPage.clickNext();
    await loginPage.enterPin(data.password);
    await loginPage.clickLogin();
  });

  test.afterAll(async () => {
    await page.close(); // Close the browser after tests
  });

  test('1.should display the document correctly', async () => {
    await documentPage.navigateToDocumentPage();
    expect(await documentPage.isDocumentPageVisible()).toBeTruthy();
  });

  test('2.should navigate to add new document page', async () => {
    await documentPage.clickAddNewDocumentButton();
    expect(await documentPage.isAddNewDocumentPageVisible()).toBeTruthy();
  });

  test('3.Should upload a document', async () => {
    await documentPage.uploadDocument();
    expect(documentPage.isFileUploaded()).toBeTruthy();
    expect(await documentPage.saveButtonisenabled()).toBeFalsy();
  });

  test("4.Fill the document details.", async () => {
    await documentPage.selectDocumentType(data.document_type);
    await documentPage.typeTags(data.tags);
    await documentPage.typeDescription(data.document_description);
    // expect(await documentPage.saveButtonisenabled()).toBeTruthy();
    await documentPage.clickSaveButton();
    expect(await documentPage.docUploadCheck()).toBe(data.document_upload_success_message);
  });

  test('5.Should view the document', async () => {
    await documentPage.clickDocViewBtn();
    await documentPage.clickDocCloseBtn();
  });

  test('6.Should delete the document', async () => {
    await page.waitForTimeout(1500); 
    await documentPage.docmentDelete();
    expect(await documentPage.docDeleteCheck()).toBe(data.document_delete_success_message);
    await page.waitForTimeout(2000); // Wait for 2 seconds to ensure the document is deleted
  });




});