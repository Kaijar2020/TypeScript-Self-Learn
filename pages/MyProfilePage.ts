import { Locator, Page } from "@playwright/test";


export class MyProfilePage {
  protected profilePage: Locator;
  protected generalInfoValue: Locator;
  protected profilePageUrl: string;
  protected updateProfileUrl: string;
  protected updateProfileButton: Locator;
  protected firstName: Locator;
  protected lastName: Locator;
  protected profession: Locator;
  protected emailID: Locator;
  protected dateOfBirth: Locator;
  protected phoneNumber: Locator;
  protected submitButton: Locator;
  protected cancelButton: Locator;
  protected bloodGroup: Locator;
  private profileUpdateSuccessToast: Locator;
  private updateProfileDashboard: Locator;
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
    this.profilePage = this.page.locator('[data-tooltip="My Profile"]');
    this.generalInfoValue = this.page.locator('//div[@class="info-grid"]//div[@class="info-value"]');
    this.updateProfileButton = this.page.locator("//div[@class='update-profile-link']/a");
    this.profilePageUrl = "https://umrtest.com/scohn/user-profile";
    this.updateProfileUrl = "https://umrtest.com/scohn/user-profile/update-profile";
    this.firstName = this.page.getByRole('textbox', { name: 'First Name *' });
    this.lastName = this.page.getByRole('textbox', { name: 'Last Name' })
    this.profession = this.page.getByRole('textbox', { name: 'Profession' });
    this.emailID = this.page.locator('#email');
    this.bloodGroup = this.page.locator("input[placeholder='Phone Number']");
    this.dateOfBirth = this.page.getByRole('combobox', { name: 'DD/MM/YYYY' });
    this.phoneNumber = this.page.locator("div.phone-input-container");
    this.submitButton = this.page.getByRole('button', { name: 'Submit' });
    this.cancelButton = this.page.getByRole('button', { name: 'Back' });
    this.profileUpdateSuccessToast = this.page.locator('div').filter({ hasText: 'Success Profile updated' }).nth(2);
    this.updateProfileDashboard = this.page.getByRole('link', { name: 'Update Profile ' });
  }

  async _writeProfile(locator: Locator, value: string) {
    await locator.click({ force: true }); // ensure it's focused
    await locator.press('Control+A');
    await locator.press('Backspace');
    await locator.fill(''); // clear any existing text
    await locator.type(value, { delay: 100 }); // simulates real typing

  }

  async navigateToProfilePage() {
    await this.profilePage.click();
  }

  async isProfilePageVisible() {
    const url = this.page.url();
    return url.includes(this.profilePageUrl) ? true : false;
  }

  async getGeneralInfoValues() {
    const values: string[] = [];
    await this.page.waitForTimeout(1000)
    const count = await this.generalInfoValue.count();
    for (let i = 0; i < count; i++) {
      const infoValue = this.generalInfoValue.nth(i);
      values.push(await infoValue.textContent() ?? '');
    }
    return values;
  }

  async isUpdateProfilePageVisible() {
    const url = this.page.url();
    return url.includes(this.updateProfileUrl) ? true : false;
  }

  async clickUpdateProfileButton() {
    await this.updateProfileButton.click();
  }

  async verifyFormValues() {
    const field_values: string[] = [];
    await this.page.waitForTimeout(1000);
    field_values.push(await this.firstName.inputValue());
    field_values.push(await this.lastName.inputValue());
    field_values.push(await this.dateOfBirth.inputValue());
    field_values.push(await this.phoneNumber.textContent() ?? '');
    field_values.push(await this.emailID.inputValue());
    field_values.push(await this.bloodGroup.inputValue());
    return field_values;
  }

  async clickbackButton() {
    await this.cancelButton.click();
  }

  async updateProfile(lastName: string, profession: string) {
    await this._writeProfile(this.lastName, lastName);
    await this._writeProfile(this.profession, profession);
    await this.submitButton.click();
  }

  async profileUpdateCheck() {
    await this.profileUpdateSuccessToast.waitFor({ state: 'visible', timeout: 2000 });
    return await this.profileUpdateSuccessToast.textContent();
  }

  async updateProfileDashboardCheck() {
    await this.updateProfileDashboard.click();
  }










}
