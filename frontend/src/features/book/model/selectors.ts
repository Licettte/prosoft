import { RootState } from 'app/store';

export const selectBooks = (state: RootState) => state.book.books;
export const selectBooksLoading = (state: RootState) => state.book.isLoading;
export const selectBooksError = (state: RootState) => state.book.error;

export const selectBookById = (bookId: string) => (state: RootState) =>
  state.book.books.find((book) => String(book.id) === bookId) ?? null;
