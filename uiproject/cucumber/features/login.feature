Feature: SauceDemo Login

  Background:
    Given I am on the login page

  Scenario: Standard user login
    When I login using username "standard_user" and password "secret_sauce"
    Then I should be on the Products page

  Scenario: Locked out user cannot login
    When I login using username "locked_out_user" and password "secret_sauce"
    Then I should see the login error message "Epic sadface: Sorry, this user has been locked out."

  Scenario: Invalid login
    When I login using username "invalid_user" and password "invalid_pass"
    Then I should see the login error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Empty credentials
    When I click login without entering any credentials
    Then I should see the login error message "Epic sadface: Username is required"

  Scenario: Empty password
    When I enter only username "standard_user"
    And I click login without entering any credentials
    Then I should see the login error message "Epic sadface: Password is required"

  Scenario: Problem user login
    When I login using username "problem_user" and password "secret_sauce"
    Then I should be on the Products page

  Scenario: Performance glitch user login
    When I login as performance glitch user using username "performance_glitch_user" and password "secret_sauce"
    Then I should be on the Products page
    And login should take between 2 and 10 seconds
