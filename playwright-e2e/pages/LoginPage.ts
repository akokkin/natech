import { Page } from '@playwright/test';
import LoginpageConstants from './constants/loginpage.constants.json';
import Credentials from '../credentials.json';

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

  async logIn(): Promise<void> {
    await this.navigate();
    await this.page.fill(LoginpageConstants.usernameTextviewSelector, Credentials.username);
    await this.page.fill(LoginpageConstants.passwordTextviewSelector, Credentials.password);
    await this.clickLoginButton();
  }
}