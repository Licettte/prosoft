import { apiPatch } from 'shared/api/baseApi';
import { BOOK_API_URLS } from 'shared/api/endpoints/book/getUrl';
import {
  Book,
  UpdateBookParams,
  UpdateBookRequest,
} from 'shared/api/endpoints/book/types';

export const updateBook = ({ bookId, payload }: UpdateBookParams) =>
  apiPatch<Book, UpdateBookRequest>({
    url: BOOK_API_URLS.BY_ID(bookId),
    body: payload,
  });
