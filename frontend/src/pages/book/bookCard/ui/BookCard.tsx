import { Card, Tag } from 'antd';
import { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from 'shared/api/endpoints/book/types';
import { APP_ROUTES } from 'shared/config/appRoutes';

import styles from './BookCard.module.scss';

type BookCardProps = {
  book: Book;
};

export const BookCard = memo(({ book }: BookCardProps) => {
  const navigate = useNavigate();

  const detailPath = useMemo(
    () => APP_ROUTES.BOOKS.DETAIL.replace(':id', String(book.id)),
    [book.id]
  );

  const handleOpenDetails = () => {
    navigate(detailPath);
  };

  return (
    <Card className={styles.bookCard} hoverable onClick={handleOpenDetails}>
      <div className={styles.header}>
        <h3 className={styles.title}>{book.name}</h3>

        <Tag color={book.isAvailable ? 'success' : 'default'}>
          {book.isAvailable ? 'В наличии' : 'Не в наличии'}
        </Tag>
      </div>

      <p className={styles.description}>{book.description}</p>

      <div className={styles.meta}>
        <span className={styles.publisher}>Издатель: {book.publisher}</span>
        <span className={styles.createdAt}>
          Дата публикации: {new Date(book.created_at).toLocaleDateString()}
        </span>
      </div>
    </Card>
  );
});
