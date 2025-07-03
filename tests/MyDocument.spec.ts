import{test,expect}from'@playwright/test';
import{LoginPage}from'../pages/LoginPage'; 
import{MyDocumentPage}from'../pages/MyDocumentPage';

test.describe('MyDocument', () => {
  let loginPage: LoginPage;
  let documentPage: MyDocumentPage;

  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    documentPage = new MyDocumentPage(page);
    await page.goto('/scohn/login'); // Navigate to the login page
    await loginPage.enterUsername('white@yopmail.com');
    await loginPage.clickNext();
    await loginPage.enterPin('123456');
    await loginPage.clickLogin();
  });

  test('should display the document correctly', async ({page}) => {
    await documentPage.navigateToDocumentPage();
    console.log(await documentPage.isDocumentPageVisible());
    expect(await documentPage.isDocumentPageVisible()).toBeTruthy();
  });
})