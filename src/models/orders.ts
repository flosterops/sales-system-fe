import { IDeliverySlots } from './calendar';
import { IPartExchange } from './partExchange';
import { ITask } from './task';
import { IVehicle, IVehicleImage, IVehiclePayment } from './vehicles';

export enum EOrderTabType {
  task = 'task',
  customer = 'customer',
}

export interface IOrdersResponse {
  data: IOrder[];
}

export type PostCode = {
  id: number;
  postcode: string;
  latitude: number;
  longitude: number;
  deliverySince: string | null;
  town: string | null;
};

export interface IOrder {
  id: number;
  vehicleId: number;
  websiteUserId: number;
  postCode: PostCode;
  deliveryAddress1: string;
  deliveryAddress2: string | null;
  deliveryAddressInput: string;
  county: string | null;
  town: string | null;
  createdDate: string;
  totalPrice: number;
  orderStatus: {
    id: number;
    name: OrderStatuses;
  };
  paymentStatus: {
    id: number;
    // ToDo add payment statuses
    name: string;
  };
  paymentType?: {
    id: number;
    name: string;
  };
  partExchange?: {
    id: number;
  };
  type: string;
  uuid: string;
  deliveryTime: string;
  deliveryAddressNote: string;
  collectionPlace: number;
}

export enum OrderStatuses {
  INITIALISED = 'Initialised',
  AWAITING_PAYMENT = 'Awaiting payment',
  COMPLETING_ORDER = 'Completing order',
  WAITING_FOR_DELIVERY = 'Waiting for delivery',
  CONFIRMED_BY_DRIVER = 'Confirmed by driver',
  DRIVER_STARTED_ROUTE = 'Driver started his route',
  DELIVERY_IN_15 = 'Delivery in 15 minutes',
  WITH_CUSTOMER = 'With customer',
  COMPLETED = 'Order completed',
  CANCELLED = 'Cancelled',
  READY_TO_COLLECT = 'Ready to collect',
}

// Context models
export interface IOrdersApiRequests {
  fetchOrders: () => Promise<void>;
  updateFinanceSummary: () => Promise<void>;
  cancelOrder: (id: number) => Promise<void>;
  fetchTabDetails: (id: number) => Promise<void>;
}

export interface IOrdersTabContext {
  isLoading: boolean;
  orders?: IOrder[] | null;
  activeOrder?: IOrder;
  orderTabDetails?: ITabDetails;
  controller: IOrdersApiRequests;
}

export interface ITabDetails {
  vehicleDetails?: IVehicle;
  vehicleImages?: {
    vehiclePrimaryImages: IVehicleImage[];
    vehicleImperfectionsImages: IVehicleImage[];
    vehicle360Images: IVehicleImage[];
  };
  availableDeliverySlots?: IDeliverySlots;
  partExchange?: IPartExchange;
  orderTasks?: ITask[];
  financeSummary?: IVehiclePayment[];
}

export interface IOrderResponse {
  data: IOrder;
}

export interface IAddPaymentRequest {
  contactId?: number;
  amount: number;
  description: string;
  paymentId?: string;
  agreementNumber: string;
  vehicleAccountType: string;
}

export interface IEditPaymentRequest extends IAddPaymentRequest {
  vehicleAccountingId: number;
}

export interface IGeneratePaymentWithLinkRequest extends Partial<IAddPaymentRequest> {}

export interface IAddPaymentResponse {
  data: number;
  status: string;
}

export interface IGeneratePaymentWithLinkResponse {
  data: string;
  status: string;
}

export enum AddOrderSteps {
  findVehicle = 'findVehicle',
  findCustomer = 'findCustomer',
  partExchange = 'partExchange',
  addOns = 'addOns',
  collectionDelivery = 'collectionDelivery',
  payment = 'payment',
}

export interface IAddExtrasToCurrentOrderRequest {
  orderExtras: { id: number; currentPrice: number }[];
}

export interface IAddOrderRequest {
  vehicleId: number | null;
  websiteUserId: number | null;
  postCodeId: number | null;
  deliveryAddress1: string | null;
  deliveryAddress2: string | null;
  countyId: number | null;
  townId: number | null;
  phone: string | null;
  paymentTypeId: number;
  paymentStatusId: number;
  partExchangeId: number | null;
  vehiclePrice: number;
  totalPrice: number;
  orderStatusId: number;
  type: string;
  orderExtrasIds: { id: number | string; currentPrice: number | string }[];
  collectionPlace: number;
  reservation: boolean;
  deliveryAddressNote: string;
}
