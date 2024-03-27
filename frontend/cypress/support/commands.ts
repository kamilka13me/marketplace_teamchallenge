/// <reference types="cypress" />

import { login } from './commands/login';
import * as profileCommands from './commands/profile';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
Cypress.Commands.add('login', login);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
Cypress.Commands.addAll('profileCommands', profileCommands);
