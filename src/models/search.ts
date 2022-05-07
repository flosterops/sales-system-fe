export interface ISearchRequestData {
  criteria: {
    query: string;
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

export interface ISearchVehicle {
  descriptionText: string | null;
  feedDescription: string | null;
  make: string;
  model: string;
  modelVariant: string | null;
  shortDescription: string | null;
  mileage: number | null;
  price: number | null;
  primaryImageFileName: string | null;
  registration: string | null;
  registrationDate: string | null;
  transmission: string | null;
  vehicleFuelTypeName: string | null;
  vehicleId: number;
  thumbnail?: string | null;
}

export interface ISearchResponse {
  data: {
    content: ISearchVehicle[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
  status: string;
}
