import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import{users} from '../test_data/users';

const BASE_URL = 'https://www.saucedemo.com/';

test.describe('Basic Login Tests', () => {
    //login page should load
    test('TC_001 - Login page should load @smoke', async ({page}) => {

        const loginPage = new LoginPage(page); 
        await loginPage.goto();
        await loginPage.verifyLoginPageIsVisible();
       
    });

    //valid user should be able to login
    test('TC_002 - Valid users should be able to login @smoke ', async ({page}) => {
        const loginPage  = new LoginPage(page); 

        const standardUserUser = users.find(user=> user.type==='standard')!;

        await loginPage.goto();

        await loginPage.login(standardUserUser.username, standardUserUser.password) ;
        

        await expect(page).toHaveURL(/inventory/);
        
    });

    //Invalid password should show error
    test('TC_003 - Invalid password should show error @negative', async ({page}) => {

        const loginPage  = new LoginPage(page); 

        const standardUser = users.find(user=> user.type==='standard')!;
        await loginPage.goto();

        await loginPage.login(standardUser.username, 'wrong_password');

        await loginPage.verifyErrorMessage('Username and password do not match any user in this service');
   
        
    });

    //locked users should not be able to login
    test('TC_004 - Locked users should not be able to login @negative', async ({page}) => {

        const loginPage  = new LoginPage(page); 

        const lockedUser = users.find(user=> user.type==='locked')!;

        await loginPage.goto();

        await loginPage.login(
            lockedUser.username,
            lockedUser.password
        );

        await loginPage.verifyErrorMessage('Sorry, this user has been locked out');
        

        
        
    });


});

