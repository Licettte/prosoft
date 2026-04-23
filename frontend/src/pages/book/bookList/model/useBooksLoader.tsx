import { bookModel } from 'features/book';
import { clearListError } from 'features/book/model/slice';
import { fetchBooks } from 'features/book/thunks/fetchBooks';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/typedRedux';

export const useBooksLoader = () => {
  const dispatch = useAppDispatch();

  const books = useAppSelector(bookModel.selectors.selectBookList);
  const status = useAppSelector(bookModel.selectors.selectBookListStatus);
  const error = useAppSelector(bookModel.selectors.selectBookListError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }

    return () => {
      dispatch(clearListError());
    };
  }, [dispatch, status]);

  const resetError = useCallback(() => {
    dispatch(clearListError());
  }, [dispatch]);

  const reloadBooks = useCallback(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return {
    books,
    isLoading: status === 'loading',
    error,
    resetError,
    reloadBooks,
  };
};
