import { Alert, Form } from 'antd';
import { memo } from 'react';

type LoginFormErrorProps = {
  message: string;
  onClose?: () => void;
};

export const LoginFormError = memo(
  ({ message, onClose }: LoginFormErrorProps) => {
    return (
      <Form.Item>
        <Alert
          type="error"
          message={message}
          showIcon
          closable
          onClose={onClose}
        />
      </Form.Item>
    );
  }
);

LoginFormError.displayName = 'LoginFormError';
