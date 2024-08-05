import Axios, { type AxiosInstance, type Method, type AxiosResponse } from 'axios';
import { getHeaders, parseUrl } from './utils';
import type { Options, Request, Response } from './type';

class Webapi {
  private readonly axios: AxiosInstance;
  private readonly controller: AbortController;

  constructor(options: Options) {
    this.controller = new AbortController();
    this.axios = Axios.create(options.config);
    // 拦截器
    this.axios.interceptors.request.use((config) => {
      return {
        ...config,
        headers: getHeaders(config)
      };
    });
    // 响应器
    this.axios.interceptors.response.use(
      (response: AxiosResponse<Response<any>>): AxiosResponse<Response<any>> => {
        if (response.status === 200) {
          return response;
        }
        return response;
      },
      (error) => {
        return error;
      }
    );
  }

  public get<T>(
    url: string,
    params?: Request['params'],
    config?: Request['config']
  ): Promise<AxiosResponse<Response<T>>> {
    return this.api<T>(url, { params, config }, 'get');
  }

  public delete<T>(
    url: string,
    params?: Request['params'],
    config?: Request['config']
  ): Promise<AxiosResponse<Response<T>>> {
    return this.api<T>(url, { params, config }, 'delete');
  }

  public post<T>(
    url: string,
    params: Request['params'],
    config?: Request['config']
  ): Promise<AxiosResponse<Response<T>>> {
    return this.api<T>(url, { params, config }, 'post');
  }

  public patch<T>(
    url: string,
    params: Request['params'],
    config?: Request['config']
  ): Promise<AxiosResponse<Response<T>>> {
    return this.api<T>(url, { params, config }, 'patch');
  }

  public put<T>(
    url: string,
    params: Request['params'],
    config?: Request['config']
  ): Promise<AxiosResponse<Response<T>>> {
    return this.api<T>(url, { params, config }, 'put');
  }

  public getSignal(): AbortSignal {
    const signal = this.controller.signal;
    return signal;
  }

  public abort(): void {
    this.controller.abort();
  }

  private async api<T>(url: string, req: Request, method: Method = 'get'): Promise<AxiosResponse<Response<T>>> {
    if (url.split('?')[1] ?? /get|delete/i.test(method)) {
      url = parseUrl(url, req.params);
    }
    let res = null;
    method = method.toLocaleLowerCase() as Method;
    switch (method) {
      case 'get':
        res = await this.axios.get(url, req.config);
        return res.data;
      case 'delete':
        res = await this.axios.delete(url, req.config);
        return res.data;
      case 'post':
        res = await this.axios.post(url, req.params, req.config);
        return res.data;
      case 'patch':
        res = await this.axios.patch(url, req.params, req.config);
        return res.data;
      case 'put':
        res = await this.axios.put(url, req.params, req.config);
        return res.data;
      default:
        res = await this.axios.get(url, req.config);
        return res.data;
    }
  }
}

const timeout = 20000;

export const webApi: Webapi = new Webapi({
  config: {
    baseURL: '',
    timeout: timeout
  }
});
