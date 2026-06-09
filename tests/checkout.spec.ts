import {test,expect} from '@playwright/test';
import {users} from '../test_data/users';

const standardUser = users.find(
    user => user.type === 'standard'
)!;

test.beforeEach(async({page}) => {
    await page.goto('https://www.saucedemo.com/');

    await page.fill(
        '[data-test="username"]', 
        standardUser.username
    );

    await page.fill(
        '[data-test="password"]', 
        standardUser.password
    );

    await page.click('[data-test="login-button"]');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
});

//Checkout with valid details
test('TC_010 - Checkout with valid details', async ({page}) => {
    await page.fill('[data-test ="firstName"]', 'Aditi');
    await page.fill('[data-test ="lastName"]', 'Attal');
    await page.fill('[data-test ="postalCode"]', '40001');

    await page.click('[data-test = "continue"]');

    await expect(page).toHaveURL(/checkout-step-two/);

    await expect(page.locator('.title')).toHaveText('Checkout: Overview');

});


//Checkout with missing first name
test('TC_011 - Checkout with missing first name', async ({page}) => {
    await page.fill('[data-test ="lastName"]', 'Attal');
    await page.fill('[data-test ="postalCode"]', '40001');

    await page.click('[data-test = "continue"]');

    await expect(page.locator('[data-test= "error"]')).toContainText('First Name is required');

});

//Checkout with missing postal code
test('TC_012 - Checkout with missing postal code', async ({page}) => {
    await page.fill('[data-test ="firstName"]', 'Aditi');
    await page.fill('[data-test ="lastName"]', 'Attal');
    

    await page.click('[data-test = "continue"]');

    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');

});
