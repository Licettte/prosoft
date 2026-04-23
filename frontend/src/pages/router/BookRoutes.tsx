import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { APP_ROUTES } from 'shared/config/appRoutes';
import { usePermissions } from 'shared/permission/lib/usePermissions';

import { ProtectedRoute } from './ProtectedRoute';

const BookListPage = lazy(async () => await import('../book/bookList'));
const BookCreatePage = lazy(async () => await import('../book/bookCreate'));
const BookDetailsPage = lazy(async () => await import('../book/bookDetails'));

export const BookRoutes = () => {
  const { canAddBooks } = usePermissions();

  return (
    <>
      <Route element={<ProtectedRoute />}>
        <Route path={APP_ROUTES.BOOKS.LIST} element={<BookListPage />} />
        <Route path={APP_ROUTES.BOOKS.DETAIL} element={<BookDetailsPage />} />
      </Route>

      <Route element={<ProtectedRoute hasPermission={canAddBooks} />}>
        <Route path={APP_ROUTES.BOOKS.CREATE} element={<BookCreatePage />} />
      </Route>
    </>
  );
};
