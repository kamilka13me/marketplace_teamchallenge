import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import App from './app/App';
import SafariPlaceholder from './app/providers/SafariPlaceholder/SafariPlaceholder';

import ErrorBoundary from '@/app/providers/ErrorBoundary/ui/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';

import '@/shared/config/i18n/i18n';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Container root is not found. Can`t create react App');
}

const root = createRoot(container);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <StoreProvider>
        <ErrorBoundary>
          <SafariPlaceholder>
            <App />
          </SafariPlaceholder>
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>
  </HelmetProvider>,
);
