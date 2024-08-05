import { type AxiosRequestConfig, type AxiosRequestHeaders } from 'axios';

export interface Options {
  config: AxiosRequestConfig;
  headers?: AxiosRequestHeaders;
}

export interface Request {
  params?: Record<string, any>;
  config?: AxiosRequestConfig;
}

export interface Response<T = any> {
  code: number;
  data?: T;
  msg?: string;
}
