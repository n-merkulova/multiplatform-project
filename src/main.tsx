import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { PLATFORMS_ROUTER_BASENAMES } from 'config/routing';

import App from './App';

const renderApp = (platform: Platform) => {
  if (process.env.NODE_ENV !== 'PRODUCTION') {
    try {
      import('eruda').then((module) => {
        module.default.init();
      });
    } catch (error) {}
  }

  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Router basename={PLATFORMS_ROUTER_BASENAMES[platform]}>
        <App platform={platform} />
      </Router>
    </React.StrictMode>
  );
};

export const startApp = (platform: Platform) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => renderApp(platform));
  } else {
    renderApp(platform);
  }
};
