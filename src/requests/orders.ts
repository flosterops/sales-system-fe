import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import {
  IAddExtrasToCurrentOrderRequest,
  IAddPaymentRequest,
  IAddPaymentResponse,
  IEditPaymentRequest,
  IGeneratePaymentWithLinkRequest,
  IGeneratePaymentWithLinkResponse,
  IOrderResponse,
  IOrdersResponse,
} from 'models/orders';
import { isResponseError } from 'models/guards';
import { TResponse } from 'models/requests';
import { IVehicleResponse } from 'models/vehicles';
import { IOrderExtrasResponse, IOrderOrderExtrasResponse } from 'models/order-extras';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';

export const getOrdersForUser = async (token: string, userId: number) => {
  const { data } = await request.dashboard.get<TResponse<IOrdersResponse>>(
    urls.websiteUserOrders(userId),
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

export const cancelOrder = async (token: string, orderId: number) => {
  const { data } = await request.dashboard.put<TResponse<IOrdersResponse>>(
    urls.cancelOrder(orderId),
    null,
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

export const getOrderById = async (token: string, orderId: number) => {
  const { data } = await request.dashboard.get<TResponse<IOrderResponse>>(
    urls.getOrder(orderId),
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

// ToDo: remove any
export const getOrderVehicleById = async (token: string, orderId: number) => {
  const { data } = await request.dashboard.get<TResponse<IVehicleResponse>>(
    urls.getOrderVehicle(orderId),
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

export const addPaymentRequest = async (orderId: number, requestData: IAddPaymentRequest) => {
  const token = Cookies.get(ECookiesTypes.accessToken);
  const { data } = await request.dashboard.post<TResponse<IAddPaymentResponse>>(
    urls.addPayment(orderId),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not add payment');
  }

  return data;
};

export const editPaymentRequest = async (
  orderId: number,
  requestData: IEditPaymentRequest,
) => {
  const token = Cookies.get(ECookiesTypes.accessToken);
  const { data } = await request.dashboard.put<TResponse<IAddPaymentResponse>>(
    urls.editPayment(orderId),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not edit payment');
  }

  return data;
};

export const generatePaymentWithLink = async (
  orderId: number,
  requestData: IGeneratePaymentWithLinkRequest,
) => {
  const token = Cookies.get(ECookiesTypes.accessToken);
  const { data } = await request.dashboard.post<TResponse<IGeneratePaymentWithLinkResponse>>(
    urls.generatePaymentWithLink(orderId),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not add payment');
  }

  return data;
};

export const getOrderExtras = async (token: string) => {
  const { data } = await request.dashboard.get<TResponse<IOrderExtrasResponse>>(
    urls.getOrderExtras(),
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

export const getOrderOrderExtras = async (orderId: number) => {
  const token = Cookies.get(ECookiesTypes.accessToken);
  const { data } = await request.dashboard.get<TResponse<IOrderOrderExtrasResponse>>(
    urls.getOrderOrderExtras(orderId),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!isResponseError(data)) {
    return data;
  }

  return false;
};

export const addExtrasToCurrentOrder = async (
  orderId: number,
  requestData: IAddExtrasToCurrentOrderRequest,
) => {
  const token = Cookies.get(ECookiesTypes.accessToken);
  const { data } = await request.dashboard.post<TResponse<IOrderResponse>>(
    urls.addExtrasToOrder(orderId),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not add extras to the order');
  }

  return data;
};

export const addOrder = async (requestData: any) => {
  const token = Cookies.get(ECookiesTypes.accessToken);
  const { data } = await request.dashboard.post<TResponse<any>>(urls.addOrder(), requestData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!isResponseError(data)) {
    return data;
  }

  return false;
};
