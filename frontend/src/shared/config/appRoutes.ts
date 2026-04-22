export const APP_ROUTES = {
  ROOT: '/',
  AUTH: {
    LOGIN: '/login',
  },
  BOOKS: {
    LIST: '/books',
    CREATE: '/books/create',
    DETAIL: '/books/:id/detail',
  },
  NOT_FOUND: '*',
} as const;
