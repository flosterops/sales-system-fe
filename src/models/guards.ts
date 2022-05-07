import { IErrorResponse, TResponse } from './requests';

export const isString = (value: any): value is string => typeof value === 'string';

export const isFunction = (value: any): value is Function => typeof value === 'function';

export const isResponseError = <T>(value: TResponse<T>): value is IErrorResponse =>
  // eslint-disable-next-line no-prototype-builtins
  (value as object).hasOwnProperty('error');
