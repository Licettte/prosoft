import {
  selectAuthErrorMessage,
  selectAuthState,
  selectAuthStatus,
  selectCurrentUser,
  selectCurrentUserRole,
  selectIsAuthenticated,
  selectIsAuthInitialized,
} from 'features/auth/model/selectors';
import { authReducer, clearAuthErrorMessage } from 'features/auth/model/slice';
import { fetchAuthorizedUser } from 'features/auth/thunks/fetchAuthorizedUser';
import { loginByCredentials } from 'features/auth/thunks/loginByCredentials';

export const authModel = {
  reducer: authReducer,

  selectors: {
    selectAuthState,
    selectCurrentUser,
    selectCurrentUserRole,
    selectIsAuthenticated,
    selectIsAuthInitialized,
    selectAuthStatus,
    selectAuthErrorMessage,
  },

  thunks: {
    fetchAuthorizedUser,
    loginByCredentials,
  },

  actions: {
    clearAuthErrorMessage,
  },
} as const;
