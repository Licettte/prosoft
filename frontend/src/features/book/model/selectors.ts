import type { RootState } from 'app/store';

export const selectBooksState = (state: RootState) => state.books;

export const selectBookList = (state: RootState) => state.books.list.items;
export const selectBookListStatus = (state: RootState) =>
  state.books.list.status;
export const selectBookListError = (state: RootState) => state.books.list.error;
export const selectBookTotalCount = (state: RootState) =>
  state.books.list.totalCount;

export const selectBookDetails = (state: RootState) => state.books.details.item;
export const selectBookDetailsStatus = (state: RootState) =>
  state.books.details.status;
export const selectBookDetailsError = (state: RootState) =>
  state.books.details.error;

export const selectBookMutationError = (state: RootState) =>
  state.books.mutations.error;

export const selectIsCreateBookLoading = (state: RootState) =>
  state.books.mutations.createStatus === 'loading';

export const selectIsUpdateBookLoading = (state: RootState) =>
  state.books.mutations.updateStatus === 'loading';

export const selectIsDeleteBookLoading = (state: RootState) =>
  state.books.mutations.deleteStatus === 'loading';
