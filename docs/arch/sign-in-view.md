# Sign In View

## Description

This will present a "Sign In" page to the vendor allowing them to enter their
username and password. A link to "Sign In" will be present in the menu for the
present time. Upon successful sign in, "Signed in as <username>" will render at
the top of "Inventory", "Sales Report", and "Sign In"

**Start Date : 23/12/2018**

**Expected Completion Date : 24/12/2018**

**Actual Completion Date : [TBD]**

## Post-Mortem

**Post-Mortem TBD**

- Mistakes
  - Sign In and Sign Up components were already built
  - TBD
- ## Challenges
  - Having trouble passing authentication status through store to header
- ## Metrics
- ## Learnings

## Goals

- Persist the data for a single vendor
- First step to transferring money from DaiPOS account to 3rd party wallets

## Metrics

- Actions

  - Added

  - Changed

  - Removed

- Expectations
  - More
    - Vendor specific read/write operations to the database
  - Less
    - Data persisted through the browser cache

## R&D

- Problem: Currently the app does not recognize who the user is

  - Describe results you obtained through research and development
    - **_ Research needs to be added _**
  - Solution: Firebase and Firestore will be implemented for login and
    and persisting authorization.

- Problem: Currently the app persists data to the browser cache

  - Describe results you obtained through research and development
    - **_ Research needs to be added _**
  - Solution:
    - We will be using Firestore to persist data.
    - Whats the store structure?
    - Do we have a concept of models (e.g. User, Item, Transaction)?
    - How are those defined and validated? Any frameworks we can use?
    - Is data normalized?

- Problem: How do we manage multiple users for the same vendor?

  - Solution 1: Separate accounts linked to the same wallet
    - Inventory needs to be shared - linking flow is required
    - Clerk can change wallet address on their terminal
    - Migrating to a different setup might be hard later on
    - ...
  - Solution 2: Admin and Clerk account types
    - Admin account is created initially
    - Admin can invite others by email
      - User management screen is required
    - High implementation cost
    - ...
  - Solution 3: All clerks and the owner use the same account
    - Clerk can change the wallet address - Use email confirmation for wallet address change
    - Clerk can update email and password - Use email confirmation for password change - Only allow changing email through support
    - No way to track individual clerk sales
      - Minimal effort required
    - Should be easy to migrate to a more advanced setup later
    - ...
  - Solution 4: No support for multiple terminals
    - No effort required
    - Migration to option 2 or 3 is straight forward
  - Conclusion: Solution 4 fits best for now due to time and resource constraints
    - Migrate to Solution 2 or 3 later

- Problem: Should we use Firebase OAuth? What kind?
  - (Firebase Auth)[https://firebase.google.com/docs/auth/]
  - Firebase has multiple solutions to handle authentication. The easiest is
    likely to be the "Drop-in authentication solution" which is an open source,
    configurable login page which can be found (here)[https://github.com/firebase/firebaseui-web]

## Flow

- fields:
  - Email
  - Password
- buttons:
  - Login
  - Sign Up
- Vendor is prompted to sign in
  - This can be handled by Firebase Auth UI
- Vendor enters data into the displayed fields
- Sign in success is displayed
- Vendor is redirected to the "Inventory" view
- Vendor sees "Signed in as <username>" in the header

## Sub-Features

- [ ] Add components - [ ] SignInScene - [ ] SignUpScene
- [ ] Modify menu to add signOut button
- [ ] Add actions - [ ] userAction.signIn - [ ] Tests - [ ] userAction.signUp - [ ] Tests - [ ] userAction.signUpWithOAuth - [ ] Tests - [ ] userAction.signOut - [ ] Tests - [ ] bannerAction.show - [ ] Tests
- [ ] Add selectors - [ ] isLoggedIn - [ ] Tests - [ ] currentUser - [ ] Tests
- [ ] Add reducers - [ ] signIn - [ ] Tests - [ ] signUp - [ ] Tests - [ ] signOut - [ ] Tests
- [ ] Add constants - [ ] BANNER

## API

### [API Section 1 (Eg. Public, Private, Store)]

### redux/actions/user.js

```js
/**
 * Attempts to sign in a user.
 */
async function signIn({ usernameOrEmail, password }) {}

/**
 * Attempts to sign up a new user.
 */
async function signUp({ username, email, password }) {}

/**
 * Sign up a new user. Signs user in if it already exists.
 */
async function signUpWithOauth({ username, email, password }) {}

/**
 * Signs out current user.
 */
async function signOut() {}
```

### redux/actions/banner.js

```js
/**
 * Shows a banner
 */
function show({ text, color }) {}
```

### [API Section 2]

Changed files:

```js
// ...

/**
 * This is a new function in an existing file. It is optionally wrapped in `// ...`.
 * @return {Any}
 */
function newFunction() {}

// ...

const EXISTING_CONSTANT = {
  // ...

  /**
   * This is a new property. Notice that it is surrounded by `// ...` to show
   * that it is modifying existing code.
   * @type {Object}
   */
  myNewProp: {},

  // ...
}
```
