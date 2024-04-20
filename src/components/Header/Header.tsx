import * as React from 'react';

import { usePlatformStore } from 'stores/platform';
import { PLATFORM_IMAGES } from './config';

import s from './Header.module.scss';

export const Header: React.FC = () => {
  const platform = usePlatformStore();

  if (!platform) {
    return null;
  }

  return (
    <div className={s['header']}>
      <span>Платформа:</span>
      <img
        className={s['platform-image']}
        src={PLATFORM_IMAGES[platform]}
        alt={platform}
      />
    </div>
  );
};
