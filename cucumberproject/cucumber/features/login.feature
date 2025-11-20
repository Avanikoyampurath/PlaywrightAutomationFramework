Feature: Login flow

  Scenario: Valid login
    Given I am on login page
    When I login with valid credentials
    Then I should land on inventory page
