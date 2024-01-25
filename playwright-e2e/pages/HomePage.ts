import { Page } from '@playwright/test';
import HomepageConstants from './constants/homepage.constants.json';

export default class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(HomepageConstants.url);
  }

  // async clickLoginButton(): Promise<void> {
  //   await this.page.locator(HomepageConstants.).click();
  // }
}
