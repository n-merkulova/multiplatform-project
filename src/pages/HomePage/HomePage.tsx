import * as React from 'react';
import { useNavigate } from 'react-router';

import { Button, Container, Header, Logo } from 'components';
import { RoutePath } from 'config/routing';

import s from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const checkRouting = () => {
    navigate(RoutePath.test);
  };

  return (
    <Container>
      <Header />
      <div className={s['home-page']}>
        <Logo />
        <p className={s['description']}>
          Это пример мультиплафторменного приложения
        </p>
        <Button onClick={checkRouting}>Перейти на&nbsp;другую страницу</Button>
      </div>
    </Container>
  );
};
