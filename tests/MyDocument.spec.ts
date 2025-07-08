import{test,expect, type Page}from'@playwright/test';
import{LoginPage}from'../pages/LoginPage'; 
import{MyDocumentPage}from'../pages/MyDocumentPage';

test.describe('MyDocument', () => {
  let page: Page; // Declare page variable to hold the page instance
  let loginPage: LoginPage;
  let documentPage: MyDocumentPage;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage(); // Create a new page instance
    loginPage = new LoginPage(page);
    documentPage = new MyDocumentPage(page);
    await page.goto('/scohn/login'); // Navigate to the login page
    await loginPage.enterUsername('white@yopmail.com');
    await loginPage.clickNext();
    await loginPage.enterPin('123456');
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
    await documentPage.selectDocumentType('Invoice');
    await documentPage.typeTags(['Test Tag', 'Sample Tag']);
    await documentPage.typeDescription('This is a sample document description.It is typing by a Automation bot.');
    // expect(await documentPage.saveButtonisenabled()).toBeTruthy();
    await documentPage.clickSaveButton();
    expect(await documentPage.docUploadCheck()).toBe(' Success Document Uploaded Successfully!');
  });

  test('5.Should delete the document', async () => {
    await page.waitForTimeout(2000); 
    await documentPage.docmentDelete();
    expect(await documentPage.docDeleteCheck()).toBe(' Success Document Deleted Successfully!');
    await page.waitForTimeout(2000); // Wait for 2 seconds to ensure the document is deleted
  });




});