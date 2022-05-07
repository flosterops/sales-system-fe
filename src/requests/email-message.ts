import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { isResponseError } from 'models/guards';
import {
  IEmailMessageListRequest,
  IEmailMessageResponse,
  IMessagesListResponse,
  ISendEmailRequest,
  ISendTextMessage,
} from 'models/email-message';
import { TResponse } from 'models/requests';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';

export const listAllEmailMessages = async (
  token: string,
  requestData: IEmailMessageListRequest,
) => {
  const { data } = await request.dashboard.post<TResponse<IEmailMessageResponse>>(
    urls.emailMessageList(),
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

export const sendEmailMessage = async (requestData: ISendEmailRequest) => {
  const token = Cookies.get(ECookiesTypes.accessToken);
  const { data } = await request.dashboard.post<TResponse<IMessagesListResponse>>(
    urls.sendEmail(),
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

export const sendTextMessage = async (requestData: ISendTextMessage) => {
  const token = Cookies.get(ECookiesTypes.accessToken);
  const { data } = await request.dashboard.post<TResponse<IMessagesListResponse>>(
    urls.sendMessage(),
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

export const messagesList = async (websiteUserId: number | string) => {
  const token = Cookies.get(ECookiesTypes.accessToken);
  const { data } = await request.dashboard.get<TResponse<IMessagesListResponse>>(
    urls.messages(websiteUserId),
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
