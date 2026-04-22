import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from "features/auth/model/slice";
import {booksReducer} from "features/book/model/slice";

export const store = configureStore({
  reducer: {
    book : booksReducer,
   auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
