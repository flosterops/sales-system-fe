export interface IBusinessUserRequestData {
  criteria: {
    phrase: string;
    active?: true;
    excludedIds?: string[];
  };
  page: {
    pageNumber: number;
    pageSize: number;
    sort?: {
      orders: [
        {
          direction: string;
          property: string;
        },
      ];
    };
  };
}
export interface IBusinessUserResponse {
  data: {
    content: IBusinessUser[];
    pageable?: object | null;
    last?: boolean | null;
    totalElements?: number | null;
    totalPages?: number | null;
    size?: number;
    number?: number;
    sort?: object | null;
    first?: boolean;
    numberOfElements?: number;
    empty?: boolean;
  };
  status: string;
}
export interface IBusinessUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
  createdOn: string;
  lastModifiedOn: string;
}
