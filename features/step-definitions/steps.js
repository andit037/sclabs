const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')

const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');


Given(/^I am on the login page$/, async() => {
	await browser.url(`https://www.saucedemo.com/`)
});


When(/^I login with (.*) and (.*)$/, async (username, password) => {
    await LoginPage.login(username, password)
});


When(/^I should see (.*) inside website$/, async(logo) => {
	await expect(HomePage.logo).toBeExisting();
    await expect(HomePage.logo).toHaveTextContaining(logo);
});


When(/^I see price of products$/, async() => {
	await HomePage.textProductPricesSort();
});


When(/^I sort (.*) prices$/, async (filter) => {
	await HomePage.selectFilterDropdown(filter)
});


When(/^I should see the prices is sorted highest to lowest$/, async() => {
	await HomePage.verifyHighest2LowestPrices();
});


When(/^I should see the highest prices is (.*) and product is (.*)$/, async(price,product_name) => {
	await expect(HomePage.productName).toBeExisting();
    await expect(HomePage.productName).toHaveTextContaining(product_name);

    await expect(HomePage.priceProduct).toBeExisting();
    await expect(HomePage.priceProduct).toHaveTextContaining(price);
});


When(/^I select the highest price product$/, async() => {
	await HomePage.clickProduct();
});


When(/^I choose add to cart the highest product$/, async() => {
	await CartPage.clickAdd2Cart();
    await CartPage.clickCart();
});


// When(/^I checkout the highest product$/, async() => {
// 	await CartPage.clickCheckout();
// });


When(/^I checkout all the products$/, async() => {
	await CartPage.clickCheckout();
});


When(/^I should see checkout information consist of (.*)$/, async(items) => {
	var optArr = items.split(",")
    for (let i = 0; i < optArr.length; i++) {
		const elem = await CheckoutPage.checkoutInformation(optArr[i]);
		await expect(elem).toBePresent()
	  }
});



When(/^I insert (.*) of checkout information with each of (.*)$/, async(items,values) => {
	var optArr = items.split(",")
	var valArr = values.split(",")
    for (let i = 0; i < optArr.length; i++){
		await CheckoutPage.insertCheckoutInformation(optArr[i],valArr[i]);
	}
	await browser.pause(1000);
});


When(/^I go to next page after checkout$/, async() => {
	await CheckoutPage.clickContinue();
	await CheckoutPage.clickFinish();
});



Then(/^I should see success order (.*) after buy the product$/, async(messages) => {
	await expect(CheckoutPage.completeOrderMessage).toBeExisting();
    await expect(CheckoutPage.completeOrderMessage).toHaveTextContaining(messages);
});


Then(/^I should see error (.*) on login page$/, async(messages) => {
	await expect(LoginPage.flashAlert).toBeExisting();
    await expect(LoginPage.flashAlert).toHaveTextContaining(messages);
});


When(/^I add product sauce labs backpack to cart on homepage$/, async() => {
	await HomePage.clickCartSauceLabsBackPack();
});


When(/^I open detail of product sauce labs bike light$/, async() => {
	await HomePage.clickLinkProductSauceLabsBikeLight();
});


When(/^I add product sauce labs bike light to cart on detail product page$/, async() => {
	await CartPage.clickCartSauceLabsBikeLight();
    await CartPage.clickCart();
});


When(/^I insert (.*) and (.*) and (.*) on checkout page$/, async(firstName,lastName,postalCode) => {
	await CheckoutPage.insertFieldOfCheckoutInformation(firstName,lastName,postalCode)
});


When(/^I go to next page on checkout page$/, async() => {
	await CheckoutPage.clickContinue();
});


When(/^I see error (.*) of messages$/, async(messages) => {
	await expect(CheckoutPage.errorMessages).toBeExisting();
    await expect(CheckoutPage.errorMessages).toHaveTextContaining(messages);
});


When(/^I insert empty lastName (.*)$/, async(lastName) => {
	(await CheckoutPage.lastNameField).setValue(lastName);
});



When(/^I should see the total prices of products is (.*) and the products are (.*), (.*)$/, async(total_prices,product1,product2) => {
	await expect(CheckoutPage.firstProduct).toBeExisting();
    await expect(CheckoutPage.firstProduct).toHaveTextContaining(product1);

	await expect(CheckoutPage.secondProduct).toBeExisting();
    await expect(CheckoutPage.secondProduct).toHaveTextContaining(product2);

	await expect(CheckoutPage.totalPricesOfProducts).toBeExisting();
    await expect(CheckoutPage.totalPricesOfProducts).toHaveTextContaining(total_prices);
});


When(/^I complete the payment process$/, async() => {
	await CheckoutPage.clickFinish();
	await CheckoutPage.clickBack2Products();
});


When(/^I log out from homepage$/, async() => {
	await HomePage.clickBurgerMenu();
	await HomePage.clickLogOutButton();
});


Then(/^I see login and password field on login page$/, async() => {
	await expect(LoginPage.inputUsername).toBeExisting();
	await expect(LoginPage.inputPassword).toBeExisting();
});
