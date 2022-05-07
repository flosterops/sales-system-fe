export interface IVehicleFilters {
  stockId: string;
  registration: string;
  make: string;
  model: string;
  modelVariant: string;
  mileageMin: number | null;
  mileageMax: number | null;
  daysInStock: number | null;
  priceMin: number | null;
  priceMax: number | null;
  status: string;
  sold?: boolean | string;
  advertised?: boolean | string;
}
