export type TResponse<T> = IErrorResponse | T;

export interface IErrorResponse {
  error: string;
  error_description: string;
}

export interface IError {
  error: string;
  errorDescription: string;
}
