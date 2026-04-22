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
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from 'shared/config/appRoutes';
import { usePermissions } from 'shared/permission/lib/usePermissions';

import { useBookFilters } from '../model/useBookFilters';
import { useBooksLoader } from '../model/useBooksLoader';
import styles from './BookList.module.scss';

const { Text } = Typography;

const BookList = memo(() => {
  const navigate = useNavigate();

  const { books, isLoading, error, resetError } = useBooksLoader();

  const {
    showOnlyAvailable,
    setShowOnlyAvailable,
    selectedSortValue,
    setSelectedSortValue,
    filteredAndSortedBooks,
  } = useBookFilters(books);

  const { canAddBooks } = usePermissions();

  const handleCreateBook = () => {
    navigate(APP_ROUTES.BOOKS.CREATE);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <div className={styles.toolbar}>
          <Space
            size="middle"
            wrap
            style={{ width: '100%', justifyContent: 'space-between' }}
          >
            <Space size="middle" wrap>
              <div className={styles.control}>
                <Text strong>В наличии</Text>
                <Switch
                  checked={showOnlyAvailable}
                  onChange={setShowOnlyAvailable}
                />
              </div>

              <div className={styles.control}>
                <Text strong>Сортировка</Text>
                <Select<string>
                  value={selectedSortValue}
                  onChange={setSelectedSortValue}
                  options={sortOptions.map(({ label, value }) => ({
                    label,
                    value,
                  }))}
                  className={styles.selectWide}
                />
              </div>
            </Space>
          </Space>
        </div>

        <div className={styles.addButton}>
          {canAddBooks && (
            <Button type="primary" onClick={handleCreateBook}>
              Добавить книгу
            </Button>
          )}
        </div>
      </div>
      {error && (
        <Alert
          type="error"
          message={error}
          closable
          onClose={resetError}
          style={{ marginBottom: 16 }}
        />
      )}

      {isLoading ? (
        <div className={styles.loader}>
          <Spin size="large" />
        </div>
      ) : filteredAndSortedBooks.length > 0 ? (
        <div className={styles.grid}>
          {filteredAndSortedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <Empty description="Книги не найдены" />
      )}
    </div>
  );
});

export default BookList;
