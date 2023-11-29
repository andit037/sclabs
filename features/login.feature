Feature: The Internet Sauce Labs Website

  Scenario Outline: As a user, I can see error messages on login
    Given I am on the login page
    When I login with <username> and <password>
    Then I should see error <messages> on login page

    Examples: 
      | username        | password     | messages                                            |
      | locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out. |
