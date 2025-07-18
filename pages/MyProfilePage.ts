import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MyProfilePage extends BasePage {
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

  constructor(page: Page) {
    super(page);
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
  }



  async navigateToProfilePage() {
    await this._click(this.profilePage);
  }

  async isProfilePageVisible() {
    return await this._verifyURL(this.profilePageUrl);
  }

  async getGeneralInfoValues() {
    const values: string[] = [];
    await this.page.waitForTimeout(1000)
    const count = await this.generalInfoValue.count();
    for (let i = 0; i < count; i++) {
      const infoValue = this.generalInfoValue.nth(i);
      values.push(await this._getText(infoValue));
    }
    return values;
  }

  async isUpdateProfilePageVisible() {
    return await this._verifyURL(this.updateProfileUrl);
  }

  async clickUpdateProfileButton() {
    await this._click(this.updateProfileButton);
  }

  async verifyFormValues() {
    const field_values: string[] = [];
    field_values.push(await this.firstName.inputValue());
    field_values.push(await this.lastName.inputValue());
    field_values.push(await this.dateOfBirth.inputValue());
    field_values.push(await this.phoneNumber.textContent() ?? '');
    field_values.push(await this.emailID.inputValue());
    field_values.push(await this.bloodGroup.inputValue());
    return field_values;
  }










}
