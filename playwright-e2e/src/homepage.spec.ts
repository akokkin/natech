import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import HomepageConstants from '../pages/constants/homepage.constants.json';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.logIn();
});

test.afterEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.logOut();
})

test.describe('Homepage', () => {
    test('should contain the correct "Deposits", "Tax Reduction" and "Exchange Rates" views and information.', async ({ page }) => {

        const myDepositsCorrectedTitle = ((await page.innerText(HomepageConstants.myDepositsTitleXpathSelector)).trim()).toLowerCase();
        const taxReductionsCorrectedTitle = ((await page.innerText(HomepageConstants.taxReductionTitleXpathSelector)).trim()).toLowerCase();
        const exchangeRatesCorrectedTitle = ((await page.innerText(HomepageConstants.exchangeRatesTitleXpathSelector)).trim()).toLowerCase();
        expect(myDepositsCorrectedTitle).toBe(HomepageConstants.myDepositsTitleExpectedText);
        expect(taxReductionsCorrectedTitle).toBe(HomepageConstants.taxReductionTitleExpectedText);
        expect(exchangeRatesCorrectedTitle).toBe(HomepageConstants.exchangeRatesTitleExpectedText);
    });

    test('should represent all my deposits accounts and information', async ({ page }) => {
        await page.waitForURL('**/Home/Index')
        await page.locator(HomepageConstants.savingsAccountsArrowSelector).click();
        await page.locator(HomepageConstants.checkingAccountsArrowSelector).click();

        //Validate deposits accounts owners' names
        const accountOnwersList = await page.$$(HomepageConstants.accountsOwnersSelector);
        expect(accountOnwersList.length).toBe(2);
        const accountOwnersTextArray = [];
        for (const element of accountOnwersList) {
            const text = await element.innerText();
            accountOwnersTextArray.push(text);
        }
        const ownersExpectedNamesList = [
            HomepageConstants.savingsAccountOwnerExpectedText,
            HomepageConstants.checkingAccountOwnerExpectedText
        ];
        for (let i = 0; i < accountOwnersTextArray.length; i++) {
            expect(accountOwnersTextArray[i]).toBe(ownersExpectedNamesList[i]);
        }

        //Validate deposits accounts' IBAN numbers
        const ibanList = await page.$$(HomepageConstants.ibansSelector);
        expect(ibanList.length).toBe(2);
        const ibanTextsArray = [];
        for (const element of ibanList) {
            const text = await element.innerText();
            ibanTextsArray.push(text);
        }
        const ownersExpectedIbanList = [
            HomepageConstants.savingsIbanExpectedText,
            HomepageConstants.checkingIbanExpectedText
        ];
        for (let i = 0; i < ibanTextsArray.length; i++) {
            expect(ibanTextsArray[i]).toBe(ownersExpectedIbanList[i]);
        }

        //Validate deposits accounts' numbers
        const accountNumbersList = await page.$$(HomepageConstants.depositAccountNumbersSelector);
        expect(accountNumbersList.length).toBe(2);
        const accountNumbersTextsArray = [];
        for (const element of accountNumbersList) {
            const text = await element.innerText();
            const correctedText = text.replace("Αρ. Λογαριασμού: ", "");
            accountNumbersTextsArray.push(correctedText);
        }
        const accountNumbersExpectedList = [
            HomepageConstants.savingsAcountExpectedNumber,
            HomepageConstants.checkingAcountExpectedNumber
        ];

        for (let i = 0; i < accountNumbersTextsArray.length; i++) {
            expect(accountNumbersTextsArray[i]).toBe(accountNumbersExpectedList[i]);
        }

        //Validate Tax Reduction info
        const taxReductionActualNameText = await page.innerText(HomepageConstants.taxReductionNameSelector);
        const taxReductionActualVATText = await page.innerText(HomepageConstants.taxReductionVATSelector);
        const taxReductionActualAmountText = await page.innerText(HomepageConstants.taxReductionAmountSelector);

        expect(taxReductionActualNameText).toBe(HomepageConstants.taxReductionNameExpectedText);
        expect(taxReductionActualVATText).toBe(HomepageConstants.taxReductionVATExpectedText);
        expect(taxReductionActualAmountText).toBe(HomepageConstants.taxReductionAmountExpectedText);
    });

    test('should (not) allow me to input incorrect value to tax reduction calculator', async ({ page }) => {
        //Assert incorrect input does not produce results
        await page.locator(HomepageConstants.toolsButtonSelector).click();
        await page.locator(HomepageConstants.taxReductionCalculatorButtonSelector).click();
        const taxReductionInput = page.locator(HomepageConstants.taxReductionInputSelector);
        const taxReductionResultText = await page.innerText(HomepageConstants.taxReductionResultSelector);
        await taxReductionInput.fill("-1");
        await page.locator(HomepageConstants.taxReductionCalculateButtonSelector).click();
        expect(await taxReductionInput.innerText()).toBe('');
        expect(taxReductionResultText).toBe('');

        //Assert correct income input produces correct results
        const randomInteger = Math.floor(Math.random() * 1000) + 1;
        const randomIntegerAsString = randomInteger.toString();
        const expectedResultAsString = ((randomInteger * 0.3).toFixed(2)).toString();
        const expectedResultCorrected = expectedResultAsString.replace(".", ",");
        await taxReductionInput.fill(randomIntegerAsString);
        await page.locator(HomepageConstants.taxReductionCalculateButtonSelector).click();
        const taxReductionResultAmountText = await page.innerText(HomepageConstants.taxReductionResultAmountSelector);
        expect(taxReductionResultAmountText).toBe(expectedResultCorrected);
        await page.locator(HomepageConstants.closeTaxCalculatorModalButtonSelector).click();
        const taxReductionModal = page.locator(HomepageConstants.taxReductionModalSelector);
        await taxReductionModal.waitFor({ state: "detached" });
    })
});