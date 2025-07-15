import{test, expect, type Page} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyProfilePage } from '../pages/MyProfilePage';
import data from '../test-datas/data.json'; 

test.describe('MyProfile', () => {
  let page: Page; // Declare page variable to hold the page instance  
  let loginPage: LoginPage;
  let profilePage: MyProfilePage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    profilePage = new MyProfilePage(page);
    await page.goto(data.baseURL);
    await loginPage.enterUsername(data.email);
    await loginPage.clickNext();
    await loginPage.enterPin(data.password);
    await loginPage.clickLogin();
  });

  test('1.Should navigate to My Profile page', async () => {
     await profilePage.navigateToProfilePage();
     expect(await profilePage.isProfilePageVisible()).toBeTruthy();
  });

  test('2.Should display general information values', async () => {
     expect(await profilePage.getGeneralInfoValues()).toBeTruthy();
  });
  
});