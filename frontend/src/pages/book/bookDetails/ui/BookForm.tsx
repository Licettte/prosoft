import { Button, Form, Input, Space, Switch } from 'antd';
import { useEffect } from 'react';
import type { Book } from 'shared/api/endpoints/book/types';
import { validateBookDescriptionRule } from 'shared/lib/utils';

export type BookFormValues = {
  name: string;
  description: string;
  isAvailable: boolean;
  publisher?: string;
};

type BookFormProps = {
  book?: Book;
  onSave: (values: BookFormValues) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  submitText?: string;
};

export const BookForm = ({
  book,
  onSave,
  onCancel,
  isLoading = false,
  submitText = 'Сохранить',
}: BookFormProps) => {
  const [form] = Form.useForm<BookFormValues>();

  useEffect(() => {
    form.setFieldsValue({
      name: book?.name ?? '',
      description: book?.description ?? '',
      publisher: book?.publisher ?? '',
      isAvailable: book?.isAvailable ?? true,
    });
  }, [book, form]);

  const handleFinish = async (values: BookFormValues) => {
    console.log('FORM SUBMIT', values);
    await onSave(values);
  };

  const handleFinishFailed = (errorInfo: unknown) => {
    console.log('FORM FAILED', errorInfo);
  };

  return (
    <Form<BookFormValues>
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
    >
      <Form.Item
        name="name"
        label="Название"
        rules={[
          { required: true, message: 'Введите название книги' },
          { validator: validateBookDescriptionRule },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Описание"
        rules={[
          { required: true, message: 'Введите описание книги' },
          { validator: validateBookDescriptionRule },
        ]}
      >
        <Input.TextArea rows={10} />
      </Form.Item>

      <Form.Item name="isAvailable" label="В наличии" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Space>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {submitText}
        </Button>

        {onCancel && (
          <Button onClick={onCancel} disabled={isLoading}>
            Отмена
          </Button>
        )}
      </Space>
    </Form>
  );
};
