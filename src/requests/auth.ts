import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { TResponse } from 'models/requests';
import { isResponseError } from 'models/guards';
import { ITasksResponse } from 'models/task';

export const auth = async (token: string): Promise<TResponse<ITasksResponse>> => {
  const { data } = await request.auth.get<TResponse<ITasksResponse>>(urls.auth(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (isResponseError(data)) {
    return data;
  }
  return data;
};
