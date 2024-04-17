import { RequestPropsMap, VKBridge } from './types';

const VIEW_SETTINGS: RequestPropsMap['VKWebAppSetViewSettings'] = {
  status_bar_style: 'dark',
  action_bar_color: '#FFF',
  navigation_bar_color: '#FFF',
};

export const configureViewSettings = (vkBridge: VKBridge) => {
  if (!vkBridge.supports('VKWebAppSetViewSettings')) {
    return;
  }

  const setViewSettings = () => {
    vkBridge.send('VKWebAppSetViewSettings', VIEW_SETTINGS);
  };

  setViewSettings();

  vkBridge.subscribe((event: { detail: { type: string } }) => {
    if (event.detail.type === 'VKWebAppViewRestore') {
      setViewSettings();
    }
  });
};
