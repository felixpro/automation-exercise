# Automation Exercise

This repository contains Cypress tests for [your application name].

## Table of Contents

- [Running the Cypress Tests Locally](#running-the-cypress-tests-locally)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Tests](#running-tests)
- [GitHub Actions](#github-actions)
  - [Workflow Configuration](#workflow-configuration)
  - [Viewing Workflow Results](#viewing-workflow-results)

## Running the Cypress Tests Locally

To run the Cypress tests locally, follow these steps:

### Prerequisites

- Node.js installed on your machine
- npm or yarn package manager

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/felixpro/automation-exercise.git
   ```

2. Navigate into the cloned repository directory:

   ```bash
   cd automation-exercise
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running Tests

You can run the Cypress tests in either of the following ways:

- **Interactive mode**: Opens the Cypress Test Runner UI where you can select and run tests interactively.

  ```bash
  npm run cy:open
  ```

- **Headless mode**: Runs Cypress tests in headless mode (without UI) and generates reports.

  ```bash
  npm run cy:run
  ```

## GitHub Actions

This repository is set up to run Cypress tests automatically on every commit using GitHub Actions.

### Workflow Configuration

The workflow is defined in `.github/workflows/cypress_tests.yml`. It is triggered on every push to the main branch and executes the Cypress tests using the `npm run cy:run` command.

### Viewing Workflow Results

After pushing changes to your repository, navigate to the "Actions" tab on GitHub to view the workflow runs. You'll see the status of each workflow run and can inspect the logs to troubleshoot any issues.
