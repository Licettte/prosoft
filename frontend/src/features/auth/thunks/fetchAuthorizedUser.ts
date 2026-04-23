import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthorizedUser } from 'shared/api/endpoints/auth';
import { getAuthorizedUser } from 'shared/api/endpoints/auth';
import type { ResponseErrorBody } from 'shared/api/types';

export const fetchAuthorizedUser = createAsyncThunk<
  AuthorizedUser,
  void,
  { rejectValue: string }
>('auth/fetchAuthorizedUser', async (_, thunkApi) => {
  try {
    return await getAuthorizedUser();
  } catch (error) {
    const apiError = error as ResponseErrorBody;

    return thunkApi.rejectWithValue(
      apiError.message ?? 'Пользователь не авторизован'
    );
  }
});
