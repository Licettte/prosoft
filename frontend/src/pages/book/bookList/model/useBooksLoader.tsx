import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/typedRedux'
import { selectedBookModel } from 'features/book'
import { fetchBooks } from 'features/book/thunks/fetchBooks'
import { clearBooksError } from 'features/book/model/slice'

export const useBooksLoader = () => {
  const dispatch = useAppDispatch()

  const books = useAppSelector(selectedBookModel.selectors.selectBooks)
  const isLoading = useAppSelector(selectedBookModel.selectors.selectBooksLoading)
  const error = useAppSelector(selectedBookModel.selectors.selectBooksError)

  useEffect(() => {
    dispatch(fetchBooks())

    return () => {
      dispatch(clearBooksError())
    }
  }, [dispatch])

  const resetError = () => {
    dispatch(clearBooksError())
  }

  const reloadBooks = () => {
    dispatch(fetchBooks())
  }

  return {
    books: Array.isArray(books) ? books : [],
    isLoading,
    error,
    resetError,
    reloadBooks,
  }
}
