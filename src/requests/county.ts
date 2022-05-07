import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { ICountyRequest, ICountyResponse } from 'models/county';
import { isResponseError } from 'models/guards';
import { TResponse } from 'models/requests';

const getCountyList = async (token: string, requestData: ICountyRequest) => {
  const { data } = await request.dashboard.post<TResponse<ICountyResponse>>(
    urls.getCounty(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch County data');
  }

  return data;
};

export { getCountyList };
