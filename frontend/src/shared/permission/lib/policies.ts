import { UserRole } from '../../api/endpoints/auth';
import { getPermissions, Permission } from '../rolePermissions';

export const hasPermission = (
  role: UserRole | undefined,
  permission: Permission
): boolean => {
  return getPermissions(role).includes(permission);
};

export const canViewBooksCatalog = (role: UserRole | undefined): boolean =>
  hasPermission(role, Permission.VIEW_BOOKS_CATALOG);

export const canViewBookDetails = (role: UserRole | undefined): boolean =>
  hasPermission(role, Permission.VIEW_BOOK_DETAILS);

export const canAddBooks = (role: UserRole | undefined): boolean =>
  hasPermission(role, Permission.ADD_BOOKS);

export const canEditBooks = (role: UserRole | undefined): boolean =>
  hasPermission(role, Permission.EDIT_BOOKS);

export const canDeleteBooks = (role: UserRole | undefined): boolean =>
  hasPermission(role, Permission.DELETE_BOOKS);
