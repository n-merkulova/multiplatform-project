import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PlatformStoreContextProvider } from 'stores/platform';
import { PLATFORMS_ROUTER_BASENAMES, ROUTES } from 'config/routing';

import './styles/global.scss';

type AppProps = {
  platform: Platform;
};

const App: React.FC<AppProps> = ({ platform }: AppProps) => {
  return (
    <React.StrictMode>
      <PlatformStoreContextProvider platform={platform}>
        <RouterProvider
          router={createBrowserRouter(ROUTES, {
            basename: PLATFORMS_ROUTER_BASENAMES[platform],
          })}
        />
      </PlatformStoreContextProvider>
    </React.StrictMode>
  );
};

export default App;
