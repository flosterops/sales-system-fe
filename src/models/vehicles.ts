import { IWebsiteUserDetails } from './webiste-user';

export enum EMileage {
  from = 'from',
  to = 'to',
}

export enum EPrice {
  from = 'from',
  to = 'to',
}

export enum EVehicleStatuses {
  all = 'All',
  sold = 'Sold',
  advertise = 'Advertised',
  notAdvertise = 'Not advertised',
}

export interface IVehicleSearchRequestCriteria {
  stockId?: string;
  vrm?: string;
  make?: string;
  model?: string;
  variant?: string;
  mileage?: {
    [key in EMileage]: number;
  };
  daysInStock?: number;
  price?: {
    [key in EPrice]: number;
  };
}

export interface IVehicleSearchRequestPage {
  pageNumber?: number;
  pageSize?: number;
  sort?: {
    orders?: {
      direction: string;
      property: string;
    }[];
  };
}

export interface IVehiclesSearchRequestData {
  criteria: IVehicleSearchRequestCriteria;
  page: IVehicleSearchRequestPage;
}

export interface IVehicleSearchResponse {
  data: {
    content: IVehicle[] | [];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
  status: string;
}

export interface IVehiclePayment {
  id: number;
  paymentId: string;
  description: string;
  agreementNumber: unknown;
  amount: number;
  contactName: string;
  datetime: string;
  vehicleAccountingVatName: EVehicleAccountingVatName;
}

export interface IVehicleFinanceResponse {
  status: string;
  data: IVehiclePayment[];
}
/**
 * Vehicle Details
 */
export interface IVehicleResponse {
  data: IVehicle;
  status: string;
}

export enum ImagesTypes {
  IMAGES360 = 'vehicle360Images',
  BLEMISHES = 'vehicleImperfectionsImages',
  IMAGES = 'vehiclePrimaryImages',
}

export interface IVehicleImages {
  [ImagesTypes.IMAGES360]: IVehicleImage[];
  [ImagesTypes.BLEMISHES]: IVehicleImage[];
  [ImagesTypes.IMAGES]: IVehicleImage[];
}

export interface IVehicleImagesResponse {
  data: IVehicleImages;
  status: string;
}

// TODO: Prepare interface for content
export interface IVehicle {
  id: number;
  registration: string;
  stockId: string;
  make: {
    id: number;
    name: string;
    slug?: string;
  };
  model: {
    id: number;
    name: string;
    slug?: string;
  };
  mileage: number;
  modelVariant: string;
  vehicleBody: {
    id: number;
    name: string;
  };
  registrationDate: string;
  previousKeepers: number;
  vinNumber: string;
  capCode: number | null;
  motExpires: string | null;
  vatQualifying: boolean;
  price: number;
  sold: boolean;
  advertise: boolean;
  vehicleSpecificationEngine: IVehicleSpecificationEngine;
}

export interface IVehicleSpecificationEngine {
  id: number;
  capacity: number | null;
  cylinders: number;
  drivenAxle: string;
  euroStatus: number;
  bhp: number;
  torque: number;
  co2: number;
  vehicleFuelType: IMappedProperty;
  vehicleTransmission: IMappedProperty;
  gearsForward: number;
  acceleration62Mph: number;
  maxSpeedMph: number;
  mpg: number;
  mpgUrban: number;
  mpgExtraUrban: number;
  steeringWheel: string;
  taxRate6Months: number;
  taxRate12Months: number;
}

export interface IMappedProperty {
  id: number;
  name: string;
  slug: string;
  active: boolean;
  basicType?: string;
}

export interface IVehiclesMakeOrModel {
  active: boolean;
  id: number;
  name: string;
  slug: string;
}

export interface IVehicleDashboard {
  id: number | string;
  make: IVehiclesMakeOrModel;
  model: IVehiclesMakeOrModel;
  price: number | '';
  registration: string;
  stockId: string;
  variant: string;
  mileage: number | '';
  daysInStock: number | '';
}

export type CarouselItem = {
  original: string;
  thumbnail: string;
};

export interface IVehicleImage {
  title?: string | null;
  description?: string | null;
  fileName: string;
  thumbnail?: string;
}

export enum EVehicleAccountingVatName {
  OneYearWarranty = '1 year warranty',
  TwoYearWarranty = '2 year warranty',
  ThreeYearWarranty = '3 year warranty',
  AdministrationFee = 'Administration Fee',
  FinanceSettlement = 'Finance Settlement',
  ForcedPayment = 'Forced Payment',
  GAPInsurance = 'GAP Insurance',
  NextDayDelivery = 'Next Day Delivery',
  PaintProtection = 'Paint protection',
  PartnerCost = 'Partner Cost',
  PartExchangeVehiclePrice = 'Part Exchange Vehicle Price',
  Payment = 'Payment',
  PaymentRequest = 'Payment requested',
  PurchaseAdditionalCost = 'Purchase Additional Cost',
  PurchaseAuctionFee = 'Purchase Auction Fee',
  PurchaseTransportCost = 'Purchase Transport Cost',
  VehiclePurchaseCost = 'Vehicle Purchase Cost',
  VehicleSalePrice = 'Vehicle Sale Price',
  StandardDelivery = 'Standard Delivery',
  V5Deposit = 'V5 Deposit',
  VehicleTax = 'Vehicle Tax',
}

export enum EVehicleAccountingVatId {
  OneYearWarranty = '1-yr-warranty',
  TwoYearWarranty = '2-yr-warranty',
  ThreeYearWarranty = '3-yr-warranty',
  AdministrationFee = 'administration-fee',
  FinanceSettlement = 'finance-settlement',
  ForcedPayment = 'forced-payment',
  GAPInsurance = 'gap-insurance',
  NextDayDelivery = 'next-day-delivery',
  PaintProtection = 'paint-protection',
  PartnerCost = 'partner_cost',
  PartExchangeVehiclePrice = 'part_exchange_vehicle_price',
  Payment = 'payment',
  PaymentRequest = 'payment-request',
  PurchaseAdditionalCost = 'purchase_additional_cost',
  PurchaseAuctionFee = 'purchase_auction_fee',
  PurchaseTransportCost = 'purchase_transport_cost',
  VehiclePurchaseCost = 'purchase_vehicle_cost',
  VehicleSalePrice = 'sale_vehicle_price',
  StandardDelivery = 'standard-delivery',
  V5Deposit = 'v5-deposit',
  VehicleTax = 'vehicle-tax',
}

export interface IInterestCountResponse {
  status: string;
  data: number;
}

export interface ICancelledOrdersCountResponse {
  status: string;
  data: number;
}

export interface IInterestResponse {
  status: string;
  data: IInterestData[];
}

export interface IInterestData {
  createdOn: string;
  description: string;
  vehicle: IVehicle;
  websiteUser: IWebsiteUserDetails;
}
