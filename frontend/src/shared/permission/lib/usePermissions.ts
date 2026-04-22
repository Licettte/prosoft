import { authModel } from 'features/auth';
import { useMemo } from 'react';
import { useAppSelector } from 'shared/lib/hooks/typedRedux';
import { getPermissions, Permission } from 'shared/permission/rolePermissions';

export const usePermissions = () => {
  const role = useAppSelector(authModel.selectors.selectCurrentUserRole);

  const permissions = useMemo(() => getPermissions(role), [role]);

  const hasPermission = (permission: Permission) =>
    permissions.includes(permission);

  return {
    role,
    permissions,
    hasPermission,
    canViewBooksCatalog: hasPermission(Permission.VIEW_BOOKS_CATALOG),
    canViewBookDetails: hasPermission(Permission.VIEW_BOOK_DETAILS),
    canAddBooks: hasPermission(Permission.ADD_BOOKS),
    canEditBooks: hasPermission(Permission.EDIT_BOOKS),
    canDeleteBooks: hasPermission(Permission.DELETE_BOOKS),
  };
};
