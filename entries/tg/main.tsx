import { startApp } from '../../src/main';

import { TelegramMiniApp } from './types';

declare global {
  const Telegram: TelegramMiniApp.SDK;
}

const startTgApp = () => {
  Telegram.WebApp.enableClosingConfirmation();
  Telegram.WebApp.expand();

  Telegram.WebApp.ready();

  startApp('tg');
};

startTgApp();
