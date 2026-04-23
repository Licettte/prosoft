import { authModel } from 'features/auth';
import { useAppSelector } from 'shared/lib/hooks/typedRedux';

import * as policies from './policies';

export const usePermissions = () => {
  const role = useAppSelector(authModel.selectors.selectCurrentUserRole);

  return {
    role,
    canViewBooksCatalog: policies.canViewBooksCatalog(role),
    canViewBookDetails: policies.canViewBookDetails(role),
    canAddBooks: policies.canAddBooks(role),
    canEditBooks: policies.canEditBooks(role),
    canDeleteBooks: policies.canDeleteBooks(role),
  };
};
