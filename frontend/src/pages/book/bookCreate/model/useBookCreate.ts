import { message } from 'antd';
import { bookModel } from 'features/book';
import { BookFormValues } from 'pages/book/bookDetails/ui/BookForm';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from 'shared/config/appRoutes';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/typedRedux';

export const useBookCreate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector(
    bookModel.selectors.selectIsCreateBookLoading
  );

  const createBook = async (values: BookFormValues) => {
    try {
      await dispatch(
        bookModel.thunks.publishBookThunk({
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

  const cancelCreate = () => {
    navigate(APP_ROUTES.BOOKS.LIST);
  };

  return {
    isLoading,
    createBook,
    cancelCreate,
  };
};
