import { apiGet, apiPost } from '../../../baseApi';
import { AUTH_API_URLS } from '../getUrl';
import { AuthenticateUserRequest, AuthorizedUser } from '../types';

export const authenticateUser = (credentials: AuthenticateUserRequest) =>
  apiPost<AuthorizedUser, AuthenticateUserRequest>({
    url: AUTH_API_URLS.AUTHENTICATE_USER,
    body: credentials,
  });

export const getAuthorizedUser = () =>
  apiGet<AuthorizedUser>({
    url: AUTH_API_URLS.GET_AUTHORIZED_USER,
  });
