import { Page, Locator, expect } from '@playwright/test'; 
 
export class ProductsPage { 
  readonly page: Page; 
  readonly cartBadge: Locator; 
  readonly cartLink: Locator;  
 
  constructor(page: Page) { 
    this.page = page; 
    this.cartBadge = page.locator('.shopping_cart_badge'); 
    this.cartLink = page.locator('.shopping_cart_link'); 
  } 
 
  async verifyProductsPageIsVisible(): Promise<void> { 
    await expect(this.page).toHaveURL(/inventory/); 
    await expect(this.page.locator('.inventory_list')).toBeVisible(); 

  } 
 
  
  async addProductToCart(productName: string): Promise<void> { 
    const id = productName.toLowerCase().replace(/ /g, '-');

    await this.page.locator('[data-test ="add-to-cart-${id}"]').click();
  }

async removeProductFromCart(productName: string): Promise<void> { 
    const id = productName.toLowerCase().replace(/ /g, '-');

    await this.page.locator('[data-test ="remove-${id}"]').click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async verifyCartCount(expectedCount: number): Promise<void> {
    
    if (expectedCount === 0) {
        await expect(this.cartBadge).toHaveCount(0); 
   } else{
    await expect(this.cartBadge).toHaveText(expectedCount.toString());
   }
     
}
}