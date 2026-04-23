import { Alert } from 'antd';

import styles from './LoginForm.module.scss';

type LoginFormErrorProps = {
  message: string;
  onClose?: () => void;
  closable?: boolean;
};

export const LoginFormError = ({
  message,
  onClose,
  closable = true,
}: LoginFormErrorProps) => {
  return (
    <div className={styles.wrapper}>
      <Alert
        type="error"
        message={message}
        showIcon
        closable={closable}
        onClose={onClose}
      />
    </div>
  );
};
