import React, { ReactNode } from 'react';
import { ITableColumns } from 'models/table';
import { IVehiclePayment } from 'models/vehicles';
import { format } from 'date-fns';
import { Row } from 'ui/Layout';
import { JustifyContentTypes } from 'models/layout';
import { EditPaymentButton } from './EditPaymentButton';

export const mapPaymentsToTable = (payments: IVehiclePayment[]) =>
  payments.map((payment) => ({
    vehicleAccountingVatName: payment.vehicleAccountingVatName,
    dateReceived: format(new Date(payment.datetime), 'dd/MM/yyyy'),
    company: payment.contactName,
    agreementNumber: payment.agreementNumber,
    amount: payment.amount.toFixed(2),
    id: payment.id,
    paymentId: payment.paymentId,
    description: payment.description,
  }));

export const paymentsColumns = (
  orderId: number,
  handleDataUpdated: () => Promise<void>,
): ITableColumns[] => [
  {
    id: 'vehicleAccountingVatName',
    key: 'vehicleAccountingVatName',
    title: 'Type',
  },
  {
    id: 'dateReceived',
    key: 'dateReceived',
    title: 'Date Received',
  },
  {
    id: 'company',
    key: 'company',
    title: 'Company',
  },
  {
    id: 'agreementNumber',
    key: 'agreementNumber',
    title: 'Agreement Number',
  },
  {
    id: 'amount',
    key: 'amount',
    title: 'Amount (Tax inclusive)',
    render: (amount, payment): ReactNode => (
      <Row jc={JustifyContentTypes.spaceBetween}>
        {amount}
        <EditPaymentButton
          orderId={orderId}
          handleDataUpdated={handleDataUpdated}
          paymentData={{
            vehicleAccountingVatName: payment.vehicleAccountingVatName,
            contactName: payment.company,
            datetime: payment.dateReceived,
            agreementNumber: payment.agreementNumber,
            amount: payment.amount,
            id: payment.id,
            paymentId: payment.paymentId,
            description: payment.description,
          }}
        />
      </Row>
    ),
  },
];
