import { FormikValues } from 'formik';
import { ISelectOptionsModel } from '../widgets/Form/Select';

export type TFieldTypes = EFieldTypes | EInputTypes;

export enum EFieldTypes {
  select = 'select',
  checkbox = 'checkbox',
  autocomplete = 'autocomplete',
  textarea = 'textarea',
  datetime = 'datetime',
  filesViews = 'filesViews',
  files = 'files',
}

export enum EInputTypes {
  text = 'text',
  number = 'number',
  search = 'search',
  email = 'email',
  password = 'password',
  files = 'files',
}

export interface IInitialProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IInitialAddTaskFormValues {
  clientId: string;
  order: string;
  vrm: string;
  taskType: string;
  assign: string;
  note: string;
  executionDate: string;
}

export interface IInitialAssigneeFormValues {
  assign: string;
}

export interface IInitialBreakFormValues {
  breakStatus: string;
}

export interface IInitialAddCustomerFormValues {
  customer: ISelectOptionsModel;
}

export interface IInitialPXVehicleDataFormValues {
  vrm: string;
  mileage: number | string;
}

export interface IInitialPXSpecification {
  keys: string;
  hasDamage: string;
  mot: string;
  serviceHistory: string;
  isImport: string;
  v5Logbook: string;
  keepOwnReg: string;
  vehicleUse: string;
  mechanicalIssues: string;
  totalLoss: string;
  documentedMileageChange: string;
  leftHandDrive: string;
  hasOutstandingFinance: string;
  outstandingFinanceAmount: number | string;
  confirmSettlement: string;
  condition: number | string;
  [key: string]: number | string | null;
}

export interface IInitialPXAddOns {
  warranty: number | string;
  warrantyPrice: number | string;
  paintProtection: number | string;
  paintProtectionPrice: number | string;
  gapInsurance: number | string;
  gapInsurancePrice: number | string;
}

export interface IInitialCollectionDelivery {
  [key: string]: string | boolean;
  note: string;
}

export interface IInitialPaymentOrder {
  card: boolean;
  finance: boolean;
  deposit: boolean;
}

export interface IInitialFormValues {
  search: IInitialSearchFormValues;
  profile: IInitialProfileFormValues;
  assign: IInitialAssigneeFormValues;
  taskSummaryUnresolved: IInitialTaskSummaryUnresolvedFormValues;
  taskSummaryResolved: IInitialTaskSummaryResolvedFormValues;
  task: IInitialAddTaskFormValues;
  message: IInitialMessageFormValues;
  email: IInitialEmailFormValues;
  break: IInitialBreakFormValues;
  notes: IInitialNotesFormValues;
  addPayment: IInitialAddPaymentFormValues;
  requestPayment: IInitialRequestPaymentFormValues;
  addOrderCustomer: IInitialAddCustomerFormValues;
  addOrderPXVehicleData: IInitialPXVehicleDataFormValues;
  addOrderPXSpecification: IInitialPXSpecification;
  addOrderPXAddOns: IInitialPXAddOns;
  addOrderCollectionDelivery: IInitialCollectionDelivery;
  addEditWebsiteUser: IInitialAddEditWebsiteUserFormValues;
  addOrderPayment: IInitialPaymentOrder;
}

export interface IInitialEmailMessageFormValues {
  type: ISelectOptionsModel;
  title: string;
  message: string;
  attachments: File[];
}

export interface IInitialMessageFormValues {
  message: string;
}

export interface IFileAttachments {
  name: string;
  lastModified: string;
}

export interface IInitialEmailFormValues {
  title: string;
  attachments?: IFileAttachments[];
  message: string;
}

export interface IInitialSearchFormValues {
  search: string;
}

export interface IInitialTaskSummaryResolvedFormValues {
  note: string;
}

export interface IInitialTaskSummaryUnresolvedFormValues {
  date: string;
  time: string;
  user: string | number;
  note: string;
}

export interface IInitialNotesFormValues {
  note: string;
  type: string;
  businessNoteAttachments: File[];
}

export type IValidationFunction = (values: FormikValues) => string;

export interface IFormValidations {
  [key: string]: IValidationFunction[];
}

export enum SelectMenuPlacement {
  default = 'auto',
  bottom = 'bottom',
  top = 'top',
}

export interface ISelectStyleOptions {
  color: string;
  hasIcon: boolean;
}

export interface IInitialAddPaymentFormValues {
  paymentType: string;
  amount: string | number;
  company: string;
  agreementNumber: string | number;
  paymentId: string | number;
  description: string;
}

export interface IInitialRequestPaymentFormValues {
  amount: string | number;
  description: string;
}

export interface IOption {
  value: string | number;
  label: string | number;
}

export interface IInitialAddEditWebsiteUserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string | number;
  town: string | number | IOption[];
  postalCode: string | number | IOption[];
  county: string | number | IOption[];
  address: string;
}
