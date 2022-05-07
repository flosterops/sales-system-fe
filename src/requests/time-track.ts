import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { isResponseError } from 'models/guards';
import {
  EBreakStatuses,
  IBreakReasonsResponse,
  IConfirmActivityResponse,
  IInitiateBreakResponse,
  ITimeTrackSearchRequest,
  ITimeTrackSearchResponse,
} from 'models/time-track';
import { TResponse } from 'models/requests';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';

export const getTimeTrack = async (token: string, requestData: ITimeTrackSearchRequest) => {
  const { data } = await request.dashboard.post<TResponse<ITimeTrackSearchResponse>>(
    urls.timeTrackList(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!isResponseError(data)) {
    return data;
  }

  return data;
};

export const loadTimeTrackDashboardDispatch = async (
  token: string,
  requestData: ITimeTrackSearchRequest,
) => {
  const { data } = await request.dashboard.post<TResponse<ITimeTrackSearchResponse>>(
    urls.timeTrackList(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch break list');
  }

  return data;
};

export const fetchBreakReasons = async (): Promise<TResponse<IBreakReasonsResponse>> => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.dashboard.get<TResponse<IBreakReasonsResponse>>(
    urls.timeTrackStatuses(),
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (isResponseError(data)) {
    return data;
  }

  return data;
};

export const initiateBreak = async (
  reason: EBreakStatuses,
): Promise<TResponse<IInitiateBreakResponse>> => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.dashboard.post<TResponse<IInitiateBreakResponse>>(
    urls.timeTrackInitiateBreak(),
    {
      breakStatus: reason,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (isResponseError(data)) {
    return data;
  }

  return data;
};

export const confirmActivity = async (): Promise<TResponse<IConfirmActivityResponse>> => {
  const token = Cookies.get(ECookiesTypes.accessToken) || '';
  const { data } = await request.dashboard.post<TResponse<IConfirmActivityResponse>>(
    urls.timeTrackConfirmActivity(),
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (isResponseError(data)) {
    return data;
  }

  return data;
};
