export const BookSortField = {
  NAME: 'name',
  CREATED_AT: 'created_at',
} as const;

export type BookSortField = (typeof BookSortField)[keyof typeof BookSortField];

export const SortOrder = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

export type BookId = string;

export type Book = {
  id: BookId;
  name: string;
  description: string;
  publisher: string;
  created_at: string;
  isAvailable: boolean;
};

export type BooksQueryParams = {
  offset: number;
  count: number;
  sort: BookSortField;
  order: SortOrder;
};

export type GetBooksRequest = Partial<BooksQueryParams>;

export type GetBookParams = {
  bookId: BookId;
};

export type PublishBookRequest = {
  name: string;
  description: string;
  isAvailable: boolean;
};

export type UpdateBookRequest = Partial<{
  name: string;
  description: string;
  isAvailable: boolean;
}>;

export type UpdateBookParams = {
  bookId: BookId;
  payload: UpdateBookRequest;
};

export type DeleteBookParams = {
  bookId: BookId;
};

export type GetBooksResponse = {
  books: Book[];
  totalCount: number;
};
