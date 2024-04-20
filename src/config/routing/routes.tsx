import * as React from 'react';
import { RouteObject } from 'react-router';

import { TestPage } from 'pages/TestPage';
import { HomePage } from 'pages/HomePage';

import { RoutePath } from './pathes';

export const ROUTES: RouteObject[] = [
  {
    path: RoutePath.home,
    element: <HomePage />,
    index: true,
  },
  {
    path: RoutePath.test,
    element: <TestPage />,
  },
];
