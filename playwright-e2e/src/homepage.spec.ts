import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import LoginpageConstants from '../pages/constants/loginpage.constants.json';
import HomepageConstants from '../pages/constants/homepage.constants.json';
import Credentials from '../credentials.json';


test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login();
});

test.describe('Homepage', () => {
    test('should contain the correct views and information.', async ({ page }) => {
        console.log("@@@" + await page.innerText(HomepageConstants.myDepositsTitleSelector));
        expect(await page.innerText(HomepageConstants.myDepositsTitleSelector)).toBe(HomepageConstants.myDepositsExpectedText);
    });
});