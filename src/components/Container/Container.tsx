import * as React from 'react';

import s from './Container.module.scss';

export const Container: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className={s.container}>{children}</div>
);
