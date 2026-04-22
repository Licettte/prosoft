import {
  selectBookById,
  selectBooks,
  selectBooksError,
  selectBooksLoading,
} from 'features/book/model/selectors';
import { clearSelectedBook } from 'features/book/model/slice';
import { deleteBookThunk } from 'features/book/thunks/deleteBooks';
import { fetchBookById, fetchBooks } from 'features/book/thunks/fetchBooks';
import { publishBookThunk } from 'features/book/thunks/publishBook';
import { updateBookThunk } from 'features/book/thunks/updateBook';

export const selectedBookModel = {
  selectors: {
    selectBooks,
    selectBooksLoading,
    selectBooksError,
    selectBookById,
  },
  actions: { clearSelectedBook },
  thunks: {
    deleteBookThunk,
    fetchBooks,
    publishBookThunk,
    updateBookThunk,
    fetchBookById,
  },
} as const;
