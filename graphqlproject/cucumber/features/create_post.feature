Feature: Create a new post using GraphQL
  As an API consumer
  I want to create a new post using a GraphQL mutation
  So that I can validate the API behaviour

  Scenario: Create a new post with valid data
    Given I have a valid default post payload
    When I override the payload with custom post data
    And I send the createPost GraphQL mutation
    Then the response should contain the created post
    And the title should match the custom value
    And the body should match the custom value
