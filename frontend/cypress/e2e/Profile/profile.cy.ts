import { getRouteProfile } from '../../../src/shared/const/routes';

describe('User go to profile page as Default user', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login('cypresstestacc@peach.com', 'Y12345678').then(() => {
      cy.visit(getRouteProfile('info'));
    });
  });

  it('User edit profile fields', () => {
    cy.updateProfileInfo();
    cy.get('input[name="inputName"]').should('have.value', 'Cypre');
    cy.get('input[name="inputSurname"]').should('have.value', 'CypressTst');
    cy.get('input[name="inputDateBirth"]').should('have.value', '12.12.2001');
    cy.resetProfileInfo();
  });

  it('User update password', () => {
    cy.updateProfilePassword();
    cy.clearCookies();
    cy.visit('');
    cy.login('cypresstestacc@peach.com', 'U12345678').then(() => {
      cy.visit(getRouteProfile('info'));
    });
    cy.resetProfilePassword();
    cy.login('cypresstestacc@peach.com', 'Y12345678').then(() => {
      cy.visit(getRouteProfile('info'));
    });
  });
});
