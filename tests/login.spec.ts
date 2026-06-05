import { test, expect } from '@playwright/test';
import{users} from '../test_data/users';

const BASE_URL = 'https://www.saucedemo.com/';

test.describe('Basic Login Tests', () => {
    //login page should load
    test('TC_001 - Login page should load', async ({page}) => {
        await page.goto(BASE_URL);

        await expect(page).toHaveTitle(/Swag Labs/);
        await expect(page.locator('[data-test = "username"]')).toBeVisible();
        await expect(page.locator('[data-test = "password"]')).toBeVisible();
        await expect(page.locator('[data-test = "login-button"]')).toBeVisible();
       
       

    });

    //valid user should be able to login
    test('TC_002 - Valid users should be able to login', async ({page}) => {
        const standardUserUser = users.find(user=> user.type==='standard')!;
        await page.goto(BASE_URL);

        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.title')).toHaveText('Products');
    });

    //Invalid password should show error
    test('TC_003 - Invalid password should show error', async ({page}) => {
        const standardUserUser = users.find(user=> user.type==='standard')!;
        await page.goto(BASE_URL);

        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'wrong_password');
        await page.click('[data-test="login-button"]');

        await expect(
            page.locator('[data-test="error"]')
        ).toContainText(
            'Username and password do not match'
        );
        
    });

    //locked users should not be able to login
    test('TC_004 - Locked users should not be able to login', async ({page}) => {
        const lockedUser = users.find(user=> user.type==='locked')!;
        await page.goto(BASE_URL);

        await page.fill('[data-test="username"]', 'locked_out_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await expect(
            page.locator('[data-test="error"]')
        ).toContainText(
            'Sorry, this user has been locked out'
        );
        
    });


});

