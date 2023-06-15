import { AxiosRequestConfig } from 'axios';

export interface RequestManagerOptions<B extends object> {
  body?: B;
  config?: AxiosRequestConfig;
}
