import { request } from 'helpers/request';
import { urls } from 'helpers/urls';
import { isResponseError } from 'models/guards';
import {
  IVehiclesSearchRequestData,
  IVehicleSearchResponse,
  IVehicleResponse,
  IVehicleImagesResponse,
  IVehicleFinanceResponse,
  IInterestCountResponse,
  IInterestResponse,
  ICancelledOrdersCountResponse,
} from 'models/vehicles';
import { Dispatch } from 'redux';
import { setVehicles } from 'store/reducers/dashboard-vehicles-reducer';
import { TResponse } from 'models/requests';
import { mapVehiclesToDashboardReduxStore } from 'helpers/vehicles';

export const getVehicle = async (
  token: string,
  id: string | number,
): Promise<IVehicleResponse> => {
  const { data } = await request.dashboard.get<TResponse<IVehicleResponse>>(
    urls.vehicleDetails(id),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch vehicle details');
  }

  return data;
};

export const getVehicleImages = async (token: string, id: string | number) => {
  const { data } = await request.dashboard.get<TResponse<IVehicleImagesResponse>>(
    urls.vehicleImages(id),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch vehicle images');
  }

  return data;
};

export const getVehicles = async (
  token: string,
  requestData: IVehiclesSearchRequestData,
): Promise<IVehicleSearchResponse> => {
  const { data } = await request.dashboard.post<TResponse<IVehicleSearchResponse>>(
    urls.vehiclesSearch(),
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

export const loadVehiclesDashboardDispatch = async (
  token: string,
  requestData: IVehiclesSearchRequestData,
  dispatch: Dispatch<any>,
) => {
  const { data } = await request.dashboard.post<TResponse<IVehicleSearchResponse>>(
    urls.vehiclesSearch(),
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!isResponseError(data)) {
    dispatch(setVehicles(mapVehiclesToDashboardReduxStore(data.data.content)));
  }
};

export const loadFinanceSummary = async (
  token: string,
  vehicleId: number,
  orderId: number,
) => {
  const { data } = await request.dashboard.get<IVehicleFinanceResponse>(
    urls.vehicleFinanceSummary(vehicleId, orderId),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch finance summary');
  }

  return data;
};

export const getInterestCount = async (token: string, vehicleId: string | number) => {
  const { data } = await request.dashboard.get<IInterestCountResponse>(
    urls.vehicleInterestCount(vehicleId),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch vehicle interest count');
  }

  return data;
};

export const getCancelledOrdersCount = async (token: string, vehicleId: string | number) => {
  const { data } = await request.dashboard.get<ICancelledOrdersCountResponse>(
    urls.orderCountCancelled(vehicleId),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch vehicle interest count');
  }

  return data;
};

export const getInterest = async (token: string, vehicleId: string | number) => {
  const { data } = await request.dashboard.get<IInterestResponse>(
    urls.vehicleInterest(vehicleId),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isResponseError(data)) {
    throw new Error('Could not fetch vehicle interest');
  }

  return data;
};
