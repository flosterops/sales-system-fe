import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { ISaveDeliveryDateRequestData } from 'models/delivery';
import { isResponseError } from 'models/guards';
import { TResponse } from 'models/requests';
import { IAvailableDeliveryDatesResponse } from '../models/calendar';

export const getAvailableDeliveryDates = async (token: string, orderId: number) => {
  try {
    const { data } = await request.dashboard.get<TResponse<IAvailableDeliveryDatesResponse>>(
      urls.getAvailableDeliveryDates(orderId),
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
  } catch (e) {
    console.error(e);
    return null;
  }
};

interface InitialSaveDeliveryResponse {
  data: {};
  status: 'sucess' | 'failed';
}

export const saveDeliveryDate = async (
  token: string,
  orderId: number,
  requestData: ISaveDeliveryDateRequestData,
) => {
  try {
    const { data } = await request.dashboard.put<TResponse<InitialSaveDeliveryResponse>>(
      urls.saveDeliveryDate(orderId),
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
  } catch (e) {
    console.error(e);
    return null;
  }
};
