import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyProfilePage } from '../pages/MyProfilePage';
import data from '../test-datas/data.json';

test.describe('MyProfile', () => {
      let page: Page; // Declare page variable to hold the page instance  
      let loginPage: LoginPage;
      let profilePage: MyProfilePage;
      let val: string[];

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
            //await page.waitForTimeout(1000);
            expect(await profilePage.getGeneralInfoValues()).toBeTruthy();
            val = await profilePage.getGeneralInfoValues();
            console.log(val);
      });

      test('3.Should navigate to Update Profile page', async () => {
            await profilePage.clickUpdateProfileButton();
            expect(await profilePage.isUpdateProfilePageVisible()).toBeTruthy();
      });

      test('4.Should Verify the Update profile form ', async () => {
            await page.waitForTimeout(2000);
            let arr: string[];
            arr = await profilePage.verifyFormValues();
            console.log(arr);
            console.log(val);
            expect(arr[0]).toBe(val[1]);
      });




});