import * as React from 'react';
import { createRoot } from 'react-dom/client';

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
    <App platform={platform} />
  );
};

export const startApp = (platform: Platform) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => renderApp(platform));
  } else {
    renderApp(platform);
  }
};
