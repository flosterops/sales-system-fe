import { EVehicleStatuses, IVehicleDashboard, IVehicleSearchResponse } from 'models/vehicles';
import { ISelectOptionsModel } from 'widgets/Form/Select';

export const mapVehicleToDashboardReduxStore = (data: {
  [key: string]: any;
}): IVehicleDashboard => ({
  id: data.id,
  stockId: data.stockId || '',
  registration: data.registration || '',
  make: data?.make?.name || '',
  model: data?.model?.name || '',
  variant: data.modelVariant || '',
  mileage: data.mileage || '',
  daysInStock: data.daysInStock || 0,
  price: data.price || '',
});

export const mapVehiclesToDashboardReduxStore = (
  data: IVehicleSearchResponse['data']['content'],
): IVehicleDashboard[] | [] => {
  const result: IVehicleDashboard[] = [];
  data.forEach((el: Record<string, any>) => {
    result.push(mapVehicleToDashboardReduxStore(el));
  });

  return result.length ? result : [];
};

export const getVehicleStatus = (sold: boolean, advertise: boolean): EVehicleStatuses => {
  if (sold) {
    return EVehicleStatuses.sold;
  }

  return advertise ? EVehicleStatuses.advertise : EVehicleStatuses.notAdvertise;
};

export const vehicleStatusOptions: ISelectOptionsModel[] = [
  {
    value: 'all',
    label: EVehicleStatuses.all,
  },
  {
    value: 'sold',
    label: EVehicleStatuses.sold,
  },
  {
    value: 'advertise',
    label: EVehicleStatuses.advertise,
  },
  {
    value: 'notAdvertise',
    label: EVehicleStatuses.notAdvertise,
  },
];
