import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import LoginpageConstants from '../pages/constants/loginpage.constants.json';
import HomepageConstants from '../pages/constants/homepage.constants.json';
import Credentials from '../credentials.json';


// test.beforeEach(async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.login();
// });

test.describe('Homepage', () => {
    test('should contain the correct "Deposits" view and information.', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login();

        const myDepositsCorrectedTitle = ((await page.innerText(HomepageConstants.myDepositsTitleXpathSelector)).trim()).toLowerCase();
        const taxReductionsCorrectedTitle = ((await page.innerText(HomepageConstants.taxReductionTitleXpathSelector)).trim()).toLowerCase();
        const exchangeRatesCorrectedTitle = ((await page.innerText(HomepageConstants.exchangeRatesTitleXpathSelector)).trim()).toLowerCase();
        expect(myDepositsCorrectedTitle).toBe(HomepageConstants.myDepositsTitleExpectedText);
        expect(taxReductionsCorrectedTitle).toBe(HomepageConstants.taxReductionTitleExpectedText);
        expect(exchangeRatesCorrectedTitle).toBe(HomepageConstants.exchangeRatesTitleExpectedText);
    });
});