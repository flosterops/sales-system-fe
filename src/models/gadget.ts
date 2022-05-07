export enum EGadgetTypes {
  customers = 'CUSTOMERS',
  taskQueue = 'TASK_QUEUE_TABLE',
  vehicles = 'VEHICLES',
  breakList = 'BREAK_LIST_TABLE',
  workerStatistics = 'WORKER_STATISTICS',
  newEnquiry = 'NEW_ENQUIRY',
}

export enum EGadgetSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export interface IGadget {
  type: EGadgetTypes;
}

export interface IDashboardComponent {
  dashboardComponentType: string;
  name: string;
}

export interface IGadgetDashboardComponent {
  type: EGadgetTypes;
  id: string;
}

export interface IAllowedDashboardComponentResponse {
  data: IDashboardComponent[];
  status: string;
}

export interface IDashboardComponentResponse {
  id: string;
  userId: string;
  dashboardComponent: IDashboardComponent;
  dashboardComponentUserOrder: number | null;
}

export interface IDashboardComponentsResponse {
  data: IDashboardComponentResponse[];
  status: string;
}

export interface IGadgetResponse {
  data: string[];
  status: string;
}

export interface IUserComponentDeleteResponse {
  data: string;
  status: string;
}

export const gadgetMapSizes = {
  [EGadgetTypes.customers]: EGadgetSize.large,
  [EGadgetTypes.vehicles]: EGadgetSize.large,
  [EGadgetTypes.taskQueue]: EGadgetSize.medium,
  [EGadgetTypes.breakList]: EGadgetSize.small,
  [EGadgetTypes.workerStatistics]: EGadgetSize.small,
  [EGadgetTypes.newEnquiry]: EGadgetSize.large,
};

export const gadgetManagerType = 'GADGETS_MANAGER';
