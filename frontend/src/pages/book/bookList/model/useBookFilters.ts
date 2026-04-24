import {
  DEFAULT_SORT_VALUE,
  defaultSortConfig,
  sortOptions,
} from 'pages/book/bookList/lib/utils';
import { useMemo, useState } from 'react';

export const useBookFilters = () => {
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [selectedSortValue, setSelectedSortValue] =
    useState<string>(DEFAULT_SORT_VALUE);

  const selectedSortConfig = useMemo(() => {
    return (
      sortOptions.find((option) => option.value === selectedSortValue)
        ?.config ?? defaultSortConfig
    );
  }, [selectedSortValue]);

  return {
    showOnlyAvailable,
    setShowOnlyAvailable,
    selectedSortValue,
    setSelectedSortValue,
    selectedSortConfig,
  };
};
