import type { Preview } from '@storybook/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../src/index.css';
import { BrowserRouter } from 'react-router-dom';
import StoreProvider from '../src/app/providers/StoreProvider/ui/StoreProvider';
import { Suspense } from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <StoreProvider>
        <BrowserRouter>
          <Suspense>
            <Story />
          </Suspense>
        </BrowserRouter>
      </StoreProvider>
    ),
  ],
};

export default preview;
