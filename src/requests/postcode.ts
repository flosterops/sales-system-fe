import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { isResponseError } from 'models/guards';
import { IPostcodeRequest, IPostcodeResponse } from 'models/postcode';
import { TResponse } from 'models/requests';

const getPostCodeList = async (token: string, requestData: IPostcodeRequest) => {
  const { data } = await request.dashboard.post<TResponse<IPostcodeResponse>>(
    urls.getPostCode(),
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

export { getPostCodeList };
