import { message } from 'antd';
import { authModel } from 'features/auth';
import { LoginFormValues } from 'features/auth/model/types';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthStatus } from 'shared/api/endpoints/auth';
import { APP_ROUTES } from 'shared/config/appRoutes';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/typedRedux';

const SUCCESS_MESSAGE_DURATION = 2;

type UseLoginFormParams = {
  resetForm: () => void;
};

export const useLoginForm = ({ resetForm }: UseLoginFormParams) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [messageApi, messageContextHolder] = message.useMessage();

  const authStatus = useAppSelector(authModel.selectors.selectAuthStatus);
  const authErrorMessage = useAppSelector(
    authModel.selectors.selectAuthErrorMessage
  );

  const isLoginPending = authStatus === AuthStatus.LOADING;
  const hasAuthError = Boolean(authErrorMessage);

  const loginByCredentials = authModel.thunks.loginByCredentials;
  const clearAuthErrorMessage = authModel.actions.clearAuthErrorMessage;

  const handleSubmit = useCallback(
    async (values: LoginFormValues) => {
      const loginResult = await dispatch(loginByCredentials(values));

      if (loginByCredentials.fulfilled.match(loginResult)) {
        resetForm();

        await messageApi.success(
          'Авторизация прошла успешно',
          SUCCESS_MESSAGE_DURATION
        );

        navigate(APP_ROUTES.BOOKS.LIST, { replace: true });
      }
    },
    [dispatch, loginByCredentials, messageApi, navigate, resetForm]
  );

  const handleValuesChange = useCallback(() => {
    if (hasAuthError) {
      dispatch(clearAuthErrorMessage());
    }
  }, [clearAuthErrorMessage, dispatch, hasAuthError]);

  const clearError = useCallback(() => {
    dispatch(clearAuthErrorMessage());
  }, [clearAuthErrorMessage, dispatch]);

  return {
    authErrorMessage,
    hasAuthError,
    isLoginPending,
    handleSubmit,
    handleValuesChange,
    clearError,
    messageContextHolder,
  };
};
