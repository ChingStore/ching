# DaiPOS Scope

## UI/UX improvement, stabilization of the app and integration of xDai (December15th, 2018 to January 15th, 2019):

### Design and implementation of more user-friendly UI: 76 hours

- [ ] Designer mockups
     - [ ] Inventory: 4 hrs
     - [ ] Add/modify item: 4 hrs
     - [ ] Sales report: 4 hrs
     - [ ] Private key recovery opt-in/registration: 4 hrs
     - [ ] Login: 4 hrs
- [ ] Refactor inventory: 8 hrs
- [ ] Refactor sales report: 8 hrs
- [ ] Create 3rd party wallet linking view: 8 hrs
- [ ] Create login view: 4 hrs
- [ ] Refactor add/modify item functionality: 8hrs
- [ ] Nodemailer password recovery page: 8hrs
- [ ] Create transaction list view: 4hrs
- [ ] Create order transaction progress/confirmation view 8h


### Storage of the user data and public keys (e.g., Firebase): 54 hours

- [ ] Setup database and allow mirroring: 10 hrs
- [ ] Configure ACL: 10 hrs
- [ ] Prototype API endpoints: 10 hrs
- [ ] Document API and architecture: 10 hrs
- [ ] Test and reiterate on API endpoints: 10 hours
- [ ] Setup default security configuration: 4 hrs### User/Vendor login via OAuth2: 10 hours:
- [ ] Add OAuth 2.0 protocols and register with authentication providers: 10hrs;


### xDai/denDai integration: 30 hours

- [ ] Add Currency toggle to app header and routes for all currencies in spec:10 hrs
- [ ] PR makerdao/dai.js toggle for web3 syncing and logging: 10 hrs
- [ ] PR makerdao/dai.js for route for DenDAI: 10hrs


### Expected issues: 40 hours

- [ ] Establish role management for vendors: 10 hrs
- [ ] Create a way to monitor transactions for multi-seller setup: 10 hrs
- [ ] Maximize data payload in QR code for best purchaser UX: 10 hrs
- [ ] Planning for burner wallet integration and flow: 10 hrs


## UI/UX polish, support for external wallets, ephemeral wallet, and handoff flow(January 16th, 2019 to February 7th, 2019)

### Handoff flow design and implementation 40 hours

- [ ] Designer review dummy interface and mockup wallet pairing interface: 10hrs
- [ ] Hook up wallet pairing interface: 10 hrs
- [ ] Create user education tutorial/walkthrough: 10 hrs
- [ ] Ensure tutorial/walkthrough displays and routes properly on all devices:10 hrs


### Ephemeral wallet integration (continued form xDai/denDai integration in phase 1):24 hours

- [ ] Ask for public key after registration: 4 hrs
- [ ] Setup monitoring for main-net and side-chains: 10 hrs
- [ ] Test xDAI/DenDAI/DAI settlement: 10 hrs


### Create a way to monitor transactions for multi-seller setup: 20 hours

- [ ] Establish relationship between multi-seller users: 10 hrs
- [ ] Give vendor visibility and controls for multi-seller transactions: 10hrs


### Expected issues: 40 hours

- [ ] Figure out how to handle role management with ephemeral wallets (maybe critical use case for naive POS operators): 10 hrsFigure out how to handle and fund side chain operations: 10 hrs
- [ ] Engage consultant (Austin Griffith) at beginning of phase 2: 10 hrs
- [ ] Plan and pivot according to consultant feedback: 10 hrs


## Devops maintenance of backend services (January 16th, 2019 to December 31st,2019)

### Creation of CI/CD pipelines for maintenance and further updates: 20 hours

- [ ] Setup the server and integration pipeline: 10 hrs
- [ ] Setup SSL certificates, automated tests runs, coverage reports: 10 hrs


### Ongoing app monitoring, logging, load balancing: 20 hours

- [ ] Setup bug monitoring interface or service (e.g., Rollbar, Bugsnag): 10 hrs
- [ ] Setup horizontal scaling/load balancing: 10 hrs

[Back to Top](Scope.md#daipos-scope)
