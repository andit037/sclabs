const { $ } = require('@wdio/globals')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutPage{
    /**
     * define selectors using getter methods
     */
    checkoutInformation(item) {
        return $(`input[data-test='${item}']`);
    }
    
    get continueButton() {
        return $('input[data-test="continue"]');
    }

    get finishButton() {
        return $('button[data-test="finish"]');
    }
    
    get completeOrderMessage() {
        return $('h2[class="complete-header"]');
    }

    get firstNameField() {
        return $('input[data-test="firstName"]');
    }

    get lastNameField() {
        return $('input[data-test="lastName"]');
    }

    get postalCodeField() {
        return $('input[data-test="postalCode"]');
    }

    get errorMessages() {
        return $('h3[data-test="error"]');
    }

    get firstProduct() {
        return $('(//a/div[@class="inventory_item_name"])[1]');
    }

    get secondProduct() {
        return $('(//a/div[@class="inventory_item_name"])[2]');
    }

    get totalPricesOfProducts() {
        return $('//div[@class="summary_info_label summary_total_label"]');
    }

    get back2Home() {
        return $('button[data-test="back-to-products"]');
    }

    
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    async insertCheckoutInformation(items,values){
        await this.checkoutInformation(items).waitForDisplayed({ timeout: 5000 });
        (await this.checkoutInformation(items)).setValue(values);    
    }
    

    async clickCheckout(){
        (await this.checkoutButton).click();    
    }

    async clickContinue(){
        (await this.continueButton).click();    
    }

    async clickFinish(){
        (await this.finishButton).click();    
    }

    async clickBack2Products(){
        (await this.back2Home).click();    
    }

    async insertFieldOfCheckoutInformation(firstName,lastName,postalCode){
        await this.firstNameField.waitForDisplayed({ timeout: 5000 });
        (await this.firstNameField).setValue(firstName);
        (await this.lastNameField).setValue(lastName);
        (await this.postalCodeField).setValue(postalCode);   
    }
}

module.exports = new CheckoutPage();
