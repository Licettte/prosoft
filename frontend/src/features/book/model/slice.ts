import { createSlice } from '@reduxjs/toolkit';
import { deleteBookThunk } from 'features/book/thunks/deleteBooks';
import type { Book } from 'shared/api/endpoints/book/types';

import { fetchBookById, fetchBooks } from '../thunks/fetchBooks';
import { publishBookThunk } from '../thunks/publishBook';
import { updateBookThunk } from '../thunks/updateBook';

export type BooksState = {
  books: Book[];
  selectedBook: Book | null;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: BooksState = {
  books: [],
  selectedBook: null,
  totalCount: 0,
  isLoading: false,
  error: null,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearBooksError: (state) => {
      state.error = null;
    },
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload.books;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? 'Ошибка загрузки книг';
      })

      .addCase(fetchBookById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedBook = action.payload;

        const exists = state.books.some(
          (book) => book.id === action.payload.id
        );
        if (!exists) {
          state.books.push(action.payload);
        }
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? 'Ошибка загрузки книги';
      })

      .addCase(publishBookThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(publishBookThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books.unshift(action.payload);
        state.totalCount += 1;
      })
      .addCase(publishBookThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? 'Ошибка публикации книги';
      })

      .addCase(updateBookThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBookThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        state.books = state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        );

        if (state.selectedBook?.id === action.payload.id) {
          state.selectedBook = action.payload;
        }
      })
      .addCase(updateBookThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? 'Ошибка обновления книги';
      })

      .addCase(deleteBookThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBookThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = state.books.filter(
          (book) => book.id !== action.payload.bookId
        );
        state.totalCount -= 1;

        if (state.selectedBook?.id === action.payload.bookId) {
          state.selectedBook = null;
        }
      })
      .addCase(deleteBookThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? 'Ошибка удаления книги';
      });
  },
});

export const { clearBooksError, clearSelectedBook } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
