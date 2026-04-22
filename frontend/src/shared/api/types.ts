import type { AxiosRequestConfig } from 'axios';

export type ResponseErrorBody = {
  message: string;
  isSystem: boolean;
  status?: number;
  type?: string;
};

export type ApiParams = {
  url: string;
  params?: Record<string, string | number | boolean | null | undefined>;
} & Pick<AxiosRequestConfig, 'headers' | 'signal' | 'responseType'>;

export type ApiBodyParams<TBody = unknown> = {
  url: string;
  body?: TBody;
} & Pick<AxiosRequestConfig, 'headers' | 'signal' | 'responseType'>;
