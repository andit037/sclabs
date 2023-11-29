Feature: The Internet Sauce Labs Website

  Scenario Outline: As a user, I can make order
    Given I am on the login page
    When I login with <username> and <password>
    And I should see <logo> inside website
    And I add product sauce labs backpack to cart on homepage
    And I open detail of product sauce labs bike light
    And I add product sauce labs bike light to cart on detail product page
    And I checkout all the products
    And I insert <firstName> and <lastName0> and <postalCode> on checkout page
    And I go to next page on checkout page
    And I see error <messages> of messages
    And I insert empty lastName <lastName1>
    And I go to next page on checkout page
    And I should see the total prices of products is <total_prices> and the products are <product1>, <product2>
    And I complete the payment process
    And I should see <logo> inside website
    And I log out from homepage
    Then I see login and password field on login page

    Examples: 
      | username      | password     | logo      | firstName | lastName0 | postalCode | messages                     | lastName1 | product1            | product2              | total_prices |
      | standard_user | secret_sauce | Swag Labs | dummy     |           |      28654 | Error: Last Name is required | user      | Sauce Labs Backpack | Sauce Labs Bike Light | $43.18       |
