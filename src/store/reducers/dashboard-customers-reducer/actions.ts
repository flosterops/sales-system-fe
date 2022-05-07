import { IDashboardCustomer } from 'models/customer';
import { IDashboardCustomersState } from './types';

export const setCustomersAction = (
  state: IDashboardCustomersState,
  action: { payload: IDashboardCustomer[] },
) => {
  state.customers = action.payload;
};
