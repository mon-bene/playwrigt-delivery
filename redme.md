
## install dependencies

```npm ci```

## execute all test

```npx playwright test```

Tests:

1. Check for incorrect credentials message and close pop up message
2. Check for error messages for login and password input

Selectors:

usernameField = data-name="username-input"
passwordField = data-name="password-input"
signInButton = data-name="sigIn-button"
errorPopUpMessage = data-name="authorizationError-popup"
closeButton = data-name="authorizationError-popup-close-button"