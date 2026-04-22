import { authModel } from 'features/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { APP_ROUTES } from 'shared/config/appRoutes';
import { useAppSelector } from 'shared/lib/hooks/typedRedux';

type ProtectedRouteProps = {
  hasPermission?: boolean;
  redirectTo?: string;
};

export const ProtectedRoute = ({
  hasPermission = true,
  redirectTo = APP_ROUTES.BOOKS.LIST,
}: ProtectedRouteProps) => {
  const isAuthorized = useAppSelector(
    authModel.selectors.selectIsAuthenticated
  );

  if (!isAuthorized) {
    return <Navigate to={APP_ROUTES.AUTH.LOGIN} replace />;
  }

  if (!hasPermission) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
