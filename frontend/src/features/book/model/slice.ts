import { createSlice } from '@reduxjs/toolkit';
import { deleteBookThunk } from 'features/book/thunks/deleteBooks';
import type { Book } from 'shared/api/endpoints/book/types';

import { BOOK_ERRORS } from '../lib/utils';
import { fetchBookById, fetchBooks } from '../thunks/fetchBooks';
import { publishBookThunk } from '../thunks/publishBook';
import { updateBookThunk } from '../thunks/updateBook';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type BooksState = {
  list: {
    items: Book[];
    totalCount: number;
    status: RequestStatus;
    error: string | null;
  };
  details: {
    item: Book | null;
    status: RequestStatus;
    error: string | null;
  };
  mutations: {
    createStatus: RequestStatus;
    updateStatus: RequestStatus;
    deleteStatus: RequestStatus;
    error: string | null;
  };
};

const initialState: BooksState = {
  list: {
    items: [],
    totalCount: 0,
    status: 'idle',
    error: null,
  },
  details: {
    item: null,
    status: 'idle',
    error: null,
  },
  mutations: {
    createStatus: 'idle',
    updateStatus: 'idle',
    deleteStatus: 'idle',
    error: null,
  },
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearListError: (state) => {
      state.list.error = null;
    },
    clearDetailsError: (state) => {
      state.details.error = null;
    },
    clearMutationError: (state) => {
      state.mutations.error = null;
    },
    clearSelectedBook: (state) => {
      state.details.item = null;
      state.details.status = 'idle';
      state.details.error = null;
    },
    resetMutationStatuses: (state) => {
      state.mutations.createStatus = 'idle';
      state.mutations.updateStatus = 'idle';
      state.mutations.deleteStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchBooks.pending, (state) => {
        state.list.status = 'loading';
        state.list.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.list.status = 'succeeded';
        state.list.items = action.payload.books;
        state.list.totalCount = action.payload.totalCount;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.list.status = 'failed';
        state.list.error = action.payload ?? BOOK_ERRORS.FETCH_LIST;
      })

      .addCase(fetchBookById.pending, (state) => {
        state.details.status = 'loading';
        state.details.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.details.status = 'succeeded';
        state.details.item = action.payload;

        const exists = state.list.items.some(
          (book) => book.id === action.payload.id
        );

        if (!exists) {
          state.list.items.push(action.payload);
          state.list.totalCount += 1;
        }
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.details.status = 'failed';
        state.details.error = action.payload ?? BOOK_ERRORS.FETCH_DETAILS;
      })

      .addCase(publishBookThunk.pending, (state) => {
        state.mutations.createStatus = 'loading';
        state.mutations.error = null;
      })
      .addCase(publishBookThunk.fulfilled, (state, action) => {
        state.mutations.createStatus = 'succeeded';
        state.list.items.unshift(action.payload);
        state.list.totalCount += 1;
      })
      .addCase(publishBookThunk.rejected, (state, action) => {
        state.mutations.createStatus = 'failed';
        state.mutations.error = action.payload ?? BOOK_ERRORS.CREATE;
      })

      .addCase(updateBookThunk.pending, (state) => {
        state.mutations.updateStatus = 'loading';
        state.mutations.error = null;
      })
      .addCase(updateBookThunk.fulfilled, (state, action) => {
        state.mutations.updateStatus = 'succeeded';

        state.list.items = state.list.items.map((book) =>
          book.id === action.payload.id ? action.payload : book
        );

        if (state.details.item?.id === action.payload.id) {
          state.details.item = action.payload;
        }
      })
      .addCase(updateBookThunk.rejected, (state, action) => {
        state.mutations.updateStatus = 'failed';
        state.mutations.error = action.payload ?? BOOK_ERRORS.UPDATE;
      })

      // ===== DELETE =====
      .addCase(deleteBookThunk.pending, (state) => {
        state.mutations.deleteStatus = 'loading';
        state.mutations.error = null;
      })
      .addCase(deleteBookThunk.fulfilled, (state, action) => {
        state.mutations.deleteStatus = 'succeeded';

        state.list.items = state.list.items.filter(
          (book) => book.id !== action.payload.bookId
        );

        state.list.totalCount = Math.max(0, state.list.totalCount - 1);

        if (state.details.item?.id === action.payload.bookId) {
          state.details.item = null;
        }
      })
      .addCase(deleteBookThunk.rejected, (state, action) => {
        state.mutations.deleteStatus = 'failed';
        state.mutations.error = action.payload ?? BOOK_ERRORS.DELETE;
      });
  },
});

export const {
  clearListError,
  clearDetailsError,
  clearMutationError,
  clearSelectedBook,
  resetMutationStatuses,
} = booksSlice.actions;

export const booksReducer = booksSlice.reducer;
