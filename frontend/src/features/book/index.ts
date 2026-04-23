import {
  selectBookDetails,
  selectBookDetailsError,
  selectBookDetailsStatus,
  selectBookList,
  selectBookListError,
  selectBookListStatus,
  selectBookMutationError,
  selectBookTotalCount,
  selectIsCreateBookLoading,
  selectIsDeleteBookLoading,
  selectIsUpdateBookLoading,
} from 'features/book/model/selectors';
import {
  clearDetailsError,
  clearListError,
  clearMutationError,
  clearSelectedBook,
  resetMutationStatuses,
} from 'features/book/model/slice';
import { deleteBookThunk } from 'features/book/thunks/deleteBooks';
import { fetchBookById, fetchBooks } from 'features/book/thunks/fetchBooks';
import { publishBookThunk } from 'features/book/thunks/publishBook';
import { updateBookThunk } from 'features/book/thunks/updateBook';

export const bookModel = {
  selectors: {
    selectBookList,
    selectBookListStatus,
    selectBookListError,
    selectBookTotalCount,

    selectBookDetails,
    selectBookDetailsStatus,
    selectBookDetailsError,

    selectBookMutationError,
    selectIsCreateBookLoading,
    selectIsUpdateBookLoading,
    selectIsDeleteBookLoading,
  },
  actions: {
    clearListError,
    clearDetailsError,
    clearMutationError,
    clearSelectedBook,
    resetMutationStatuses,
  },
  thunks: {
    fetchBooks,
    fetchBookById,
    publishBookThunk,
    updateBookThunk,
    deleteBookThunk,
  },
} as const;
