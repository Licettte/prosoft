import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { APP_ROUTES } from 'shared/config/appRoutes';

const NotFound = lazy(async () => await import('../notFound'));

export const NotFoundRoutes = (
  <Route
    path={APP_ROUTES.NOT_FOUND}
    element={
      <Suspense fallback={'...Загрузка'}>
        <NotFound />
      </Suspense>
    }
  />
);
