import { Page, Locator, expect } from '@playwright/test'; 
 
export class CartPage { 
  readonly page: Page; 
  readonly checkoutButton: Locator; 
  readonly continueShoppingButton: Locator;  
 
  constructor(page: Page) { 
    this.page = page; 
    this.checkoutButton = page.locator('[data-test="checkout"]'); 
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]'); 
  } 
 
  async verifyProductInCart(productName: string): Promise<void> { 
    await expect(this.page.locator('.inventory_item_name').filter({hasText: productName})).toBeVisible(); 
    await expect(this.page.locator('.inventory_list')).toBeVisible(); 

  } 
 
  
  async removeProduct(productName: string): Promise<void> { 
    const id = productName.toLowerCase().replace(/ /g, '-');

    await this.page.locator('[data-test ="remove-${id}"]').click();
  }

async continueShopping(): Promise<void> { 

    await this.continueShoppingButton.click();
  }



  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}

 