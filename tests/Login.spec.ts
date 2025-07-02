import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login with valid credentials and PIN', async ({page}) => {
    await loginPage.enterUsername('white@yopmail.com');
    await loginPage.clickNext();
    await loginPage.enterPin('123456');
    await loginPage.clickLogin();
    expect(loginPage.isDashboardVisible()).toBeTruthy();
  });

})