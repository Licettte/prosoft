import { Button, Card, Form, Input } from 'antd';
import { LoginFormValues } from 'features/auth/model/types';
import { memo } from 'react';

import { useLoginForm } from '../model/useLoginForm';
import { LoginFormError } from './LoginFormError';

const LOGIN_CARD_WIDTH = 400;

export const LoginForm = memo(() => {
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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      {messageContextHolder}

      <Card title="Вход" style={{ width: LOGIN_CARD_WIDTH }}>
        <Form<LoginFormValues>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={handleValuesChange}
          autoComplete="off"
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
            <Input placeholder="Введите логин" disabled={isLoginPending} />
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
            <Input.Password
              placeholder="Введите пароль"
              disabled={isLoginPending}
            />
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
});
