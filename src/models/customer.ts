export interface ICustomerRequestData {
  criteria: {
    firstname?: string;
    lastname?: string;
    phone?: string;
    email?: string;
  };
  page: {
    pageNumber?: number;
    pageSize?: number;
    sort?: {
      orders: {
        direction: string;
        property: string;
      }[];
    };
  };
}
export interface ICustomerSearch {
  id: number;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  phone: string | null;
  address1: string | null;
  combinedAddress: string | null;
  mobilePhone: string | null;
  lastOrderId: string | number | null;
}
export interface ICustomerSearchResponse {
  data: {
    content: ICustomerSearch[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: 0;
  };
  status: string;
}

export interface IDashboardCustomer {
  id: number;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  phone: string | null;
  address1: string | null;
  mobilePhone: string | null;
  lastOrderId: string | number | null;
}

export interface ICustomerFilters {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  fullName: string;
  address: string;
}
