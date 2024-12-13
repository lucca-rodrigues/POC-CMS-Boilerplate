import { USER_CREDENTIALS } from '../mocks';

export function setTokenData() {
  cy.setCookie('token', USER_CREDENTIALS?.token);
}
