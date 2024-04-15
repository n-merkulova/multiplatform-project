import { startApp } from '../../src/main';

import { VKBridge } from './types';

declare global {
  const vkBridge: VKBridge;
}

const viewSettings = {
  status_bar_style: 'dark',
  action_bar_color: '#FFF',
  navigation_bar_color: '#FFF',
};

const startVkApp = () => {
  const setViewSettings = () => {
    if (vkBridge.supports('VKWebAppSetViewSettings')) {
      vkBridge.send('VKWebAppSetViewSettings', viewSettings);
    }
  };

  const setViewSettingsOnViewRestore = () => {
    vkBridge.subscribe((event: { detail: { type: string } }) => {
      if (event.detail.type === 'VKWebAppViewRestore') {
        setViewSettings();
      }
    });
  };

  vkBridge.send('VKWebAppInit', {}).then(() => {
    startApp('vk');

    setViewSettings();
    setViewSettingsOnViewRestore();
  });
};

startVkApp();
