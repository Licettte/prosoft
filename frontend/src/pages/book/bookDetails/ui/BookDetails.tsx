import { Button, Card, message, Popconfirm, Spin } from 'antd';
import { selectedBookModel } from 'features/book';
import { BookCard } from 'pages/book';
import { BookForm, BookFormValues } from 'pages/book/bookDetails/ui/BookForm';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { APP_ROUTES } from 'shared/config/appRoutes';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/typedRedux';
import { usePermissions } from 'shared/permission/lib/usePermissions';

import styles from './BookDetails.module.scss';

const BookDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { canEditBooks, canDeleteBooks } = usePermissions();

  const book = useAppSelector(
    selectedBookModel.selectors.selectBookById(id ?? '')
  );
  const isLoading = useAppSelector(
    selectedBookModel.selectors.selectBooksLoading
  );

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(selectedBookModel.thunks.fetchBookById({ bookId: id }));
    }

    return () => {
      dispatch(selectedBookModel.actions.clearSelectedBook());
    };
  }, [dispatch, id]);

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSave = async (values: BookFormValues) => {
    if (!book) return;

    try {
      await dispatch(
        selectedBookModel.thunks.updateBookThunk({
          bookId: book.id,
          payload: values,
        })
      ).unwrap();

      message.success('Книга обновлена');
      setIsEditing(false);
    } catch {
      message.error('Не удалось обновить книгу');
    }
  };

  const handleDelete = async () => {
    if (!book) return;

    try {
      await dispatch(
        selectedBookModel.thunks.deleteBookThunk({ bookId: book.id })
      ).unwrap();

      message.success('Книга удалена');
      navigate(APP_ROUTES.BOOKS.LIST);
    } catch {
      message.error('Не удалось удалить книгу');
    }
  };

  if (isLoading && !book) {
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
          onSave={handleSave}
          onCancel={handleCancelEdit}
          isLoading={isLoading}
        />
      ) : (
        <>
          <BookCard book={book} />

          {(canEditBooks || canDeleteBooks) && (
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              {canEditBooks && (
                <Button type="primary" onClick={handleStartEdit}>
                  Редактировать
                </Button>
              )}

              {canDeleteBooks && (
                <Popconfirm
                  title="Удалить книгу?"
                  description="Это действие нельзя отменить"
                  okText="Удалить"
                  cancelText="Отмена"
                  onConfirm={handleDelete}
                >
                  <Button danger>Удалить</Button>
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
