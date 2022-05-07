export interface IBasePartExchange {
  id: number;
  websiteUserId: number;
  registration: string;
  mileage: number;
  vehicleData: string;
  valuation: number;
  dateAdded: string;
  trackingData: null;
}

export interface IPartExchangeResponse {
  data: IBasePartExchange;
  status: string;
}

export interface IPartExchange extends Omit<IBasePartExchange, 'vehicleData'> {
  vehicleData: IPartExchangeVehicleData;
}

export interface IPartExchangeVehicleData {
  keys: boolean;
  hasDamage: boolean;
  mot: boolean;
  serviceHistory: boolean;
  V5Logbook: boolean;
  keepOwnReg: boolean;
  vehicleUse: boolean;
  mechanicalIssues: boolean;
  lightCondition: string;
  totalLoss: boolean;
  documentedMileageChange: boolean;
  leftHandDrive: boolean;
  hasOutstandingFinance: boolean;
  outstandingFinanceAmount: number;
  confirmSettlement: boolean;
  isImport?: boolean;
  vehicle: IPartsExchangeVehicle;
}

export interface IPartsExchangeVehicle {
  VehicleID: number;
  VehicleSourceCode: string;
  Vrm: string;
  CapCode: string;
  CapId: number;
  DateOfFirstRegistration: Date;
  Make: string;
  ModelRange: string;
  Model: string;
  Derivative: string;
  PlateID: number;
  Plate: number;
  UKDateFirstRegistered: Date;
  ExteriorColour: string;
  EngineCapacity: number;
  Fuel: string;
  Exported: boolean;
  YearOfManufacture: number;
  VINSerialNumber: string;
  Imported: boolean;
  KeeperChangesCount: number;
  EngineNumber: string;
  Transmission: string;
  Sector: string;
  Trim: string;
  NoOfDoors: number;
  BodyStyle: string;
}
