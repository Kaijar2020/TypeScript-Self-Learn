import {test,Page, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;
  let page: Page;

  test.beforeEach(async ({browser}) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await page.goto('https://umrtest.com/scohn/login'); // Navigate to the login page
  });

  test('Login with valid credentials and PIN', async () => {
    await loginPage.enterUsername('white@yopmail.com');
    await loginPage.clickNext();
    await loginPage.enterPin('123456');
    await loginPage.clickLogin();
    expect(loginPage.isDashboardVisible()).toBeTruthy();
  });

})