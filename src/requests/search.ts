import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { isResponseError } from 'models/guards';
import { TResponse } from 'models/requests';
import { ISearchResponse } from 'models/search';

export const getSearchResults = async (token: string, requestData: any) => {
  const { data } = await request.dashboard.post<TResponse<ISearchResponse>>(
    urls.search(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (isResponseError(data)) {
    return data;
  }

  return data;
};
