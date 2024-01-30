# Natech Test Suite

This repository contains end-to-end (e2e) tests using Playwright and Postman tests for the Natech application.

## Playwright E2E Tests

### Prerequisites

- Node.js and npm should be installed in the playwright-e2e directory.

### Installation

1. Clone this repository:

    ```bash
    git clone <repository-url>
    cd natech/playwright-e2e
    ```

2. Create a `credentials.json` file in the `playwright-e2e` directory with the necessary credentials for the tests using this syntax:
```json
{
    "username": "<username-provided-for-tests>",
    "password": "<password-provided-for-tests>",
    "greekFullName": "<fullName-provided-for-tests>",
    "vatNumber": "<account-owners-vat-number>"
}

3. Install dependencies:

    ```bash
    npm install
    ```

### Running Tests

Run the following command to execute the Playwright E2E tests:

```bash
npx playwright test
```


## Postman Tests

### Running Tests

You can run the Postman tests either via the command line or using the Postman application.

#### Command Line

1. Navigate to the `postmanTests` directory:

    ```bash
    cd natech/postmanTests
    ```

2. Run the following command to execute the Postman tests:

    ```bash
    newman run Natech.postman_collection.json
    ```

#### Postman Application

1. Open the Postman application.

2. Import the collection file located at `postmanTests/Natech.postman_collection.json`.

3. Run the collection within the Postman application.
