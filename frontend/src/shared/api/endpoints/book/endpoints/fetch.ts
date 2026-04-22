import { apiGet, apiGetWithMeta } from '../../../baseApi';
import { BOOK_API_URLS } from '../getUrl';
import { Book, GetBooksRequest, GetBooksResponse } from '../types';

export const getBooks = async ({
  offset = 0,
  count = 15,
  sort = 'created_at',
  order = 'desc',
}: GetBooksRequest = {}) => {
  const response = await apiGetWithMeta<Book[]>({
    url: BOOK_API_URLS.BASE,
    params: {
      offset,
      count,
      sort,
      order,
    },
  });

  return {
    books: response.data,
    totalCount: Number(response.headers['x-total-count'] ?? 0),
  } satisfies GetBooksResponse;
};

export const getBook = ({ bookId }: { bookId: string }) =>
  apiGet<Book>({
    url: BOOK_API_URLS.BY_ID(bookId),
  });
