import { RequestManagerOptions } from '@common/request-manager/request-manager.types';
import { Logger } from '@nestjs/common';
import { Axios, AxiosRequestConfig } from 'axios';

export class RequestManager {
  private logger = new Logger();

  constructor(protected axios: Axios, protected config: AxiosRequestConfig) {}

  protected get<Q, B extends object>(
    endpoint: string,
    options?: RequestManagerOptions<B>,
  ) {
    const formedUrl = this.createUrl(endpoint);
    const formedUrlWithAttachedParams = this.attachParams(
      formedUrl,
      options?.body,
    );
    const formedConfig = this.formConfig(options?.config);

    return this.axios
      .get<Q>(formedUrlWithAttachedParams, formedConfig)
      .then((res) => res.data);
  }

  protected post<Q, B extends object>(
    endpoint: string,
    options?: RequestManagerOptions<B>,
  ) {
    const formedUrl = this.createUrl(endpoint);
    const formedConfig = this.formConfig(options?.config);

    return this.axios
      .post<Q>(formedUrl, options?.body, formedConfig)
      .then((res) => res.data);
  }

  protected put<Q, B extends object>(
    endpoint: string,
    options?: RequestManagerOptions<B>,
  ) {
    const formedUrl = this.createUrl(endpoint);
    const formedConfig = this.formConfig(options?.config);

    return this.axios
      .put<Q>(formedUrl, options?.body, formedConfig)
      .then((res) => res.data);
  }

  protected patch<Q, B extends object>(
    endpoint: string,
    options?: RequestManagerOptions<B>,
  ) {
    const formedUrl = this.createUrl(endpoint);
    const formedConfig = this.formConfig(options?.config);

    return this.axios
      .patch<Q>(formedUrl, options?.body, formedConfig)
      .then((res) => res.data);
  }

  protected delete<Q, B extends object>(
    endpoint: string,
    options?: RequestManagerOptions<B>,
  ) {
    const formedUrl = this.createUrl(endpoint);
    const formedConfig = this.formConfig(options?.config);

    return this.axios
      .delete<Q>(formedUrl, formedConfig)
      .then((res) => res.data);
  }

  private createUrl(endpoint: string): string {
    return `${this.config.baseURL}/${endpoint}`;
  }

  private formConfig(config: AxiosRequestConfig = {}) {
    return { ...this.config, ...(config ?? {}) };
  }

  private attachParams(url: string, params = {}): string {
    const formedSearchParams = new URLSearchParams(params);
    const formedQuery = formedSearchParams.toString()
      ? `?${formedSearchParams.toString()}`
      : '';

    return `${url}${formedQuery}`;
  }
}
