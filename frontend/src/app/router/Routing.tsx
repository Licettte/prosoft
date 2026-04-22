import { BookRoutes } from 'pages/router/BookRoutes';
import { LoginRoutes } from 'pages/router/LoginRoutes';
import { NotFoundRoutes } from 'pages/router/NotFoundRoutes';
import { RootRoutes } from 'pages/router/RootRoutes';
import { Routes } from 'react-router-dom';

export const Routing = () => (
  <Routes>
    {RootRoutes}
    {LoginRoutes}
    {BookRoutes()}
    {NotFoundRoutes}
  </Routes>
);
