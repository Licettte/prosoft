import { BookSortField, SortOrder } from 'shared/api/endpoints/book/types';

export type BookSortOption = {
  label: string;
  value: string;
  config: {
    sort: BookSortField;
    order: SortOrder;
  };
};

export const defaultSortConfig = {
  sort: BookSortField.CREATED_AT,
  order: SortOrder.DESC,
} as const;

export const sortOptions: BookSortOption[] = [
  {
    label: 'Сначала новые',
    value: 'created_at-desc',
    config: {
      sort: BookSortField.CREATED_AT,
      order: SortOrder.DESC,
    },
  },
  {
    label: 'Сначала старые',
    value: 'created_at-asc',
    config: {
      sort: BookSortField.CREATED_AT,
      order: SortOrder.ASC,
    },
  },
  {
    label: 'По названию А–Я',
    value: 'name-asc',
    config: {
      sort: BookSortField.NAME,
      order: SortOrder.ASC,
    },
  },
  {
    label: 'По названию Я–А',
    value: 'name-desc',
    config: {
      sort: BookSortField.NAME,
      order: SortOrder.DESC,
    },
  },
];

export const DEFAULT_SORT_VALUE = 'created_at-desc';
