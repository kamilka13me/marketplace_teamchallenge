import './index.css';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';

import ErrorBoundary from '@/app/providers/ErrorBoundary/ui/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';

import '@/shared/config/i18n/i18n';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
          <App />
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>
  </HelmetProvider>,
);
