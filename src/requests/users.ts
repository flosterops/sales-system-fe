import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { isResponseError } from 'models/guards';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { TResponse } from 'models/requests';

export interface IFetchUserBody {
  criteria: Record<string, any>;
  page: {
    pageNumber: number;
    pageSize: number;
  };
}

export interface IFetchUserResponse {
  data: {
    content: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
  };
}

export const fetchUsers = async (body: IFetchUserBody) => {
  const { data } = await request.dashboard.post<TResponse<IFetchUserResponse>>(
    urls.userSearch(),
    body,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get(ECookiesTypes.accessToken) || ''}`,
      },
    },
  );

  if (!isResponseError(data)) {
    return data;
  }

  return data;
};
