import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import LoginpageConstants from '../pages/constants/loginpage.constants.json';
import HomepageConstants from '../pages/constants/homepage.constants.json';
import Credentials from '../credentials.json';

test.describe('Incorrect credentials login', () => {
    test('should not allow me to enter home page.', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();

        await page.fill(LoginpageConstants.usernameTextviewSelector, 'awrongusername');
        await page.fill(LoginpageConstants.passwordTextviewSelector, 'awrongpassword00');
        await loginPage.clickLoginButton();
        const errorMessage = await page.textContent(LoginpageConstants.unsuccessfulLoginTextSelector);
        expect(errorMessage).toContain(LoginpageConstants.unsuccessfulLoginText);
    });
});

test.describe('Correct credentials login', () => {
    test('should allow me to enter home page.', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();

        await page.fill(LoginpageConstants.usernameTextviewSelector, Credentials.username);
        await page.fill(LoginpageConstants.passwordTextviewSelector, Credentials.password);
        await loginPage.clickLoginButton();
        expect(page.url()).toContain(HomepageConstants.url);
    });
});