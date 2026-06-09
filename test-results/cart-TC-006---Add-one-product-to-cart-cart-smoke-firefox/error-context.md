# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.ts >> TC_006 - Add one product to cart @cart @smoke
- Location: tests\cart.spec.ts:29:5

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://www.saucedemo.com/", waiting until "load"

```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test'; 
  2  |  
  3  | export class LoginPage { 
  4  |   readonly page: Page; 
  5  |   readonly usernameInput: Locator; 
  6  |   readonly passwordInput: Locator; 
  7  |   readonly loginButton: Locator; 
  8  |   readonly errorMessage: Locator; 
  9  |  
  10 |   constructor(page: Page) { 
  11 |     this.page = page; 
  12 |     this.usernameInput = page.locator('[data-test="username"]'); 
  13 |     this.passwordInput = page.locator('[data-test="password"]'); 
  14 |     this.loginButton = page.locator('[data-test="login-button"]'); 
  15 |     this.errorMessage = page.locator('[data-test="error"]'); 
  16 |   } 
  17 |  
  18 |   async goto(): Promise<void> { 
> 19 |     await this.page.goto('https://www.saucedemo.com/'); 
     |                     ^ Error: page.goto: Test timeout of 30000ms exceeded.
  20 |   } 
  21 |  
  22 |   async login(username: string, password: string): Promise<void> { 
  23 |     await this.usernameInput.fill(username); 
  24 |     await this.passwordInput.fill(password); 
  25 |     await this.loginButton.click(); 
  26 |   } 
  27 |  
  28 |   async verifyLoginPageIsVisible(): Promise<void> { 
  29 |     await expect(this.usernameInput).toBeVisible(); 
  30 |     await expect(this.passwordInput).toBeVisible(); 
  31 |     await expect(this.loginButton).toBeVisible(); 
  32 |   } 
  33 |  
  34 |   async verifyErrorMessage(expectedMessage: string): Promise<void> { 
  35 |     await expect(this.errorMessage).toContainText(expectedMessage); 
  36 |   } 
  37 | } 
```