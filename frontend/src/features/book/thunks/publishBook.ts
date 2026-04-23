import { createAsyncThunk } from '@reduxjs/toolkit';
import { BOOK_ERRORS } from 'features/book/lib/utils';
import { publishBook } from 'shared/api/endpoints/book/endpoints';
import type { Book, PublishBookRequest } from 'shared/api/endpoints/book/types';

export const publishBookThunk = createAsyncThunk<
  Book,
  PublishBookRequest,
  { rejectValue: string }
>('books/publishBook', async (payload, { rejectWithValue }) => {
  try {
    return await publishBook(payload);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue(BOOK_ERRORS.CREATE);
  }
});
