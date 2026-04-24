import { bookModel } from 'features/book';
import { clearListError } from 'features/book/model/slice';
import { fetchBooks } from 'features/book/thunks/fetchBooks';
import { useCallback, useEffect } from 'react';
import { BookSortField, SortOrder } from 'shared/api/endpoints/book/types';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/typedRedux';

type UseBooksLoaderParams = {
  sort: BookSortField;
  order: SortOrder;
};

export const useBooksLoader = ({ sort, order }: UseBooksLoaderParams) => {
  const dispatch = useAppDispatch();

  const books = useAppSelector(bookModel.selectors.selectBookList);
  const status = useAppSelector(bookModel.selectors.selectBookListStatus);
  const error = useAppSelector(bookModel.selectors.selectBookListError);

  useEffect(() => {
    dispatch(
      fetchBooks({
        sort,
        order,
      })
    );

    return () => {
      dispatch(clearListError());
    };
  }, [dispatch, sort, order]);

  const resetError = useCallback(() => {
    dispatch(clearListError());
  }, [dispatch]);

  const reloadBooks = useCallback(() => {
    dispatch(
      fetchBooks({
        sort,
        order,
      })
    );
  }, [dispatch, sort, order]);

  return {
    books,
    isLoading: status === 'loading',
    error,
    resetError,
    reloadBooks,
  };
};
