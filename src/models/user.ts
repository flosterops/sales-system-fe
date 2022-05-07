export interface IUserPermissions {
  appId: string;
  displayName: string;
  id: string;
  key: string;
}

export interface IAuthResponse {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  permissions: IUserPermissions[] | [];
}

export interface IUserSearchPhraseRequest {
  criteria: {
    phrase?: string;
    active?: true;
    excludedIds?: [string];
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

export interface IUserSearchPhraseResponse {
  data: {
    content: IUser[];
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

export interface IUserSearchByPhraseResponse {
  data: {
    content: IUserSearch[];
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

export interface IUser {
  id: number;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  phone: string | null;
  address1: string | null;
  mobilePhone: string | number;
  lastOrderId: number | null;
}

export interface IUserSearch {
  active: boolean;
  createdOn: string;
  email: string;
  firstName: string;
  id: string;
  lastModifiedOn: string;
  lastName: string;
}
