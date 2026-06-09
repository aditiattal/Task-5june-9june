import { test } from '@playwright/test';
 
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
 
import { users } from '../test_data/users';
import { products } from '../test_data/products';
 
const standardUser = users.find(
    user => user.type === 'standard'
)!;
 
test.beforeEach(async ({ page }) => {
 
    const loginPage = new LoginPage(page);
 
    await loginPage.goto();
 
    await loginPage.login(
        standardUser.username,
        standardUser.password
    );
 
});
 
 
// TC_006
test('TC_006 - Add one product to cart @cart @smoke', async ({ page }) => {
 
    const productsPage = new ProductsPage(page);
 
    await productsPage.addProductToCart(
        products[0].name
    );
 
    await productsPage.verifyCartCount(1);
 
});
 
 
// TC_007
test('TC_007 - Remove product from cart @cart @regression', async ({ page }) => {
 
    const productsPage = new ProductsPage(page);
 
    await productsPage.addProductToCart(
        products[0].name
    );
 
    await productsPage.goToCart();
 
    const cartPage = new CartPage(page);
 
    await cartPage.removeProduct(
        products[0].name
    );
 
});
 
 
// TC_008
test('TC_008 - Add multiple products to cart @cart @regression', async ({ page }) => {
 
    const productsPage = new ProductsPage(page);
 
    await productsPage.addProductToCart(
        products[0].name
    );
 
    await productsPage.addProductToCart(
        products[1].name
    );
 
    await productsPage.verifyCartCount(2);
 
});
 
 
// TC_009
test('TC_009 - Cart page should show selected products @cart @regression', async ({ page }) => {
 
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
 
    await productsPage.addProductToCart(
        products[0].name
    );
 
    await productsPage.addProductToCart(
        products[1].name
    );
 
    await productsPage.goToCart();
 
    await cartPage.verifyProductInCart(
        products[0].name
    );
 
    await cartPage.verifyProductInCart(
        products[1].name
    );
 
});