import { createAsyncThunk } from '@reduxjs/toolkit';
import { BOOK_ERRORS } from 'features/book/lib/utils';
import { getBook, getBooks } from 'shared/api/endpoints/book/endpoints';
import type {
  Book,
  GetBookParams,
  GetBooksRequest,
  GetBooksResponse,
} from 'shared/api/endpoints/book/types';

export const fetchBooks = createAsyncThunk<
  GetBooksResponse,
  GetBooksRequest | undefined,
  { rejectValue: string }
>('books/fetchBooks', async (params, { rejectWithValue }) => {
  try {
    return await getBooks(params);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue(BOOK_ERRORS.FETCH_LIST);
  }
});

export const fetchBookById = createAsyncThunk<
  Book,
  GetBookParams,
  { rejectValue: string }
>('books/fetchBookById', async ({ bookId }, { rejectWithValue }) => {
  try {
    return await getBook({ bookId });
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue(BOOK_ERRORS.FETCH_DETAILS);
  }
});
