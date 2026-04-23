import { Card } from 'antd';
import { BookForm } from 'pages/book/bookDetails/ui/BookForm';

import { useBookCreate } from '../model/useBookCreate';

const BookCreate = () => {
  const { isLoading, createBook, cancelCreate } = useBookCreate();

  return (
    <Card title="Создание книги">
      <BookForm
        onSave={createBook}
        onCancel={cancelCreate}
        isLoading={isLoading}
        submitText="Создать"
      />
    </Card>
  );
};

export default BookCreate;
