export interface IVehicleLookupResponse {
  data: IVehicleLookup;
}

export interface IVehicleLookup {
  make: string;
  modelRange: string;
  model: string;
  derivative: string;
  ukDateFirstRegistered: string;
  exteriorColour: string;
  engineCapacity: number;
  fuel: string;
  yearOfManufacture: number;
  vinSerialNumber: string;
  keeperChangesCount: number;
  engineNumber: string;
  transmission: string;
  noOfDoors: number;
  bodyStyle: string;
}

export interface IValuationRequest {
  vehicleVrm: string;
  websiteUserId: number;
  keysAnswerCode: string;
  hasDamageAnswerCode: string;
  motAnswerCode: string;
  serviceHistoryAnswerCode: string;
  isImportAnswerCode: string;
  v5LogbookAnswerCode: string;
  keepOwnRegAnswerCode: string;
  vehicleUseAnswerCode: string;
  mechanicalIssuesAnswerCode: string;
  totalLossAnswerCode: string;
  documentedMileageChangeAnswerCode: string;
  leftHandDriveAnswerCode: string;
  lightConditionAnswerCode: string;
  vehicleMileageAnswerCode: string;
  vehicleMileageValue: number;
  confirmSettlementAnswerCode: string;
  hasOutstandingFinanceAnswerCode: string;
  outstandingFinanceAmount: number | string;
}

export interface IValuationResponse {
  data: IValuation;
  status: string;
}

export interface IValuation {
  vehicleValuation?: number;
  partExchangeId?: number;
}
