import { BookId } from './types';

export const BOOK_API_URLS = {
  BASE: 'books',
  BY_ID: (bookId: BookId) => `books/${bookId}`,
} as const;
