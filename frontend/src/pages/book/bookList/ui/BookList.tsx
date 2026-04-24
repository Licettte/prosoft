import {
  Alert,
  Button,
  Empty,
  Select,
  Space,
  Spin,
  Switch,
  Typography,
} from 'antd';
import { BookCard } from 'pages/book';
import { sortOptions } from 'pages/book/bookList/lib/utils';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from 'shared/config/appRoutes';
import { usePermissions } from 'shared/permission/lib/usePermissions';

import { useBookFilters } from '../model/useBookFilters';
import { useBooksLoader } from '../model/useBooksLoader';
import styles from './BookList.module.scss';

const { Text } = Typography;

const BookList = () => {
  const navigate = useNavigate();

  const {
    showOnlyAvailable,
    setShowOnlyAvailable,
    selectedSortValue,
    setSelectedSortValue,
    selectedSortConfig,
  } = useBookFilters();

  const { books, isLoading, error, resetError } = useBooksLoader({
    sort: selectedSortConfig.sort,
    order: selectedSortConfig.order,
  });

  const { canAddBooks } = usePermissions();

  const visibleBooks = useMemo(() => {
    return showOnlyAvailable ? books.filter((book) => book.isAvailable) : books;
  }, [books, showOnlyAvailable]);

  const handleCreateBook = () => {
    navigate(APP_ROUTES.BOOKS.CREATE);
  };

  const hasBooks = visibleBooks.length > 0;
  const showEmpty = !isLoading && !error && !hasBooks;

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.toolbar}>
          <Space size="middle" wrap className={styles.toolbarContent}>
            <div className={styles.control}>
              <Text strong>В наличии</Text>
              <Switch
                checked={showOnlyAvailable}
                onChange={setShowOnlyAvailable}
                aria-label="Показывать только доступные книги"
              />
            </div>

            <div className={styles.control}>
              <Text strong>Сортировка</Text>
              <Select<string>
                value={selectedSortValue}
                onChange={setSelectedSortValue}
                options={sortOptions}
                className={styles.selectWide}
                aria-label="Сортировка книг"
              />
            </div>
          </Space>
        </div>

        {canAddBooks && (
          <div className={styles.actions}>
            <Button type="primary" onClick={handleCreateBook}>
              Добавить книгу
            </Button>
          </div>
        )}
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          closable
          onClose={resetError}
          className={styles.error}
        />
      )}

      {isLoading && (
        <div className={styles.loader}>
          <Spin size="large" />
        </div>
      )}

      {!isLoading && hasBooks && (
        <div className={styles.grid}>
          {visibleBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {showEmpty && <Empty description="Книги не найдены" />}
    </section>
  );
};

export default BookList;
