/// <reference types="cypress" />

import { USER_CREDENTIALS } from './mocks';

describe('Campain details page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('Should be render logo image', () => {
    cy.get('[data-testid=logo-image]').should('be.visible');
  });

  it('Should be render signIn form', () => {
    cy.get('[data-testid=email-input]').should('exist');
    cy.get('[data-testid=password-input]').should('exist');
    cy.get('[data-testid=signIn-button]').should('exist');
  });

  it('Should successfully sign in and redirect to dashboard page', () => {
    cy.url().should('include', `/`);

    cy.get('[data-testid=signIn-form]').should('be.visible');
    cy.get('[data-testid=email-input]').should('be.visible');
    cy.get('[data-testid=password-input]').should('be.visible');
    cy.get('[data-testid=signIn-button]').should('be.visible');

    cy.get('[data-testid=email-input]').type(USER_CREDENTIALS.email);
    cy.get('[data-testid=password-input]').type(USER_CREDENTIALS.password);
    cy.get('[data-testid=signIn-button]').click();

    cy.url().should('include', '/dashboard');
  });
});
