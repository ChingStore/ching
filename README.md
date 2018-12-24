# Sign In View

## Description

This will present a "Sign In" page to the vendor allowing them to enter their
username and password. A link to "Sign In" will be present in the menu for the
present time. Upon successful sign in, "Signed in as <username>" will render at
the top of "Inventory", "Sales Report", and "Sign In"

**Start Date : 23/12/2018**

**Expected Completion Date : 24/12/1984**

**Actual Completion Date : [TBD]**

## Post-Mortem

**Post-Mortem TBD**

- Mistakes
  - Sign In and Sign Up components were already built
  -
- ## Challenges
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
    - No research started
  - Solution: TBD

- Problem: Currently the app persists data to the browser cache
  - Describe results you obtained through research and development
    - No research started
  - Solution: TBD

## Flow

1. This is the "when?" and "where?" of this feature

- Vendor is prompted to sign in
- Vendor enters data into the displayed fields
- Sign in success is displayed
- Vendor is redirected to the "Inventory" view
- Vendor sees "Signed in as <username>" in the header

## Sub-Features

- [x] Sign In button is in menu
- [x] Sign In button redirects vendor to Sign In page
- [ ] Unregistered vendors are alerted to Sign Up at the Sign In page
- [ ] Unregistered vendors are advised to Sign Up if their account has more
      than 0 Dai
- [ ] Sign In submit sends credentials to Firebase
- [ ] Successful response from Firebase alerts vendor of sign in success
- [ ] Vendor is routed to "Inventory"
- [ ] "Signed in as <username>" is displayed in the header
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
