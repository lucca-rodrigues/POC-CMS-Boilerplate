<div align="center">
  <h3 align="center">Boilerplate - Frontend</h3>

  <img src="https://img.shields.io/badge/package_version-0.1.0-blue" alt="Package Version" />
  <img src="https://img.shields.io/badge/node_version-21.0.0-brightgreen" alt="Node Version" />
  <img src="https://img.shields.io/badge/react-18.3.1-blue" alt="React Version" />
  <br />
  <br />
</div>

# Documentação da Estrutura do Projeto Front-End

- [Introduction](#introduction)
- [Packages](#packages)
- [Installation](#installation)
- [Project Execution](#project-execution)
- [Folder Organization](#folder-organization)
- [Styling](#styling)
- [Commits](#commits)
- [Tests](#tests)

## Introduction

This documentation describes the structure of the front-end project, including its folder organization, development flow, required packages, and instructions for running and testing.

## Packages

The project requires minimum Node.js version 21 >

## Project Execution

To run the project locally, follow these steps:

- Run `npm install` or `yarn` to install dependencies.
- Run `npm run dev` or `yarn dev` to start the project.

## Folder Organization

- Pages: Contains the application pages, including subfolders:
- Functions: Logic and API calls specific to each page.
- Hooks: Custom hooks for reusing logic and API calls.
- Template: Reusable page templates.
- Index: Main file that exports shared components and props.
- Context: Contains contexts used in requests that are shared across multiple locations in the application.
- Domain: Contains services related to the application domain.
- Components: Reusable global components.

```
├── node_modules/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ ├── contexts/
│ ├── domain/
│ ├── infra/
│ ├── pages/
│ │ ├── functions/
│ │ ├── hooks/
│ │ ├── mocks/
│ │ ├── components/
│ │ ├── template/
│ │ └── Index.js
├── routes
├── .gitignore
├── package.json
├── README.md
```

## Commits

- Use `npm run commit` or `yarn commit` to commit according to commitlint rules.

## Tests

- Run `npm run test` or `yarn test` to run all tests.
- Run `npm run test:watch` or `yarn test:watch` to run the tests in watch mode.
- Run `npm run test:cypress` or `yarn test:cypress` to run end-to-end tests with Cypress.

### Generate new folders in the architecture

- Run `npm run gen` to generate module and next insert your module name
