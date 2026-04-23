import { Button, Card, Form, Input } from 'antd';
import { LoginFormValues } from 'features/auth/model/types';

import { useLoginForm } from '../model/useLoginForm';
import styles from './LoginForm.module.scss';
import { LoginFormError } from './LoginFormError';

export const LoginForm = () => {
  const [form] = Form.useForm<LoginFormValues>();

  const {
    authErrorMessage,
    hasAuthError,
    isLoginPending,
    handleSubmit,
    handleValuesChange,
    clearError,
    messageContextHolder,
  } = useLoginForm({
    resetForm: () => form.resetFields(),
  });

  return (
    <div className={styles.page}>
      {messageContextHolder}

      <Card title="Вход" className={styles.card}>
        <Form<LoginFormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={handleValuesChange}
          autoComplete="off"
          disabled={isLoginPending}
        >
          {hasAuthError && authErrorMessage && (
            <LoginFormError message={authErrorMessage} onClose={clearError} />
          )}

          <Form.Item
            label="Логин"
            name="login"
            rules={[
              {
                required: true,
                message: 'Введите логин',
              },
            ]}
          >
            <Input placeholder="Введите логин" aria-label="Логин" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: 'Введите пароль',
              },
            ]}
          >
            <Input.Password placeholder="Введите пароль" aria-label="Пароль" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoginPending}
          >
            Войти
          </Button>
        </Form>
      </Card>
    </div>
  );
};
