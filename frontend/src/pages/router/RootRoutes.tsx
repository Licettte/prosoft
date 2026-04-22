import { Navigate, Route } from 'react-router-dom';
import { APP_ROUTES } from 'shared/config/appRoutes';

export const RootRoutes = (
  <Route
    path={APP_ROUTES.ROOT}
    element={<Navigate to={APP_ROUTES.AUTH.LOGIN} replace />}
  />
);
