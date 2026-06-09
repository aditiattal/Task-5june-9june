The project automates the functionalities of the SauceDemo application using Playwright and TypeScript. The framework follows Page Object Modal design pattern, supports test tagging and generates HTML reports.


#Technology Used:
1. Playwright
2. Typescript
3. Node.js
4. Virtual Studio Code
   


#Project Structure


playwright-training/ 
| 
├── tests/ 
│   ├── login.spec.ts 
│   ├── products.spec.ts 
│   ├── cart.spec.ts 
│   └── checkout.spec.ts 
| 
├── pages/ 
│   ├── LoginPage.ts 
│   ├── ProductsPage.ts 
│   ├── CartPage.ts 
│   └── CheckoutPage.ts 
| 
├── test-data/ 
│   ├── users.ts 
│   └── products.ts 
| 
├── utils/ 
│   └── testHelpers.ts 
| 
├── playwright.config.ts 
├── package.json 
└── README.md 



#Setup Steps

1. Prerequisites

Software to be installed:
Node.js
npm
VS code

2. Install Dependencies
npm install

3. Playwright browser- npx playwright install




#Execution Steps

1. Run All Tests 
npx playwright test

2. Run tests in headed mode 
npx playwright test --headed 

3. Run Login Tests
npx playwright test tests/login.spec.ts

4. Run Cart Tests
npx playwright test tests/cart.spec.ts

5. Run Checkout Tests
npx playwright test tests/checkout.spec.ts


6. Show HTML report 
npx playwright show-report 

7. Run only smoke tests 
npx playwright test --grep @smoke 
 
8. Run only negative tests 
npx playwright test --grep @negative 

9. Run only regression tests
npx playwright test --grep @regression

10. Run test on specific browser

Chromium: npx playwright test --project=chromium
Firefox: npx playwright test --project=firefox
WebKit: npx playwright test --project=webkit

