import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { getBearerAuthorizationToken } from 'helpers/token';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { isResponseError } from 'models/guards';
import { TResponse } from 'models/requests';

interface IChangePasswordBody {
  password: string;
  confirmPassword: string;
}

export const changePassword = async (body: IChangePasswordBody): Promise<{}> => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.auth.post<TResponse<{}>>(urls.changePassword(), body, {
    headers: {
      Authorization: getBearerAuthorizationToken(token),
    },
  });

  if (isResponseError(data)) {
    return data;
  }

  return data;
};
