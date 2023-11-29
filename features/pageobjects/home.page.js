const { $ } = require('@wdio/globals')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage{
    /**
     * define selectors using getter methods
     */
    get logo () {
        return $('div[class="app_logo"]');
    }

    get pricesProducts () {
        return browser.$$('//div[@class="inventory_item_price"]');
    }

    get selectFilter () {
        return $('select[data-test="product_sort_container"]');
    }

    get priceProduct () {
        return $('div[class="inventory_item_price"]');
    }

    get productName () {
        return $('div[class="inventory_item_name "]');
    }

    get firstProduct () {
        return $('div[class="inventory_item"]');
    }

    get add2CartSauceLabsBackPack () {
        return $('button[data-test="add-to-cart-sauce-labs-backpack"]');
    }

    get linkProductSauceLabsBikeLight () {
        return $('//a/div[contains(text(),"Sauce Labs Bike Light")]');
    }

    get burgerMenu () {
        return $('button[id="react-burger-menu-btn"]');
    }

    get logOutButton () {
        return $('a[id="logout_sidebar_link"]');
    }
    
    
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    async sortFunc(list){
        var data = list.sort();
        var data = data.sort(function(a,b){
            a = parseFloat(a.replace(/[^\d\.]/,''));
            b = parseFloat(b.replace(/[^\d\.]/,''));
        
            return b-a;
        });

        return data
    }

    async textProductPricesSort () {
        const selectBox = await $('//select/option');
        if (await selectBox.getText() == 'Name (A to Z)'){
            var txtArray = await this.pricesProducts.map(elem => elem.getText());
            var sortProductPrices = await this.sortFunc(txtArray);
        }
        return sortProductPrices
    }

    async selectFilterDropdown (filter) {
        await this.selectFilter.selectByVisibleText(filter);
    }

    async verifyHighest2LowestPrices(){
        const afterSortPrices = await this.pricesProducts.map(elem => elem.getText());
        const expectedSortPrices= await this.sortFunc(await this.textProductPricesSort());
        await expect(await expectedSortPrices).to.deep.equal(afterSortPrices);
        
    }

    async clickProduct(){
        await this.firstProduct.click();
    }

    async clickBurgerMenu(){
        await this.burgerMenu.click();
    }

    async clickLogOutButton(){
        await this.logOutButton.click();
    }

    async clickCartSauceLabsBackPack(){
        await this.add2CartSauceLabsBackPack.click();
    }

    async clickLinkProductSauceLabsBikeLight(){
        await this.linkProductSauceLabsBikeLight.click();
    }
}

module.exports = new HomePage();
