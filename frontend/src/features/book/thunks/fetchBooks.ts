import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBook, getBooks } from 'shared/api/endpoints/book/endpoints';
import type {
  GetBookParams,
  GetBooksRequest,
  GetBooksResponse,
} from 'shared/api/endpoints/book/types';
import type { ResponseErrorBody } from 'shared/api/types';

export const fetchBooks = createAsyncThunk<
  GetBooksResponse,
  GetBooksRequest | undefined,
  { rejectValue: string }
>('books/fetchBooks', async (params, thunkApi) => {
  try {
    return await getBooks(params);
  } catch (error) {
    const apiError = error as ResponseErrorBody;

    return thunkApi.rejectWithValue(apiError.message ?? 'Ошибка загрузки книг');
  }
});

export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async ({ bookId }: GetBookParams, { rejectWithValue }) => {
    try {
      const response = await getBook({ bookId });
      return response;
    } catch {
      return rejectWithValue('Ошибка загрузки книги');
    }
  }
);
