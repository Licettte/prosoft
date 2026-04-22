import {BookSortField, SortOrder} from "shared/api/endpoints/book/types";

type SortOption = {
  label: string
  value: string
  config: {
    sortField: BookSortField
    sortOrder: SortOrder
  }
}

export const sortOptions: SortOption[] = [
  {
    label: 'По названию (А-Я)',
    value: 'name-asc',
    config: {
      sortField: BookSortField.NAME,
      sortOrder: SortOrder.ASC,
    },
  },
  {
    label: 'По названию (Я-А)',
    value: 'name-desc',
    config: {
      sortField: BookSortField.NAME,
      sortOrder: SortOrder.DESC,
    },
  },
  {
    label: 'По дате публикации (сначала новые)',
    value: 'created_at-desc',
    config: {
      sortField: BookSortField.CREATED_AT,
      sortOrder: SortOrder.DESC,
    },
  },
  {
    label: 'По дате публикации (сначала старые)',
    value: 'created_at-asc',
    config: {
      sortField: BookSortField.CREATED_AT,
      sortOrder: SortOrder.ASC,
    },
  },
]

export const defaultSortConfig = {
  sortField: BookSortField.CREATED_AT,
  sortOrder: SortOrder.DESC,
}
