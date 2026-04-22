import axios, { AxiosError } from 'axios';
import type {
  ApiBodyParams,
  ApiParams,
  ResponseErrorBody,
} from 'shared/api/types';

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error('VITE_API_URL is not defined');
}

const defaultHeaders = {
  'Content-Type': 'application/json',
} as const;

type ApiErrorResponse = {
  type?: string;
  message?: string;
  error?: {
    message?: string;
  };
};

export const instance = axios.create({
  baseURL: apiUrl,
  headers: defaultHeaders,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const fallbackMessage = 'Произошла ошибка при выполнении запроса';

    const message =
      error.response?.data?.error?.message ??
      error.response?.data?.message ??
      error.message ??
      fallbackMessage;

    const normalizedError: ResponseErrorBody = {
      message,
      isSystem: !error.response,
      status: error.response?.status,
      type: error.response?.data?.type,
    };

    return Promise.reject(normalizedError);
  }
);

export const apiGet = async <T>({
  url,
  params,
  headers,
  signal,
  responseType,
}: ApiParams): Promise<T> => {
  const response = await instance.get<T>(url, {
    params,
    headers,
    signal,
    responseType,
  });

  return response.data;
};

export const apiGetWithMeta = async <T>({
  url,
  params,
  headers,
  signal,
  responseType,
}: ApiParams) => {
  const response = await instance.get<T>(url, {
    params,
    headers,
    signal,
    responseType,
  });

  return {
    data: response.data,
    headers: response.headers,
  };
};

export const apiPost = async <TResponse, TBody = unknown>({
  url,
  body,
  headers,
  signal,
  responseType,
}: ApiBodyParams<TBody>): Promise<TResponse> => {
  const response = await instance.post<TResponse>(url, body, {
    headers,
    signal,
    responseType,
  });

  return response.data;
};

export const apiPut = async <TResponse, TBody = unknown>({
  url,
  body,
  headers,
  signal,
  responseType,
}: ApiBodyParams<TBody>): Promise<TResponse> => {
  const response = await instance.put<TResponse>(url, body, {
    headers,
    signal,
    responseType,
  });

  return response.data;
};

export const apiPatch = async <TResponse, TBody = unknown>({
  url,
  body,
  headers,
  signal,
  responseType,
}: ApiBodyParams<TBody>): Promise<TResponse> => {
  const response = await instance.patch<TResponse>(url, body, {
    headers,
    signal,
    responseType,
  });

  return response.data;
};

export const apiDelete = async <T>({
  url,
  headers,
  signal,
  responseType,
}: Omit<ApiParams, 'params'>): Promise<T> => {
  const response = await instance.delete<T>(url, {
    headers,
    signal,
    responseType,
  });

  return response.data;
};
