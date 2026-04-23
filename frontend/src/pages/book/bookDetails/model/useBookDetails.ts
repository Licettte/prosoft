import { message } from 'antd';
import { bookModel } from 'features/book';
import { BookFormValues } from 'pages/book/bookDetails/ui/BookForm';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { APP_ROUTES } from 'shared/config/appRoutes';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/typedRedux';
import { usePermissions } from 'shared/permission/lib/usePermissions';

export const useBookDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { canEditBooks, canDeleteBooks } = usePermissions();

  const book = useAppSelector(bookModel.selectors.selectBookDetails);
  const detailsStatus = useAppSelector(
    bookModel.selectors.selectBookDetailsStatus
  );
  const isUpdateLoading = useAppSelector(
    bookModel.selectors.selectIsUpdateBookLoading
  );
  const isDeleteLoading = useAppSelector(
    bookModel.selectors.selectIsDeleteBookLoading
  );

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!id) return;

    dispatch(bookModel.thunks.fetchBookById({ bookId: id }));

    return () => {
      dispatch(bookModel.actions.clearSelectedBook());
    };
  }, [dispatch, id]);

  const startEdit = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const saveBook = async (values: BookFormValues) => {
    if (!book) return;

    try {
      await dispatch(
        bookModel.thunks.updateBookThunk({
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

  const deleteCurrentBook = async () => {
    if (!book) return;

    try {
      await dispatch(
        bookModel.thunks.deleteBookThunk({ bookId: book.id })
      ).unwrap();

      message.success('Книга удалена');
      navigate(APP_ROUTES.BOOKS.LIST);
    } catch {
      message.error('Не удалось удалить книгу');
    }
  };

  return {
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
  };
};
