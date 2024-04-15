import * as React from 'react';

type AppProps = {
  platform: Platform;
};

const App: React.FC<AppProps> = ({ platform }: AppProps) => {
  return <div>{platform}</div>;
};

export default App;
