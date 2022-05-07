import { IDashboardCustomer } from 'models/customer';

export interface IDashboardCustomersState {
  customers: IDashboardCustomer[] | null;
}
