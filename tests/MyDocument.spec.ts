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

  test('should display the document correctly', async () => {
    await documentPage.navigateToDocumentPage();
    expect(await documentPage.isDocumentPageVisible()).toBeTruthy();
  });

  test('should navigate to add new document page', async () => {
    await documentPage.clickAddNewDocumentButton();
    expect(await documentPage.isAddNewDocumentPageVisible()).toBeTruthy();
    await page.waitForTimeout(1000); // Wait for 1 second to ensure the page is loaded
  });

  test('Should upload a document', async () => {

  });
})