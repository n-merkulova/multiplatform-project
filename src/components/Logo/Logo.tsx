import * as React from 'react';

import logoImage from './images/logo.png';

import s from './Logo.module.scss';

export const Logo: React.FC = () => {
  return <img className={s.logo} src={logoImage} alt="KTS" />;
};
