import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { TResponse } from 'models/requests';
import {
  IBusinessUser,
  IBusinessUserRequestData,
  IBusinessUserResponse,
} from 'models/business-user';
import { isResponseError } from '../models/guards';

export const searchUsers = async (
  token: string,
  requestData: IBusinessUserRequestData,
): Promise<IBusinessUser[] | []> => {
  const { data } = await request.dashboard.post<TResponse<IBusinessUserResponse>>(
    urls.userSearch(),
    requestData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (isResponseError(data)) {
    return [];
  }

  return data.data.content;
};
