import { createSelector } from '@reduxjs/toolkit'
import {RootState} from "app/store";

export const selectAuthState = (state: RootState) => state.auth

export const selectCurrentUser = createSelector(
  selectAuthState,
  (authState) => authState.currentUser,
)

export const selectAuthStatus = createSelector(
  selectAuthState,
  (authState) => authState.authStatus,
)

export const selectIsAuthInitialized = createSelector(
  selectAuthState,
  (authState) => authState.isAuthInitialized,
)

export const selectAuthErrorMessage = createSelector(
  selectAuthState,
  (authState) => authState.authErrorMessage,
)

export const selectIsAuthenticated = createSelector(
  selectCurrentUser,
  (currentUser) => currentUser !== null,
)

export const selectCurrentUserRole = createSelector(
  selectCurrentUser,
  (currentUser) => currentUser?.role ?? undefined,
)
