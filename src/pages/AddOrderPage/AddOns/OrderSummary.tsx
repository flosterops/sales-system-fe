import React, { ReactElement, useEffect, useState } from 'react';
import { Title, TitleTags } from 'ui/Title';
import { IInitialPXAddOns } from 'models/forms';
import { IOrderExtras } from 'models/order-extras';
import { priceFormatter } from 'helpers/price-format';
import { WeightTypes } from 'models/layout';
import { IAddOrderData } from '../hooks';
import { StyledSummary } from './styles';

interface IOrderSummary {
  addOns: IInitialPXAddOns | null;
  orderData: IAddOrderData;
  extras: { [key: string]: IOrderExtras };
}

const OrderSummary = ({ addOns, orderData, extras }: IOrderSummary): ReactElement => {
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const calculateTotalAmount = () => {
    let amount = 0;
    if (orderData.vehicle?.price) {
      amount += orderData.vehicle?.price;
    }
    if (orderData.partExchange?.valuation?.vehicleValuation) {
      amount -= orderData.partExchange?.valuation?.vehicleValuation;
    }
    if (orderData.partExchange?.answers.outstandingFinanceAmount) {
      amount += orderData.partExchange?.answers.outstandingFinanceAmount as number;
    }
    if (addOns?.warranty) {
      amount += addOns.warrantyPrice as number;
    }
    if (addOns?.paintProtection) {
      amount += addOns.paintProtectionPrice as number;
    }
    setTotalAmount(amount);
  };

  useEffect(() => {
    calculateTotalAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addOns, orderData]);

  return (
    <StyledSummary>
      <Title tagName={TitleTags.h6} weight={WeightTypes.w700} mbottom="20px">
        Summary{' '}
        <span>{`${orderData.vehicle?.make} ${orderData.vehicle?.model} ${orderData.vehicle?.modelVariant}`}</span>
      </Title>
      <table>
        <tbody>
          <tr>
            <td>Vehicle price</td>
            <td>{priceFormatter(orderData.vehicle?.price)}</td>
          </tr>
          {orderData.partExchange?.valuation?.vehicleValuation && (
            <tr>
              <td>Your part exchange</td>
              <td>-{priceFormatter(orderData.partExchange.valuation.vehicleValuation)}</td>
            </tr>
          )}
          {orderData.partExchange?.answers?.outstandingFinanceAmount && (
            <tr>
              <td>Finance settlement</td>
              <td>
                {priceFormatter(orderData.partExchange.answers.outstandingFinanceAmount)}
              </td>
            </tr>
          )}
          {addOns?.warranty && (
            <tr>
              <td>{extras[addOns.warranty].name}</td>
              <td>{priceFormatter(addOns.warrantyPrice)}</td>
            </tr>
          )}
          {addOns?.paintProtection && (
            <tr>
              <td>{extras[addOns.paintProtection].name}</td>
              <td>{priceFormatter(addOns.paintProtectionPrice)}</td>
            </tr>
          )}
          {addOns?.gapInsurance && (
            <tr>
              <td>One month GAP</td>
              <td>
                {addOns.gapInsurancePrice === 0
                  ? 'FREE'
                  : priceFormatter(addOns.gapInsurancePrice)}
              </td>
            </tr>
          )}
          <tr>
            <td>Total to pay</td>
            <td>{priceFormatter(totalAmount)}</td>
          </tr>
        </tbody>
      </table>
    </StyledSummary>
  );
};

export default OrderSummary;
