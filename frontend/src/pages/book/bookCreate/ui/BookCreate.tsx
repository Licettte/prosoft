import { Card, message } from 'antd';
import { selectedBookModel } from 'features/book';
import { BookForm, BookFormValues } from 'pages/book/bookDetails/ui/BookForm';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from 'shared/config/appRoutes';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/typedRedux';

const BookCreate = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector(
    selectedBookModel.selectors.selectBooksLoading
  );

  const handleCreate = async (values: BookFormValues) => {
    try {
      await dispatch(
        selectedBookModel.thunks.publishBookThunk({
          name: values.name,
          description: values.description,
          isAvailable: values.isAvailable,
        })
      ).unwrap();

      message.success(`Книга «${values.name}» успешно создана`);
      navigate(APP_ROUTES.BOOKS.LIST);
    } catch {
      message.error('Не удалось создать книгу');
    }
  };

  const handleCancel = () => {
    navigate(APP_ROUTES.BOOKS.LIST);
  };

  return (
    <Card title="Создание книги">
      <BookForm
        onSave={handleCreate}
        onCancel={handleCancel}
        isLoading={isLoading}
        submitText="Создать"
      />
    </Card>
  );
});

export default BookCreate;
