import { createAsyncThunk } from '@reduxjs/toolkit';
import { publishBook } from 'shared/api/endpoints/book/endpoints';
import { PublishBookRequest } from 'shared/api/endpoints/book/types';

export const publishBookThunk = createAsyncThunk(
  'books/publishBook',
  async (payload: PublishBookRequest, { rejectWithValue }) => {
    try {
      const response = await publishBook(payload);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка публикации книги');
    }
  }
);
