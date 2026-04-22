import { useMemo, useState } from 'react'

import {
  BookSortField,
  SortOrder,
  type Book,
} from 'shared/api/endpoints/book/types'

import { defaultSortConfig, sortOptions } from 'pages/book/bookList/lib/utils'

export const useBookFilters = (books: Book[]) => {
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)
  const [selectedSortValue, setSelectedSortValue] =
    useState<string>('created_at-desc')

  const selectedSortConfig = useMemo(() => {
    return (
      sortOptions.find((option) => option.value === selectedSortValue)?.config ??
      defaultSortConfig
    )
  }, [selectedSortValue])

  const filteredAndSortedBooks = useMemo(() => {
    const safeBooks = Array.isArray(books) ? books : []

    const filteredBooks = showOnlyAvailable
      ? safeBooks.filter((book) => book.isAvailable)
      : safeBooks

    return filteredBooks.slice().sort((leftBook, rightBook) => {
      if (selectedSortConfig.sortField === BookSortField.NAME) {
        const compareResult = leftBook.name.localeCompare(
          rightBook.name,
          'ru',
        )

        return selectedSortConfig.sortOrder === SortOrder.ASC
          ? compareResult
          : -compareResult
      }

      const leftBookDate = new Date(leftBook.created_at).getTime()
      const rightBookDate = new Date(rightBook.created_at).getTime()
      const compareResult = leftBookDate - rightBookDate

      return selectedSortConfig.sortOrder === SortOrder.ASC
        ? compareResult
        : -compareResult
    })
  }, [books, selectedSortConfig, showOnlyAvailable])

  return {
    showOnlyAvailable,
    setShowOnlyAvailable,
    selectedSortValue,
    setSelectedSortValue,
    selectedSortConfig,
    filteredAndSortedBooks,
  }
}
