import { startApp } from '../../src/main';

import { OKMiniApp } from './types';

declare global {
  const FAPI: OKMiniApp.FAPI;

  interface Window {
    API_callback: OKMiniApp.FAPIApiCallback;
  }
}

const initializeOkApp = async (): Promise<void> => {
  const requestParameters = FAPI.Util.getRequestParameters();

  return new Promise((resolve, reject) => {
    FAPI.init(
      requestParameters.api_server,
      requestParameters.apiconnection,
      resolve,
      reject
    );
  });
};

const startOkApp = () => {
  window.API_callback = (method, result, data) => {};
  initializeOkApp().then(() => startApp('ok'));
};

startOkApp();
