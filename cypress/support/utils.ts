import { faker } from "@faker-js/faker";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const countries = [
  "Singapore",
  "Canada",
  "India",
  "Australia",
  "Israel",
  "New Zealand",
  "United States",
];
const company = "Apply Digital";
const address =
  "123 Main Street, Suite 400, P.O. Box 5678, XYZ Corporation, New York, NY 1000";
const address2 = "456 Elm Avenue, Apt. 202, Greenfield, MA 01301";
const state = "New Brunswick";
const city = "Toronto";
const zipcode = "11517-1547";
const mobileNumber = "829-230-1846";
const checkboxesIds = ["#id_gender2", "#id_gender1"];

export const userInformation = () => {
  const birthDay = Math.floor(Math.random() * 30);
  const randomIndexMothn = Math.floor(Math.random() * 12);
  const randomMonth = months[randomIndexMothn];

  const startYear = 2000;
  const endYear = 2019;
  const randomYear =
    Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;

  const randomName = faker.internet.userName();
  const randomLastName = faker.internet.userName();

  const randomCountryIndex = Cypress._.random(0, countries.length - 1);
  const randomCountry = countries[randomCountryIndex];
  const fakePassword = faker.internet.password();

  const fakeName = faker.internet.userName();
  const fakeEmail = faker.internet.email();

  return {
    randomYear: randomYear,
    randomName: randomName,
    randomLastName: randomLastName,
    randomCountry: randomCountry,
    fakePassword: fakePassword,
    birthDay: birthDay,
    randomMonth: randomMonth,
    company: company,
    address: address,
    address2: address2,
    state: state,
    city: city,
    zipcode: zipcode,
    mobileNumber: mobileNumber,
    checkboxesIds: checkboxesIds,
    fakeName: fakeName,
    fakeEmail: fakeEmail,
  };
};
