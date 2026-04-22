import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteBook } from 'shared/api/endpoints/book/endpoints';
import type { DeleteBookParams } from 'shared/api/endpoints/book/types';

export const deleteBookThunk = createAsyncThunk(
  'books/deleteBook',
  async ({ bookId }: DeleteBookParams, { rejectWithValue }) => {
    try {
      await deleteBook({ bookId });
      return { bookId };
    } catch (error) {
      return rejectWithValue('Ошибка удаления книги');
    }
  }
);
