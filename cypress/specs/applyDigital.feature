@automated
Feature: Create user account, purchase a product and contact support

    Scenario: Navigate to the website and scroll down the page
        Given I navigated to the website
        When I scroll halfway down the page
        Then I should see the page scrolled halfway

    Scenario: Select a product and view product details
        Given I navigated to the website
        When I choose a product and click on "View product"
        Then I should see the product details
        And I should see the product review form

    Scenario: Add product to cart and proceed to checkout
        Given I navigated to the website
        And I choose a product and click on "View product"
        And I entered 30 in the Quantity box
        And I clicked the Add to cart button
        And A modal was displayed with the text "Your product has been added to cart." and I clicked on view cart button
        And I saw the table with 1 product listed
        And I clicked "Proceed to Checkout"
        And A modal was displayed with the text "Register / Login account to proceed on checkout." and with the "Register / Login" link
        And I clicked on "Register / Login" link
        And I entered my name and email under "New User Signup"
        And I filled in all information and click on "Create Account" and then "Continue"
        And I clicked "Continue" under "ACCOUNT CREATED!" title
        And I clicked on the Cart in the header
        And I clicked on "Proceed to checkout"
        And I added a comment and click "Place Order"
        And I filled in fake Credit Card information and click "Pay and Confirm Order"
        And My order was confirmed with the text "Congratulations! Your order has been confirmed!"
        And I clicked on "Continue" button
        When I clicked on "Logout" on the top header
        And I login with my previously created user
        Then I should be successfully logged in

    Scenario: Contact customer support
        Given I am logged in on the website
        And I clicked "Contact us" on the header
        And I filled in required data and click "Submit"
        When I clicked on "Logout" on the top header
        Then I should be logged out successfully
