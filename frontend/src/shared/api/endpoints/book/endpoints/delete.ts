import { apiDelete } from '../../../baseApi';
import { BOOK_API_URLS } from '../getUrl';
import { DeleteBookParams } from '../types';

export const deleteBook = ({ bookId }: DeleteBookParams) =>
  apiDelete<void>({
    url: BOOK_API_URLS.BY_ID(bookId),
  });
