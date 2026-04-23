import type { Book } from 'shared/api/endpoints/book/types';

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
