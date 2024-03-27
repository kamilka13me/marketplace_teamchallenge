import { getRouteProfile } from '../../../src/shared/const/routes';
import { getByTestId } from '../../helpers/getByTestId';

describe('Rounting', () => {
  describe('Public routes routes', () => {
    it('Visit main page', () => {
      cy.visit('/');
      cy.get(getByTestId('MainPage')).should('exist');
    });
    it('Visit 404 page', () => {
      cy.visit('/asdaasa404');
      cy.get(getByTestId('NotFoundPage')).should('exist');
    });
  });

  describe('User is NOT Authorized', () => {
    it('Visit profile page', () => {
      cy.visit(getRouteProfile('info'));
      cy.get(getByTestId('MainPage')).should('exist');
    });
  });

  describe('User is Authorized', () => {
    it('Visit profile page', () => {
      cy.login('cypresstestacc@peach.com', 'Y12345678');
      cy.visit(getRouteProfile('info'));
      cy.get(getByTestId('ProfilePage')).should('exist');
    });
  });
});
