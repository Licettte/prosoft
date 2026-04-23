import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteBook } from 'shared/api/endpoints/book/endpoints';
import type { DeleteBookParams } from 'shared/api/endpoints/book/types';

import { BOOK_ERRORS } from '../lib/utils';

export const deleteBookThunk = createAsyncThunk<
  { bookId: DeleteBookParams['bookId'] },
  DeleteBookParams,
  { rejectValue: string }
>('books/deleteBook', async ({ bookId }, { rejectWithValue }) => {
  try {
    await deleteBook({ bookId });
    return { bookId };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue(BOOK_ERRORS.DELETE);
  }
});
