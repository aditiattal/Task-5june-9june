import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {ProductsPage} from '../pages/ProductsPage';
import {CartPage} from '../pages/CartPage';
import{users} from'../test_data/users';
import{products}from '../test_data/products';


const standardUser = users.find(
    user => user.type === 'standard');
    


test.beforeEach(async({page}) => {

    const loginPage = new LoginPage(page)

    await loginPage.goto();

    await loginPage.login(
        users[0].username,
        users[0].password);


});

//Product list should be visible after login
test('TC_005 - Product list visible @smoke', async ({page}) => {

    const productsPage = new ProductsPage(page);

    await productsPage.verifyProductsPageIsVisible();
});

