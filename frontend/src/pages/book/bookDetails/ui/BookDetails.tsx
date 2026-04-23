import { Button, Card, Popconfirm, Spin } from 'antd';
import { BookCard } from 'pages/book';
import { BookForm } from 'pages/book/bookDetails/ui/BookForm';

import { useBookDetails } from '../model/useBookDetails';
import styles from './BookDetails.module.scss';

const BookDetails = () => {
  const {
    id,
    book,
    isEditing,
    detailsStatus,
    isUpdateLoading,
    isDeleteLoading,
    canEditBooks,
    canDeleteBooks,
    startEdit,
    cancelEdit,
    saveBook,
    deleteCurrentBook,
  } = useBookDetails();

  if (!id) {
    return <div>Некорректный идентификатор книги</div>;
  }

  if (detailsStatus === 'loading' && !book) {
    return <Spin />;
  }

  if (!book) {
    return <div>Книга не найдена</div>;
  }

  return (
    <Card className={styles.wrapper}>
      {isEditing ? (
        <BookForm
          book={book}
          onSave={saveBook}
          onCancel={cancelEdit}
          isLoading={isUpdateLoading}
        />
      ) : (
        <>
          <BookCard book={book} />

          {(canEditBooks || canDeleteBooks) && (
            <div className={styles.actions}>
              {canEditBooks && (
                <Button type="primary" onClick={startEdit}>
                  Редактировать
                </Button>
              )}

              {canDeleteBooks && (
                <Popconfirm
                  title="Удалить книгу?"
                  description="Это действие нельзя отменить"
                  okText="Удалить"
                  cancelText="Отмена"
                  onConfirm={deleteCurrentBook}
                  okButtonProps={{ loading: isDeleteLoading }}
                >
                  <Button danger loading={isDeleteLoading}>
                    Удалить
                  </Button>
                </Popconfirm>
              )}
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default BookDetails;
