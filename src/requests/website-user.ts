import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { isResponseError } from 'models/guards';
import { TResponse } from 'models/requests';
import {
  IAddWebsiteUserResponse,
  IEditWebsiteUserResponse,
  IGetWebsiteUserResponse,
  IWebsiteUserInfo,
  IWebsiteUserOrdersResponse,
  IWebsiteUserSearchPhraseRequest,
  IWebsiteUserSearchResponse,
} from 'models/webiste-user';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getBearerAuthorizationToken } from 'helpers/token';

export const setVehicleInterest = async (
  token: string,
  customerId: number | string,
  vehicleId: number | string,
) => {
  const { data } = await request.dashboard.put(
    urls.websiteUserVehicleInterest(customerId),
    {
      vehicleId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return isResponseError(data);
};

export const getWebsiteUserByPhrase = async (
  token: string,
  requestData: IWebsiteUserSearchPhraseRequest,
) => {
  const { data } = await request.dashboard.post<TResponse<IWebsiteUserSearchResponse>>(
    urls.websiteUserOnePhrase(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch vehicle data');
  }

  return data;
};

export const getWebsiteUserSearch = async (
  token: string,
  requestData: IWebsiteUserSearchPhraseRequest,
) => {
  const { data } = await request.dashboard.post<TResponse<IWebsiteUserSearchResponse>>(
    urls.websiteUserOnePhrase(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch vehicle data');
  }

  return data;
};

export const getWebsiteUserOrders = async (token: string, id: number) => {
  const { data } = await request.dashboard.get<TResponse<IWebsiteUserOrdersResponse>>(
    urls.websiteUserOrders(id),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch data');
  }

  return data;
};

export const editWebsiteUser = async (id: number, requestData: IWebsiteUserInfo) => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.dashboard.put<TResponse<IEditWebsiteUserResponse>>(
    urls.websiteUser(id),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch data');
  }

  return data;
};

export const getWebsiteUser = async (token: string, id: number | string) => {
  const { data } = await request.dashboard.get<TResponse<IGetWebsiteUserResponse>>(
    urls.websiteUser(id),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch data');
  }

  return data;
};

export const getWebsiteUserDetails = async (id: number) => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.dashboard.get<TResponse<IGetWebsiteUserResponse>>(
    urls.websiteUserDetails(id),
    {
      headers: {
        Authorization: getBearerAuthorizationToken(token),
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch data');
  }

  return data;
};

export const addNewWebsiteUser = async (requestData: IWebsiteUserInfo) => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.dashboard.post<TResponse<IAddWebsiteUserResponse>>(
    urls.addWebsiteUser(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not add WebsiteUser');
  }

  return data;
};
