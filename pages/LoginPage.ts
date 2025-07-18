import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private nextButton: Locator;
  private passwordInputs: Locator;
  private loginButton: Locator;
  private dashboardHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Email ID / Mobile NO. *' });
    this.nextButton = page.locator('button:has-text("Next")');
    this.passwordInputs = page.locator("//input[@type='password']");
    this.loginButton = page.locator('button:has-text("Login")');
    this.dashboardHeading = page.locator("//h2[normalize-space()='My Vitals']");
  }

  // Fill the username/email input field with the provided value
  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  // Click the Next button to proceed to the PIN step
  async clickNext() {
    await this.nextButton.click();
  }

  // Fill each PIN input field with the corresponding digit from the pin string
  async enterPin(pin: string) {
    await this.passwordInputs.first().waitFor({ state: 'visible' });
    for (let i = 0; i < pin.length; i++) {
      await this.passwordInputs.nth(i).fill(pin[i]);
    }
  }

  // Click the Login button to submit the login form
  async clickLogin() {
    await this.loginButton.click();
  }

  // Check if the Dashboard heading is visible after login
  async isDashboardVisible() {
    return this.dashboardHeading.isVisible;
  }
}


