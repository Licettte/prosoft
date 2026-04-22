import { createSlice } from '@reduxjs/toolkit'
import {loginByCredentials} from "features/auth/thunks/loginByCredentials";
import {fetchAuthorizedUser} from "features/auth/thunks/fetchAuthorizedUser";
import {AuthSchema, AuthStatus} from "shared/api/endpoints/auth";

const initialState: AuthSchema = {
  currentUser: null,
  authStatus: AuthStatus.IDLE,
  isAuthInitialized: false,
  authErrorMessage: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthErrorMessage: (state) => {
      state.authErrorMessage = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorizedUser.pending, (state) => {
        state.authStatus = AuthStatus.LOADING
        state.authErrorMessage = null
      })
      .addCase(fetchAuthorizedUser.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.authStatus = AuthStatus.AUTHORIZED
        state.isAuthInitialized = true
        state.authErrorMessage = null
      })
      .addCase(fetchAuthorizedUser.rejected, (state) => {
        state.currentUser = null
        state.authStatus = AuthStatus.UNAUTHORIZED
        state.isAuthInitialized = true
        state.authErrorMessage = null
      })

      .addCase(loginByCredentials.pending, (state) => {
        state.authStatus = AuthStatus.LOADING
        state.authErrorMessage = null
      })
      .addCase(loginByCredentials.fulfilled, (state, action) => {
        state.currentUser = action.payload
        state.authStatus = AuthStatus.AUTHORIZED
        state.isAuthInitialized = true
        state.authErrorMessage = null
      })
      .addCase(loginByCredentials.rejected, (state, action) => {
        state.currentUser = null
        state.authStatus = AuthStatus.UNAUTHORIZED
        state.isAuthInitialized = true
        state.authErrorMessage =
          action.payload ?? 'Не удалось выполнить вход'
      })

  },
})

export const { clearAuthErrorMessage } = authSlice.actions
export const authReducer = authSlice.reducer
