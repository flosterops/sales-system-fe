import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { isResponseError } from 'models/guards';
import { TResponse } from 'models/requests';
import { IUserSearchByPhraseResponse, IUserSearchPhraseRequest } from 'models/user';
import Cookies from 'js-cookie';
import { getBearerAuthorizationToken } from 'helpers/token';
import { ECookiesTypes } from 'models/cookies';

export interface IFetchUserAppsResponse {
  data: IUserApp[];
  status: 'success' | 'failed';
}

export interface IUserApp {
  displayName: string;
  id: string;
  key: string;
}

export const getUsersByPhrase = async (
  token: string,
  requestData: IUserSearchPhraseRequest,
) => {
  const { data } = await request.dashboard.post<TResponse<IUserSearchByPhraseResponse>>(
    urls.searchUser(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch users data');
  }

  return data;
};

export const fetchUserApps = async (): Promise<TResponse<IFetchUserAppsResponse>> => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.auth.get<IFetchUserAppsResponse>(urls.userApps(), {
    headers: { Authorization: getBearerAuthorizationToken(token) },
  });

  if (isResponseError(data)) {
    return data;
  }

  return data;
};
