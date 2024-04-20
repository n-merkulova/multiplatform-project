import React from 'react';

const PlatformStoreContext = React.createContext<Platform | null>(null);

export const PlatformStoreContextProvider: React.FC<
  React.PropsWithChildren<{ platform: Platform }>
> = ({ platform, children }) => (
  <PlatformStoreContext.Provider value={platform}>
    {children}
  </PlatformStoreContext.Provider>
);

export const usePlatformStore = (): Platform | null =>
  React.useContext(PlatformStoreContext);
