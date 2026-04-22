export const UserRole = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export type AuthorizedUser = {
  login: string;
  role: UserRole;
  created_at: string;
};

export type LoginPayload = {
  login: string;
  password: string;
};

export type AuthenticateUserRequest = {
  login: string;
  password: string;
};

export const AuthStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  AUTHORIZED: 'authorized',
  UNAUTHORIZED: 'unauthorized',
} as const;

export type AuthStatus = (typeof AuthStatus)[keyof typeof AuthStatus];

export type AuthSchema = {
  currentUser: AuthorizedUser | null;
  authStatus: AuthStatus;
  isAuthInitialized: boolean;
  authErrorMessage: string | null;
};
