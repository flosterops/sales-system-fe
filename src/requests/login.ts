import { TResponse } from 'models/requests';
import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { ILoginData, ILoginResponse } from 'models/login-request';
import { BASIC_AUTHORIZATION_TOKEN } from 'helpers/token';
import { lowDashToCamelCase } from 'helpers/response-parser';
import { isResponseError } from 'models/guards';

interface ILoginOptions {
  email: string;
  password: string;
}

export const login = async (options: ILoginOptions): Promise<TResponse<ILoginData>> => {
  const query = new URLSearchParams({
    scope: 'read',
    grant_type: 'password',
    password: options.password,
    username: options.email,
  });
  const headers = { Authorization: BASIC_AUTHORIZATION_TOKEN };
  const { data } = await request.auth.post<ILoginResponse>(
    urls.refresh(`?${query.toString()}`),
    null,
    {
      headers,
    },
  );

  const lowDashedData = lowDashToCamelCase<ILoginData>(data);

  if (isResponseError(data)) {
    return lowDashedData;
  }
  return lowDashedData;
};
