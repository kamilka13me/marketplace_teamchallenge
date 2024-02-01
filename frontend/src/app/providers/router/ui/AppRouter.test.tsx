import { screen } from '@testing-library/react';

import { AppRouter } from '@/app/providers/router';
import { User } from '@/enteties/User';
import { UserRoles } from '@/enteties/User/model/types/userRoles';
import { getRouteMain, getRouteProfile } from '@/shared/const/routes';
import { componentRender } from '@/shared/lib/tests/ComponentRender/ComponentRender';

describe('Test Routes', () => {
  test('Main Page should render', async () => {
    componentRender(<AppRouter />, {
      route: getRouteMain(),
    });

    const page = await screen.findByTestId('MainPage');

    expect(page).toBeInTheDocument();
  });
  test('Invalid path', async () => {
    componentRender(<AppRouter />, {
      route: '/invalid-route',
    });

    const page = await screen.findByTestId('NotFoundPage');

    expect(page).toBeInTheDocument();
  });
  test('If user not auth redirect to main', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile(),
      initialState: {
        user: {
          inited: true,
          authData: {} as User,
        },
      },
    });

    const page = await screen.findByTestId('MainPage');

    expect(page).toBeInTheDocument();
  });
  test('If user auth redirect to profile', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile(),
      initialState: {
        user: {
          inited: true,
          authData: { role: UserRoles.USER } as User,
        },
      },
    });

    const page = await screen.findByTestId('ProfilePage');

    expect(page).toBeInTheDocument();
  });
});
