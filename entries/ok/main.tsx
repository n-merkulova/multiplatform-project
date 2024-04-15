import { startApp } from '../../src/main';

import { OKMiniApp } from './types';

declare global {
  const FAPI: OKMiniApp.FAPI;
  const auth_params: OKMiniApp.FAPIAuthParams;

  interface Window {
    API_callback: OKMiniApp.FAPIApiCallback;
  }
}

const startOkApp = () => {
  window.API_callback = (method, result, data) => {};

  const requestParams = FAPI.Util.getRequestParameters();
  FAPI.init(requestParams.api_server, requestParams.apiconnection, () => {
    startApp('ok');
  });
};

startOkApp();
