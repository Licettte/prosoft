import { createAsyncThunk } from '@reduxjs/toolkit';
import { BOOK_ERRORS } from 'features/book/lib/utils';
import { updateBook } from 'shared/api/endpoints/book/endpoints';
import type { Book, UpdateBookParams } from 'shared/api/endpoints/book/types';

export const updateBookThunk = createAsyncThunk<
  Book,
  UpdateBookParams,
  { rejectValue: string }
>('books/updateBook', async (params, { rejectWithValue }) => {
  try {
    return await updateBook(params);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue(BOOK_ERRORS.UPDATE);
  }
});
