export const updateProfileInfo = () => {
  cy.get('input[name="inputName"]').clear().type('Cypre');
  cy.get('input[name="inputSurname"]').clear().type('CypressTst');
  cy.get('input[name="inputDateBirth"]').clear().type('12122001');
  cy.contains('button', 'Зберегти').click();
};

export const updateProfilePassword = () => {
  cy.get('input[name="inputOldPassword"]').clear().type('Y12345678');
  cy.get('input[name="inputNewPassword"]').clear().type('U12345678');
  cy.get('input[name="inputConfirmationPassword"]').clear().type('U12345678');
  cy.contains('button', 'Зберегти').click();
};

export const resetProfileInfo = () => {
  return cy.request({
    method: 'PUT',
    url: '/api/users',
    body: {
      username: 'Cypress',
      surname: '',
      dob: '',
      phoneNumber: '',
    },
  });
};

export const resetProfilePassword = () => {
  return cy.request({
    method: 'PUT',
    url: '/api/users/password',
    body: {
      oldPassword: 'U12345678',
      newPassword: 'Y12345678',
    },
  });
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      updateProfileInfo(): Chainable<void>;

      updateProfilePassword(): Chainable<void>;

      resetProfileInfo(): Chainable<void>;

      resetProfilePassword(): Chainable<void>;
    }
  }
}
