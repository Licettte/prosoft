import { LoginPage } from 'pages/login/ui/LoginPage';
import { Route } from 'react-router-dom';
import { APP_ROUTES } from 'shared/config/appRoutes';

export const LoginRoutes = (
  <Route path={APP_ROUTES.AUTH.LOGIN} element={<LoginPage />} />
);
