import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { userInformation } from "../../support/utils";

const userInformationObject = userInformation();

Given("I navigated to the website", () => {
  cy.visit("/");
});

When("I scroll halfway down the page", function () {
  cy.document().then((doc) => {
    const halfHeight = doc.documentElement.scrollHeight / 2;
    cy.scrollTo(0, halfHeight);
    this.halfHeight = halfHeight;
  });
});

Given("I should see the page scrolled halfway", function () {
  cy.window().then((win) => {
    const currentPosition = win.scrollY;
    expect(currentPosition).to.be.closeTo(this.halfHeight, 50);
  });
});

When('I choose a product and click on "View product"', () => {
  cy.get(".choose ul.nav li").then(($products) => {
    const randomIndex = Math.floor(Math.random() * $products.length);
    const randomProduct = $products.eq(randomIndex);
    cy.wrap(randomProduct).find("a").click();
  });
});

Then("I should see the product details", () => {
  cy.url().should("contains", "/product_details");
  cy.get(".product-information").should("be.visible");
});

Then("I should see the product review form", () => {
  cy.get("#review-form").scrollIntoView().should("be.visible");
});

Given("I entered 30 in the Quantity box", () => {
  cy.get("#quantity").clear().type("30");
});

Given("I clicked the Add to cart button", () => {
  cy.get("#quantity").parent().find("button.cart").click();
});

Given(
  "A modal was displayed with the text {string} and I clicked on view cart button",
  (modalConfirmationText: string) => {
    cy.get("#cartModal").within(() => {
      cy.contains("p", modalConfirmationText).should("be.visible");
      cy.get('[href="/view_cart"]').click();
    });
  }
);

Given("I saw the table with 1 product listed", () => {
  cy.get("#cart_info_table").within((table) => {
    cy.wrap(table).should("be.visible");
    cy.get(
      ".cart_description, .cart_price, .cart_quantity, .cart_total, .cart_delete"
    ).should("be.visible");
  });
});

Given("I clicked {string}", (buttonText: string) => {
  cy.get("a.check_out").click();
});

Given(
  "A modal was displayed with the text {string} and with the {string} link",
  (text: string, link: string) => {
    cy.get("#checkoutModal").within(() => {
      cy.contains("p", text).should("be.visible");
      cy.contains("a", link).should("be.visible");
    });
  }
);

Given("I clicked on {string} link", (linkText: string) => {
  cy.get("#checkoutModal").within(() => {
    cy.contains('a[href="/login"]', linkText).click();
  });
});

Given('I entered my name and email under "New User Signup"', function () {
  const fakeName = userInformationObject.fakeName;
  const fakeEmail = userInformationObject.fakeEmail;
  this.fakeEmail = fakeEmail;

  cy.get('input[data-qa="signup-name"]').type(fakeName);
  cy.get('input[data-qa="signup-email"]').type(fakeEmail);
  cy.get('button[data-qa="signup-button"]').click();
});

Given(
  'I filled in all information and click on "Create Account" and then "Continue"',
  function () {
    const fakePassword = userInformationObject.fakePassword;
    this.fakePassword = fakePassword;

    cy.get('form[action="/signup"]').within(() => {
      // Title
      const checkboxesIds = ["#id_gender2", "#id_gender1"];
      cy.get(checkboxesIds[Math.floor(Math.random() * 2)])
        .check()
        .should("be.checked");

      // Password
      cy.get("#password").type(fakePassword);

      // Date of birth
      cy.get("#uniform-days select").select(userInformationObject.birthDay);
      cy.get("#uniform-months select").select(
        userInformationObject.randomMonth
      );
      cy.get("#uniform-years select").select(
        `${userInformationObject.randomYear}`
      );

      // Notification checkboxes
      cy.get("#newsletter").click();
      cy.get("#optin").click();

      // ADDRESS INFORMATION
      cy.get('[data-qa="first_name"]').type(userInformationObject.randomName);
      cy.get('[data-qa="last_name"]').type(
        userInformationObject.randomLastName
      );
      cy.get('[data-qa="company"]').type(userInformationObject.company);
      cy.get('[data-qa="address"]').type(userInformationObject.address);
      cy.get('[data-qa="address2"]').type(userInformationObject.address2);
      cy.get('[data-qa="country"]').select(userInformationObject.randomCountry);
      cy.get('[data-qa="state"]').type(userInformationObject.state);
      cy.get('[data-qa="city"]').type(userInformationObject.city);
      cy.get('[data-qa="zipcode"]').type(userInformationObject.zipcode);
      cy.get('[data-qa="mobile_number"]').type(
        userInformationObject.mobileNumber
      );

      cy.get('button[data-qa="create-account"]').scrollIntoView().click();
    });
  }
);

Given('I clicked "Continue" under "ACCOUNT CREATED!" title', () => {
  cy.get('[data-qa="continue-button"]').click();
});

Given("I clicked on the Cart in the header", () => {
  cy.get("#header").find('a[href="/view_cart"]').click();
});

Given('I clicked on "Proceed to checkout"', () => {
  cy.get("#do_action").contains("a", "Proceed To Checkout").click();
});

Given('I added a comment and click "Place Order"', () => {
  cy.get("#ordermsg textarea").type(
    "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been"
  );
  cy.get('a[href="/payment"]').click();
});

Given(
  'I filled in fake Credit Card information and click "Pay and Confirm Order"',
  () => {
    cy.get("#payment-form").within((form) => {
      cy.get('input[data-qa="name-on-card"]').type("Felix Pujols");
      cy.get('input[data-qa="card-number"]').type("7897987897987897899");
      cy.get('input[data-qa="cvc"]').type("487");
      cy.get('input[data-qa="expiry-month"]').type("29");
      cy.get('input[data-qa="expiry-year"]').type("69");

      cy.get('button[data-qa="pay-button"]').click();
    });
  }
);

Given('I clicked on "Continue" button', () => {
  cy.get('a[data-qa="continue-button"]').click();
});

Given(
  "My order was confirmed with the text {string}",
  (confirmationText: string) => {
    cy.get('[data-qa="order-placed"]').within((orderContainer) => {
      cy.wrap(orderContainer).should("be.visible");
      cy.wrap(orderContainer)
        .parent()
        .contains("p", confirmationText)
        .should("be.visible");
    });
  }
);

Given('I clicked on "Logout" on the top header', () => {
  cy.get("#header").find('a[href="/logout"]').click();
});

Given("I login with my previously created user", function () {
  cy.get('input[data-qa="login-email"]').type(this.fakeEmail);
  cy.get('input[data-qa="login-password"]').type(this.fakePassword);
  cy.get('button[data-qa="login-button"]').click();
});

Given('I clicked "Contact us" on the header', () => {
  cy.get("#header").find('a[href="/contact_us"]').click();
});

Given('I filled in required data and click "Submit"', function () {
  cy.get("#contact-us-form").within((form) => {
    cy.get('input[data-qa="name"]').type("Felix Pujols");
    cy.get('input[data-qa="email"]').type("testy@gmai.com");
    cy.get('input[data-qa="subject"]').type("Buy products");

    cy.get('textarea[data-qa="message"]').type(
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been"
    );

    cy.get('input[name="upload_file"]').selectFile({
      contents: Cypress.Buffer.from("file contents"),
      fileName: "file.txt",
      mimeType: "text/plain",
      lastModified: Date.now(),
    });
    cy.get('input[data-qa="submit-button"]').click();
  });
});

Then("I should be logged out successfully", () => {
  cy.url().should("contains", "/login");
  cy.get("#header").should("not.contain", 'a[href="/logout"]');
});

Then("I should be successfully logged in", () => {
  cy.get("#header").find('a[href="/logout"]').should("be.visible");
});

Then("I am logged in on the website", () => {
  cy.visit("/login");
  cy.get('input[data-qa="login-email"]').type("felixpujols007@gmail.com");
  cy.get('input[data-qa="login-password"]').type("Acquire123!");
  cy.get('button[data-qa="login-button"]').click();
});
