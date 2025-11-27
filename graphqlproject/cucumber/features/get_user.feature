Feature: Fetch user by ID
  As an API consumer
  I want to fetch a user by their ID
  So that I can verify the response data

  Scenario: Fetch a valid user by ID
    Given I have a user ID "1"
    When I fetch the user details by this ID
    Then the user response should contain the user details
    And the user id should be "1"
