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

  async logOut(): Promise<void> {
    await this.page.locator(HomepageConstants.logOutButtonSelector).click();
    const disconnectButton = this.page.locator(HomepageConstants.disconnectModalButtonSelector);
    await disconnectButton.waitFor({ state: 'visible' });
    await disconnectButton.click();
  }
}
