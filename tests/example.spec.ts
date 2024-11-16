import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const URL = process.env.APP_URL

test.beforeEach(async ({ page }) => {
  await page.goto(URL);


})
test('Check for incorrect credentials message and close pop up message', async ({ page }) => {
  const usernameField = page.getByTestId("username-input")
  const passwordField = page.getByTestId("password-input")
  const signInButton = page.getByTestId("signIn-button")
  const errorPopUpMessage = page.getByTestId("authorizationError-popup")
  const closeButton = page.getByTestId("authorizationError-popup-close-button")

  const fakeUsername = faker.internet.username()
  const fakePassword = faker.internet.password()

  await usernameField.fill(fakeUsername)
  await passwordField.fill(fakePassword)
  await signInButton.click()
  await expect(errorPopUpMessage).toBeVisible()
  // await expect(signInButton).toBeDisabled()

  await closeButton.click()
  await expect(signInButton).toBeEnabled()
});

test('Check for error messages for login and password input', async ({ page }) => {
  const usernameField = page.getByTestId("username-input")
  const passwordField = page.getByTestId("password-input")
  const emptyErrorMessageForUserName = page.getByTestId('username-input-error').nth(0)
  const emptyErrorMessageForPassword  = page.getByTestId('username-input-error').nth(1)

  const emptyErrorMessageForShortUserName = page.getByText('The field must contain at least of characters: 2')
  const emptyErrorMessageForShortPassword = page.getByText('The field must contain at least of characters: 8')


  const shortUsername = faker.internet.username().slice(0, 1);
  await usernameField.fill(shortUsername)
  await expect(emptyErrorMessageForShortUserName).toBeVisible()

  await usernameField.fill("")
  await expect(emptyErrorMessageForUserName).toBeVisible()

  const shortPassword = faker.internet.password('4')
  await passwordField.fill(shortPassword)
  await expect(emptyErrorMessageForShortPassword).toBeVisible()

  await passwordField.fill("")
  await expect(emptyErrorMessageForPassword).toBeVisible()
});
