import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { isResponseError } from 'models/guards';
import { TResponse } from 'models/requests';
import { ITownRequest, ITownResponse } from 'models/town';

const getTownList = async (token: string, requestData: ITownRequest) => {
  const { data } = await request.dashboard.post<TResponse<ITownResponse>>(
    urls.getTown(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch PostCode data');
  }

  return data;
};

export { getTownList };
