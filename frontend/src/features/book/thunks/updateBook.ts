import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateBook } from 'shared/api/endpoints/book/endpoints';
import { UpdateBookParams } from 'shared/api/endpoints/book/types';

export const updateBookThunk = createAsyncThunk(
  'books/updateBook',
  async (params: UpdateBookParams, { rejectWithValue }) => {
    try {
      const response = await updateBook(params);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка обновления книги');
    }
  }
);
