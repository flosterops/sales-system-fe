export interface IWebsiteUserSearchResponse {
  data: {
    content: IWebsiteUser[];
    pageable?: {
      [key: string]: any;
    };
    last?: boolean;
    totalElements?: number | null;
    totalPages?: number | null;
    size?: number | null;
    number?: number | null;
    sort?: {
      [key: string]: any;
    };
    first?: boolean;
    numberOfElements?: number | null;
    empty?: boolean;
  };
  status: string;
}

export interface IAddWebsiteUserResponse {
  data: {
    id: number;
  };
  status: string;
}

export interface IWebsiteUser {
  id: number;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  phone: string | null;
  address1: string | null;
  mobilePhone: string | number;
  lastOrderId: number | null;
}

export interface IWebsiteUserSearchPhraseRequest {
  criteria: {
    phrase: string;
  };
  page: {
    pageNumber: number;
    pageSize: number;
    sort?: {
      orders: {
        direction: string;
        property: string;
      }[];
    };
  };
}

export interface IWebsiteUserOrdersResponse {
  data: IWebsiteUserOrder[];
  status: string;
}

export interface IWebsiteUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  townId: number | string;
  postalCodeId: number | string;
  countyId: number | string;
  address: string;
}

export interface IWebsiteUserDetails {
  active: boolean;
  address1: string;
  address2: string;
  addressInput: string;
  archive: boolean;
  authKey: string;
  county: {
    id: number;
    name: string;
  };
  email: string;
  firstname: string;
  id: number;
  lastOrderId: number | string | null;
  lastname: string;
  latitude: number;
  longitude: number;
  marketingChannels: null;
  mobilePhone: string;
  notification: boolean;
  phone: string;
  postCode: {
    deliverySince: string;
    id: number;
    latitude: number | null;
    longitude: number | null;
    postcode: string;
    town: string | number | null;
  };
  resetPasswordTokenExpire: string;
  smsConfirmed: true;
  smsTries: false;
  smsVerificationCode: string;
  title: string;
  town: {
    id: number;
    name: string;
  };
}

export interface IEditWebsiteUserResponse {
  data: {
    id: number;
  };
  status: string;
}

export interface IGetWebsiteUserResponse {
  data: IWebsiteUserDetails;
  status: string;
}

export interface IWebsiteUserOrder {
  addonsCardPayment: boolean;
  adminNote: string | null;
  apiNotified: boolean;
  collectionPlace: string | null;
  county: string | null;
  createdDate: string;
  deliveryAddress1: string | null;
  deliveryAddress2: string | null;
  deliveryAddressInput: string | null;
  deliveryAddressNote: string | null;
  deliveryTime: string | null;
  driver: string | null;
  id: number;
  internalTransferTime: string | null;
  latitude: string | null;
  longitude: string | null;
  orderFillingTime: string | null;
  orderStatus: { id: number; name: string; systemName: string };
  partExchange: null;
  // Required to do JSON.parse. From BE comes as JSON string;
  paymentData: string;
  paymentId: string;
  paymentStatus: { id: number };
  paymentType: { id: number };
  phone: string;
  postCode: {
    deliverySince: string;
    id: number;
    latitude: string | null;
    longitude: string | null;
    postcode: 'SL4 8EK';
    town: string | null;
  };
  reservation: boolean;
  // Need to check real coming data. Might be string or number;
  settleBalance: string | number | null;
  totalPrice: number;
  town: string | null;
  trackingData: string | null;
  type: string;
  uuid: string;
  vehicleId: number;
  vehiclePrice: number;
  vrm: string;
  websiteUserId: number;
}
