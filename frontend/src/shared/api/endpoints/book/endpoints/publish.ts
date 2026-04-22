import { apiPost } from 'shared/api/baseApi';
import { BOOK_API_URLS } from 'shared/api/endpoints/book/getUrl';
import { Book, PublishBookRequest } from 'shared/api/endpoints/book/types';

export const publishBook = (payload: PublishBookRequest) =>
  apiPost<Book, PublishBookRequest>({
    url: BOOK_API_URLS.BASE,
    body: payload,
  });
