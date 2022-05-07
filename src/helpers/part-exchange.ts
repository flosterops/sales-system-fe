import { format } from 'date-fns';
import { IPartExchange, IPartsExchangeVehicle } from 'models/partExchange';
import { DataColumn } from 'pages/TaskPage/shared/MultiColumnTable';
import { IInitialPXSpecification, IInitialPXVehicleDataFormValues } from 'models/forms';
import { valueToBoolean } from 'widgets/Form/Checkbox';
import { IValuationRequest } from 'models/part-exchange';
import { IWebsiteUserDetails } from 'models/webiste-user';

export const getVehicleDetailsAsTable = (vehicle: IPartsExchangeVehicle): DataColumn[] => [
  {
    rowData: [
      {
        label: 'VRM',
        value: vehicle?.Vrm?.toLocaleUpperCase(),
      },
      {
        label: 'Fuel',
        value: vehicle?.Fuel,
      },
      {
        label: 'VIN',
        value: vehicle?.VINSerialNumber,
      },
      {
        label: 'Engine number',
        value: vehicle?.EngineNumber,
      },
    ],
  },
  {
    rowData: [
      {
        label: 'Make',
        value: vehicle?.Make?.toLocaleUpperCase(),
      },
      {
        label: 'Year',
        value: vehicle?.YearOfManufacture.toString(),
      },
      {
        label: 'Previous Keepers',
        value: vehicle?.KeeperChangesCount ? vehicle.KeeperChangesCount.toString() : '-',
      },
      {
        label: 'Engine capacity',
        value: vehicle?.EngineCapacity ? vehicle.EngineCapacity.toString() : 'n/a',
      },
    ],
  },
  {
    rowData: [
      {
        label: 'Model',
        value: vehicle?.ModelRange?.toLocaleUpperCase(),
      },
      {
        label: 'Body',
        value: vehicle?.BodyStyle?.toLocaleUpperCase(),
      },
      {
        label: 'Transmission',
        value: vehicle?.Transmission,
      },
      {
        label: '',
        value: '',
      },
    ],
  },
  {
    rowData: [
      {
        label: 'Derivative',
        value: vehicle?.Derivative?.toLocaleUpperCase(),
      },
      {
        label: 'Registration Date',
        value: vehicle?.DateOfFirstRegistration
          ? format(new Date(vehicle?.DateOfFirstRegistration), 'dd/MM/yyyy')
          : '',
      },
      {
        label: 'No of doors',
        value: vehicle?.NoOfDoors?.toString(),
      },
      {
        label: '',
        value: '',
      },
    ],
  },
];

const parseBooleanLabel = (value: boolean) => (value ? 'Yes' : 'No');

export const getPartExchangeDetailsAsTable = (partExchange: IPartExchange): DataColumn[] => [
  {
    rowData: [
      {
        label: 'Have at least 2 working sets of keys',
        value: parseBooleanLabel(partExchange.vehicleData.keys),
      },
      {
        label:
          'There is no major damage to the exterior or interior of the vehicle beyond the selected condition grade',
        value: parseBooleanLabel(partExchange.vehicleData.hasDamage),
      },
      {
        label: 'Vehicle has at least 3 months MOT',
        value: parseBooleanLabel(partExchange.vehicleData.mot),
      },
      {
        label: 'Vehicle has a full service history',
        value: parseBooleanLabel(partExchange.vehicleData.serviceHistory),
      },
      {
        label: 'Does the vehicle have outstanding finance?',
        value: parseBooleanLabel(partExchange.vehicleData.hasOutstandingFinance),
      },
      {
        label: 'Outstanding finance amount',
        value: partExchange?.vehicleData?.outstandingFinanceAmount?.toString() || 'n/a',
      },
      {
        label: 'Have you confirmed the settlement figure with your lender',
        value: parseBooleanLabel(partExchange.vehicleData.confirmSettlement),
      },
      {
        label: 'Vehicle is not an import',
        value: parseBooleanLabel(!!partExchange.vehicleData?.isImport),
      },
    ],
  },
  {
    rowData: [
      {
        label: 'Are the owner and have the V5C',
        value: parseBooleanLabel(partExchange.vehicleData.V5Logbook),
      },
      {
        label: 'Wish to retain the registration number (personal plate)',
        value: parseBooleanLabel(partExchange.vehicleData.keepOwnReg),
      },
      {
        label:
          'Vehicle has not been used as a taxi, for private hire, or as a driving school or emergency services vehicle',
        value: parseBooleanLabel(partExchange.vehicleData.vehicleUse),
      },
      {
        label: 'There are no major mechanical faults on your vehicle',
        value: parseBooleanLabel(partExchange.vehicleData.mechanicalIssues),
      },
      {
        label: 'Light Condition',
        value: partExchange.vehicleData.lightCondition || 'n/a',
      },
      {
        label: 'Vehicle has never been an Insurance Total Loss',
        value: parseBooleanLabel(partExchange.vehicleData.totalLoss),
      },
      {
        label: 'There have been no mileage or speedometer alterations',
        value: parseBooleanLabel(partExchange.vehicleData.documentedMileageChange),
      },
      {
        label: 'Vehicle is not Left Hand Drive',
        value: parseBooleanLabel(partExchange.vehicleData.leftHandDrive),
      },
    ],
  },
];

export const conditions = [
  { value: 1, label: 'Good' },
  { value: 2, label: 'Average' },
  { value: 3, label: 'Fair' },
];

export const specifications = [
  { id: 'keys', label: 'You have at least 2 working sets of keys' },
  {
    id: 'hasDamage',
    label:
      'There is no major damage to the exterior or interior of the vehicle beyond the selected condition grade',
  },
  { id: 'mot', label: 'Your vehicle has at least 3 months MOT' },
  { id: 'serviceHistory', label: 'Your vehicle has a full service history' },
  { id: 'isImport', label: 'Your vehicle is not an import' },
  { id: 'v5Logbook', label: 'You are the owner and have the V5C' },
  { id: 'keepOwnReg', label: 'You wish to retain the registration number (personal plate)' },
  {
    id: 'vehicleUse',
    label:
      'Your vehicle has not been used as a taxi, for private hire, or as a driving school or emergency services vehicle',
  },
  { id: 'mechanicalIssues', label: 'There are no major mechanical faults on your vehicle' },
  { id: 'totalLoss', label: 'The vehicle has never been an Insurance Total Loss' },
  {
    id: 'documentedMileageChange',
    label: 'There have been no mileage or speedometer alterations',
  },
  { id: 'leftHandDrive', label: 'The vehicle is not Left Hand Drive' },
  { id: 'hasOutstandingFinance', label: 'Does the vehicle have outstanding finance?' },
];

enum SignValue {
  positive = 'positive',
  negative = 'negative',
}

const setPositiveNegativeValue = (value: string | string[] | number) =>
  valueToBoolean(value) ? SignValue.positive : SignValue.negative;

const setConditionValue = (value: number | string): string => {
  if (value === '') {
    return '';
  }
  const result = conditions.find((condition) => condition.value === value);
  return result ? result.label : '';
};
const setMotValue = (value: string | string[] | number) =>
  valueToBoolean(value) ? '3' : SignValue.negative;

export const prepareValuationForm = (
  {
    keys,
    mot,
    hasDamage,
    serviceHistory,
    isImport,
    v5Logbook,
    keepOwnReg,
    vehicleUse,
    mechanicalIssues,
    totalLoss,
    documentedMileageChange,
    leftHandDrive,
    condition,
    confirmSettlement,
    hasOutstandingFinance,
    outstandingFinanceAmount,
  }: IInitialPXSpecification,
  { vrm, mileage }: IInitialPXVehicleDataFormValues,
  websiteUser: IWebsiteUserDetails,
): IValuationRequest => ({
  vehicleVrm: vrm,
  websiteUserId: websiteUser.id as number,
  keysAnswerCode: setPositiveNegativeValue(keys),
  hasDamageAnswerCode: setPositiveNegativeValue(hasDamage),
  motAnswerCode: setMotValue(mot),
  serviceHistoryAnswerCode: setPositiveNegativeValue(serviceHistory),
  isImportAnswerCode: setPositiveNegativeValue(isImport),
  v5LogbookAnswerCode: setPositiveNegativeValue(v5Logbook),
  keepOwnRegAnswerCode: setPositiveNegativeValue(keepOwnReg),
  vehicleUseAnswerCode: setPositiveNegativeValue(vehicleUse),
  mechanicalIssuesAnswerCode: setPositiveNegativeValue(mechanicalIssues),
  totalLossAnswerCode: setPositiveNegativeValue(totalLoss),
  documentedMileageChangeAnswerCode: setPositiveNegativeValue(documentedMileageChange),
  leftHandDriveAnswerCode: setPositiveNegativeValue(leftHandDrive),
  lightConditionAnswerCode: setConditionValue(condition),
  vehicleMileageAnswerCode: 'value',
  vehicleMileageValue: mileage as number,
  confirmSettlementAnswerCode: setPositiveNegativeValue(confirmSettlement),
  hasOutstandingFinanceAnswerCode: setPositiveNegativeValue(hasOutstandingFinance),
  outstandingFinanceAmount:
    outstandingFinanceAmount === '' ? 0 : (outstandingFinanceAmount as number),
});
