import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { IBasePartExchange, IPartExchange, IPartExchangeResponse } from 'models/partExchange';
import { isResponseError } from '../models/guards';
import { TResponse } from '../models/requests';
import {
  IValuationRequest,
  IValuationResponse,
  IVehicleLookupResponse,
} from '../models/part-exchange';

export const getVehicleLookup = async (token: string, vrm: string) => {
  try {
    const { data } = await request.dashboard.get<TResponse<IVehicleLookupResponse>>(
      urls.getVehicleLookup(vrm),
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

export const getValuation = async (token: string, requestData: IValuationRequest) => {
  try {
    const { data } = await request.dashboard.post<TResponse<IValuationResponse>>(
      urls.getValuation(),
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

export const parsePartsExchangeResponse = (data: IBasePartExchange): IPartExchange => ({
  ...data,
  vehicleData: JSON.parse(data.vehicleData, (k, v) =>
    v === '0' || v === '1' ? !!parseInt(v, 10) : v,
  ),
});

export const getPartExchange = async (token: string, id: number): Promise<IPartExchange> => {
  const { data } = await request.dashboard.get<TResponse<IPartExchangeResponse>>(
    urls.getPartExchange(id),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch part exchange');
  }

  return parsePartsExchangeResponse(data.data);
};
