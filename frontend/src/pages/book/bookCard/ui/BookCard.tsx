import { Card, Tag } from 'antd';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Book } from 'shared/api/endpoints/book/types';
import { APP_ROUTES } from 'shared/config/appRoutes';
import { formatDate } from 'shared/lib/utils';

import styles from './BookCard.module.scss';

type BookCardProps = {
  book: Book;
};

export const BookCard = memo(({ book }: BookCardProps) => {
  const detailPath = APP_ROUTES.BOOKS.DETAIL.replace(':id', String(book.id));

  return (
    <Link
      to={detailPath}
      className={styles.link}
      aria-label={`Открыть книгу ${book.name}`}
    >
      <Card className={styles.bookCard} hoverable>
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
            Дата публикации: {formatDate(book.created_at)}
          </span>
        </div>
      </Card>
    </Link>
  );
});

