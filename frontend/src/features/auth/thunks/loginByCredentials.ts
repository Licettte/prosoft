import { createAsyncThunk } from '@reduxjs/toolkit'

import type { ResponseErrorBody } from 'shared/api/types'
import {authenticateUser, AuthenticateUserRequest, AuthorizedUser} from "shared/api/endpoints/auth";

export const loginByCredentials = createAsyncThunk<
  AuthorizedUser,
  AuthenticateUserRequest,
  { rejectValue: string }
>('auth/loginByCredentials', async (credentials, thunkApi) => {
  try {
    return await authenticateUser(credentials)
  } catch (error) {
    const apiError = error as ResponseErrorBody
    return thunkApi.rejectWithValue(
      apiError.message ?? 'Не удалось выполнить вход',
    )
  }
})
