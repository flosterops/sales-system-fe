import { IInitialFormValues } from 'models/forms';

export const initialSearchFormValues = {
  search: '',
};

export const initialProfileFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const initialAssigneeFormValues = {
  assign: '',
};

export const initialTaskFormValues = {
  clientId: '',
  order: '',
  vrm: '',
  taskType: '',
  assign: '',
  note: '',
  executionDate: '',
};

export const initialTaskSummaryUnresolvedFormValues = {
  time: '',
  date: '',
  user: '',
  note: '',
};

export const initialTaskSummaryResolvedFormValues = {
  note: '',
};

export const initialMessageFormValues = {
  message: '',
};

export const initialEmailFormValues = {
  title: '',
  message: '',
};

export const initialBreakFormValues = {
  breakStatus: '',
};

export const initialNotesFormValues = {
  note: '',
  type: '',
  businessNoteAttachments: [],
  websiteUserId: '',
};

export const initialAddPaymentFormValues = {
  paymentType: '',
  amount: '',
  company: '',
  agreementNumber: '',
  paymentId: '',
  description: '',
};

export const initialRequestPaymentFormValues = {
  amount: '',
  description: '',
};

export const initialAddCustomerFormValues = {
  customer: {
    value: '',
    label: '',
  },
};

export const initialPXVehicleDataFormValues = {
  vrm: '',
  mileage: '',
};

export const initialPXSpecificationFormValues = {
  keys: '',
  hasDamage: '',
  mot: '',
  serviceHistory: '',
  isImport: '',
  v5Logbook: '',
  keepOwnReg: '',
  vehicleUse: '',
  mechanicalIssues: '',
  totalLoss: '',
  documentedMileageChange: '',
  leftHandDrive: '',
  hasOutstandingFinance: '',
  outstandingFinanceAmount: '',
  confirmSettlement: '',
  condition: '',
};

export const initialPXAddOns = {
  warranty: '',
  warrantyPrice: '',
  paintProtection: '',
  paintProtectionPrice: '',
  gapInsurance: '',
  gapInsurancePrice: '',
};

export const initialCollectionDelivery = {
  note: '',
};

export const initialAddEditWebsiteUserFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  mobilePhone: '',
  town: '',
  postalCode: '',
  county: '',
  address: '',
};

export const initialPaymentOrder = {
  card: false,
  finance: false,
  deposit: false,
};

export const initialFormValues: IInitialFormValues = {
  search: initialSearchFormValues,
  profile: initialProfileFormValues,
  assign: initialAssigneeFormValues,
  message: initialMessageFormValues,
  email: initialEmailFormValues,
  taskSummaryUnresolved: initialTaskSummaryUnresolvedFormValues,
  taskSummaryResolved: initialTaskSummaryResolvedFormValues,
  task: initialTaskFormValues,
  break: initialBreakFormValues,
  notes: initialNotesFormValues,
  addPayment: initialAddPaymentFormValues,
  requestPayment: initialRequestPaymentFormValues,
  addOrderCustomer: initialAddCustomerFormValues,
  addOrderPXVehicleData: initialPXVehicleDataFormValues,
  addOrderPXSpecification: initialPXSpecificationFormValues,
  addOrderPXAddOns: initialPXAddOns,
  addOrderCollectionDelivery: initialCollectionDelivery,
  addOrderPayment: initialPaymentOrder,
  addEditWebsiteUser: initialAddEditWebsiteUserFormValues,
};
