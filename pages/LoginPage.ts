import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private page: Page; // Playwright Page object for browser interaction
  private usernameInput: Locator; // Locator for the username/email input field
  private nextButton: Locator; // Locator for the Next button
  private passwordInputs: Locator; // Locator for all PIN/password input fields
  private loginButton: Locator; // Locator for the Login button
  private dashboardHeading: Locator; // Locator for the Dashboard heading

  constructor(page: Page) {
    this.page = page; // Store the Playwright page instance
    this.usernameInput = page.locator('input[type="email"], input[type="text"]').first(); // Find the first email or text input
    this.nextButton = page.locator('button:has-text("Next")'); // Find the Next button by its text
    this.passwordInputs = page.locator("//input[@type='password']"); // Find all password input fields (PIN)
    this.loginButton = page.locator('button:has-text("Login")'); // Find the Login button by its text
    this.dashboardHeading = page.locator('//div[@class="dashboard-header"]'); // Locator for the Dashboard heading
  }

  async goto() {
    // Navigate to the login page URL
    await this.page.goto("https://umrtest.com/scohn/login");
  }

  async enterUsername(username: string) {
    // Fill the username/email input field with the provided value
    await this.usernameInput.fill(username);
  }

  async clickNext() {
    // Click the Next button to proceed to the PIN step
    await this.nextButton.click();
  }

  async enterPin(pin: string) {
    // Wait for the first PIN input field to be visible
    await this.passwordInputs.first().waitFor({ state: 'visible' });
    // Fill each PIN input field with the corresponding digit from the pin string
    for (let i = 0; i < pin.length; i++) {
      await this.passwordInputs.nth(i).fill(pin[i]);
    }
  }

  async clickLogin() {
    // Click the Login button to submit the login form
    await this.loginButton.click();
  }

  async isDashboardVisible() {
    // Check if the Dashboard heading is visible after login
    return await this.dashboardHeading.isVisible();
  }
}


