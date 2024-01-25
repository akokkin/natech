import { Page } from '@playwright/test';
import LoginpageConstants from './constants/loginpage.constants.json';

export default class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(LoginpageConstants.url);
  }

  async clickLoginButton(): Promise<void> {
    await this.page.locator(LoginpageConstants.loginButtonSelector).click();
  }
}
