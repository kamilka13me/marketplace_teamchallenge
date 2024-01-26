import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';

import ErrorBoundary from '@/app/providers/ErrorBoundary/ui/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';

import '@/shared/config/i18n/i18n';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Container root is not found. Can`t create react App');
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
);
