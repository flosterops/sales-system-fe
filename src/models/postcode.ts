export interface IPostcodeRequest {
  criteria: {
    postCode: string;
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

export interface IPost {
  deliverySince: number | string | null;
  id: number;
  latitude: number;
  longitude: number;
  postcode: string;
  town: number | null;
}

export interface IPostData {
  content: IPost[];
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

export interface IPostcodeResponse {
  data: IPostData;
  status: string;
}
