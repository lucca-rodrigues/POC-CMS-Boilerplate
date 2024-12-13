/// <reference types="cypress" />

import { setTokenData } from './functions/setTokenData';

describe('Dashboard page', () => {
  beforeEach(() => {
    // SET COOKIE INFOS
    setTokenData();

    cy.visit('http://localhost:5173/dashboard');
    cy.url().should('include', `/dashboard`);
  });

  it('Should render dashboard content', () => {
    cy.url().should('include', '/dashboard');

    cy.get('[data-testid=content-page]').should('be.visible');
    cy.get('h1').should('contain', 'Content, validations and rules here');
  });

  // it('Should display sidebar', () => {
  //   cy.url().should('include', '/dashboard');

  //   cy.get('.MuiGrid-root').should('be.visible');
  //   cy.get('.MuiList-root').should('be.visible');
  // });
});
