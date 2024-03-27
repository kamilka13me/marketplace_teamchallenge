import { LoginResponse } from '../../../src/enteties/User';
import { COOKIE_KEY_TOKEN, COOKIE_KEY_USER } from '../../../src/shared/const/cookies';

export const login = (email?: string, password?: string) => {
  return cy
    .request({
      method: 'POST',
      url: '/api/auth/',
      body: {
        email,
        password,
      },
    })
    .then(({ body }) => {
      cy.setCookie(COOKIE_KEY_USER, JSON.stringify(body.user));
      cy.setCookie(COOKIE_KEY_TOKEN, body.accessToken);
    });
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<LoginResponse>;
    }
  }
}
