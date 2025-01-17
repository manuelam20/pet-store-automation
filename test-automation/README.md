# Test Automation with Playwright

This repository contains the implementation of test automation using **Playwright**. The following document provides an overview of the solution, its structure, and instructions to set up and execute the tests.

---

## **Solution Overview**

The solution leverages **Playwright** to automate API requests for Swagger Pet store project. The test scripts are written in **TypeScript** and organized for clarity and maintainability.


---

## **Repository Structure**

```
/playwright-tests
├── README.md              # Documentation for the project
├── playwright.config.ts   # Playwright configuration file
├── package.json           # Dependencies and scripts
├── tests/                 # Folder containing test cases
│   ├── *.api.spec.ts      # Tests for user-related endpoints
│   └── ...

```

---

## **Getting Started**

### Prerequisites

Ensure you have the following installed:
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd test-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```


---

## **Running the Tests**

### Execute All Tests
Run all test cases in the project:
```bash
npx playwright test
```

### Run a Specific Test File
To run a specific test file:
```bash
npx playwright test tests/example.spec.ts
```

### Debugging Tests
For debugging, use:
```bash
npx playwright test --headed --debug
```

### View Test Reports
Playwright generates test reports automatically. To view them:
```bash
npx playwright show-report
```

---

## **Configuration**

The `playwright.config.ts` file includes configurable options like:
- Test directory
- Browser options
- Retry policies
- Reporters (e.g., HTML, JSON)

---

## **Contact**

If you have any questions or issues, feel free to contact the repository maintainer.

---


