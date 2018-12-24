# Login View

## Description

This will present a "Login" page to the vendor allowing them to enter their
username and password. A link to "login" will be present in the menu for the
present time. Upon successful login, "Logged in as <username>" will render at
the top of "Inventory", "Sales Report", and "Login"

**Start Date : 23/12/2018**

**Expected Completion Date : 24/12/1984**

**Actual Completion Date : [TBD]**

## Post-Mortem

**Post-Mortem TBD**

- Mistakes
  - This should be updated as you implement the feature
  - Add anything that you missed in your original architecture
- Challenges
  - This should be updated as you implement the feature
  - Add anything that was more challenging than expected, and may have contributed to misjudgement of time
- Metrics
  - List the metrics changes that arose after the feature was shipped
  - Don't forget to compare them with your expectations
- Learnings
  - Jot down what you learned in architecting and building this feature
  - How will you improve in future feature architectures and implementations?

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
    - No research started
  - Solution: TBD

- Problem: Currently the app persists data to the browser cache
  - Describe results you obtained through research and development
    - No research started
  - Solution: TBD

## Flow

1. This is the "when?" and "where?" of this feature

- Vendor is prompted to log in
- Vendor enters data into the displayed fields
- Login success is displayed
- Vendor is redirected to the "Inventory" view
- Vendor sees "Logged in as <username>" in the header

## Sub-Features

- [ ] Login button is in menu
- [ ] Login redirects vendor to Login page
- [ ] Unregistered vendors are alerted to register at the login page
- [ ] Unregistered vendors are advised to register if their account has more
      than 0 Dai
- [ ] Login submit sends credentials to Firebase
- [ ] Successful response from Firebase alerts vendor of login success
- [ ] Vendor is routed to "Inventory"
- [ ] "Logged in as <username>" is displayed in the header
- [ ] Once your architecture is merged, these must be moved to stories in Pivotal Tracker
- [ ] Eg. `<ConversationsContainer>`: A container that will act as the root for the new `<Stack>`, left of `<NotificationsContainer>`

## Migration (optional)

- How will the current architecture be modified to migrate to this new architecture?
- What files will be removed?
- What functions will be deprecated?

## API

### [API Section 1 (Eg. Public, Private, Store)]

Provide the appropriate constants/variables/functions/etc. and their locations.

```js
// NOTE: Be sure to alphabetize your api sections.

/**
 * Fully document everything. This code is copy-pasteable for when
 * you begin the implementation phase.
 * @return {Boolean}
 */
function yoMama() {}
```

### [API Section 2]

Here is an example of a changed file:

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
  myNewProp: {}

  // ...
};
```
