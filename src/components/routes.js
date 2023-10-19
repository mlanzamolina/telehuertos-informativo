import React, { lazy } from 'react';

const List = lazy(() => import('./List'));
const Details = lazy(() => import('./Details'));

const routes = [
  {
    path: '/list',
    exact: true,
    element: <List />,
  },
  {
    path: '/details/:id',
    exact: true,
    element: <Details />,
  },
];

export default routes;
