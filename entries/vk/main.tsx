import { startApp } from '../../src/main';

import { VKBridge } from './types';
import { configureViewSettings } from './utils';

declare global {
  const vkBridge: VKBridge;
}

const startVkApp = () => {
  vkBridge.send('VKWebAppInit', {}).then(() => {
    configureViewSettings(vkBridge);
    startApp('vk');
  });
};

startVkApp();
