import { UserRole } from 'shared/api/endpoints/auth';

export const Permission = {
  VIEW_BOOKS_CATALOG: 'view_books_catalog',
  VIEW_BOOK_DETAILS: 'view_book_details',
  ADD_BOOKS: 'add_book',
  EDIT_BOOKS: 'edit_books',
  DELETE_BOOKS: 'delete_books',
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];

export const permissionsByRole: Record<UserRole, Permission[]> = {
  [UserRole.USER]: [
    Permission.VIEW_BOOKS_CATALOG,
    Permission.VIEW_BOOK_DETAILS,
  ],

  [UserRole.ADMIN]: [
    Permission.VIEW_BOOKS_CATALOG,
    Permission.VIEW_BOOK_DETAILS,
    Permission.ADD_BOOKS,
    Permission.EDIT_BOOKS,
    Permission.DELETE_BOOKS,
  ],
};

export const getPermissions = (role?: UserRole): Permission[] => {
  if (!role) return [];
  return permissionsByRole[role] ?? [];
};
