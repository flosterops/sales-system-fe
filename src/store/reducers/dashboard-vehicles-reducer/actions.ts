import { IVehicleDashboard } from 'models/vehicles';
import { IDashboardVehiclesState } from './types';

export const setVehiclesAction = (
  state: IDashboardVehiclesState,
  action: { payload: IVehicleDashboard[] },
) => {
  state.vehicles = action.payload;
};
