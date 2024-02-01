import React, { ReactNode } from 'react';

import { render, RenderOptions } from '@testing-library/react';
import { DeepPartial } from 'react-hook-form';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import i18nTests from '@/shared/config/i18n/i18nForTests';

export interface ComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
}

interface TestProviderProps {
  children: ReactNode;
  options?: ComponentRenderOptions;
}

const TestProvider = (props: TestProviderProps) => {
  const { children, options = {} } = props;

  const { route = '/', initialState } = options;

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState as StateSchema}>
        <I18nextProvider i18n={i18nTests}>{children}</I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
};

export function componentRender(
  component: React.ReactElement,
  options: ComponentRenderOptions = {},
  renderOptions?: RenderOptions,
) {
  return render(
    <TestProvider options={options}>{component}</TestProvider>,
    renderOptions,
  );
}
