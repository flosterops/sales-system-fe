export interface ICountyRequest {
  criteria: {
    name: string;
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

export interface ICounty {
  id: number;
  name: string;
}

export interface ICountyData {
  content: ICounty[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number | null;
  numberOfElements?: number | null;
  pageable?: {
    [key: string]: any;
  };
  size?: number | null;
  sort?: {
    [key: string]: any;
  };
  totalElements?: number | null;
  totalPages?: number | null;
}

export interface ICountyResponse {
  data: ICountyData;
  status: string;
}
