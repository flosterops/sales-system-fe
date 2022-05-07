import { EVehicleAccountingVatId } from 'models/vehicles';

export const PaymentOptionsArray = [
  { label: 'Payment', value: EVehicleAccountingVatId.Payment },
  { label: 'Forced Payment', value: EVehicleAccountingVatId.ForcedPayment },
];

export enum EPaymentModalTypes {
  add = 'add',
  edit = 'edit',
}
