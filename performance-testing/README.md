# k6 Performance Testing

This repository contains performance tests for the API endpoints using [k6](https://k6.io/), a modern load testing tool.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Running Tests](#running-tests)
  - [Run All Tests](#run-all-tests)

## Introduction

This project includes performance tests for APIs, written in JavaScript using k6. The tests measure the API's performance under different load conditions, validate response times, and check if the API can handle various scenarios (e.g., successful requests, failed requests).

## Installation

1. **Install k6**

   Follow the official k6 installation guide: https://k6.io/docs/getting-started/installation/

   Or use the following command to install via Homebrew (for macOS):

   ```bash
   brew install k6

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd performance-testing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

# Running Tests
## Run All Tests
To run all tests in the tests/ folder, use the following command:

 ```bash
npm run test
```
# Resolving Problems
If you get an error running npm run test related to permissions run the following command in the terminal to make the run-tests.sh script executable:

 ```bash
chmod +x run-tests.sh
```