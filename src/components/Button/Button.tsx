import * as React from 'react';

import s from './Button.module.scss';

type ButtonProps = React.PropsWithChildren<{
  onClick: VoidFunction;
}>;

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <div className={s.button} onClick={onClick}>
      {children}
    </div>
  );
};
