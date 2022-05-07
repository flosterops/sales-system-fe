export interface IOrderExtras {
  description: string;
  financeAvailable: boolean;
  name: string;
  orderExtraId: number;
  orderExtrasGroupName: string;
  systemName: string;
}

export interface IOrderExtrasResponse {
  data: IOrderExtras[];
}

export enum OrderExtrasGroups {
  ExtendedWarranty = 'Extended warranty',
  PaintProtection = 'Paint protection',
  GAPInsurance = 'GAP Insurance',
}

export enum OrderExtrasWarranties {
  OneYearWarranty = '1-yr-warranty',
  TwoYearsWarranty = '2-yr-warranty',
  ThreeYearsWarranty = '3-yr-warranty',
}

export interface IOrderOrderExtrasResponse {
  data: { name: string; orderExtraId: number; price: number }[];
}
