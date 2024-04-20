import * as React from 'react';
import { useNavigate } from 'react-router';

import { Button, Container, Header } from 'components';

import s from './TestPage.module.scss';

export const TestPage: React.FC = () => {
  const navigate = useNavigate();

  const reload = () => {
    window.location.reload();
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Header />
      <div className={s['test-page']}>
        <Button onClick={reload}>Перезагрузить страницу</Button>
        <Button onClick={goBack}>Вернуться на&nbsp;предыдущую страницу</Button>
      </div>
    </Container>
  );
};
