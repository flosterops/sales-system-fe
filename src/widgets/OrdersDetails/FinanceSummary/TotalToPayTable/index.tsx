import React, { useEffect } from 'react';
import { EVehicleAccountingVatName, IVehiclePayment } from 'models/vehicles';
import { formatPrice } from 'helpers/string-formatter';
import { TotalToPayColumn, TotalToPayTableWrapper } from './styles';
import { TotalToPayTableRow } from './TotalToPayTableRow';
import { TotalToPayTableFooter } from './TotalToPayTableFooter';

interface ITotalToPayTable {
  accountingFinance: IVehiclePayment[];
  setTotalToPay(arg0: number): void;
}

const isNegativeAccounting = (payment: IVehiclePayment): boolean =>
  payment.vehicleAccountingVatName === EVehicleAccountingVatName.PartExchangeVehiclePrice;

const TotalToPayTable = ({ accountingFinance, setTotalToPay }: ITotalToPayTable) => {
  const totalSum = accountingFinance?.reduce((acc: number, payment) => {
    if (isNegativeAccounting(payment)) {
      return acc - payment.amount;
    }
    return acc + payment.amount;
  }, 0);

  useEffect(() => {
    setTotalToPay(totalSum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSum]);

  if (!accountingFinance.length) {
    return <TotalToPayTableWrapper />;
  }

  return (
    <TotalToPayTableWrapper>
      <TotalToPayColumn mtop="13px">
        {accountingFinance.map((payment) => (
          <TotalToPayTableRow
            isNegative={isNegativeAccounting(payment)}
            key={`${payment.agreementNumber} ${payment.amount} ${payment.contactName} ${payment.datetime}`}
            title={payment.vehicleAccountingVatName}
            value={formatPrice(payment.amount)}
          />
        ))}
        <TotalToPayTableFooter title="Total to pay" value={formatPrice(totalSum)} />
      </TotalToPayColumn>
    </TotalToPayTableWrapper>
  );
};

export { TotalToPayTable };
