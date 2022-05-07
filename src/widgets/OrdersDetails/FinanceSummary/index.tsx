import React, { useState } from 'react';
import { IVehicle, IVehiclePayment, EVehicleAccountingVatName } from 'models/vehicles';
import { Table } from 'widgets/Table';
import {
  ComponentSizesTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
} from 'models/layout';
import { Row } from 'ui/Layout';
import { Description } from 'ui/Description';
import { colors } from 'styles/colors';
import { Title, TitleTags } from 'ui/Title';
import { Button } from 'ui/Button';
import { useModal } from 'widgets/Modal/context';
import { EModalTypes } from 'models/modal';
import { EPaymentModalTypes } from 'widgets/AddPaymentModal/helpers';
import { FinanceSummaryWrapper, TotalDueTable } from './styles';
import { TotalToPayTable } from './TotalToPayTable';
import { mapPaymentsToTable, paymentsColumns } from './helpers';
import { formatPrice } from '../../../helpers/string-formatter';

interface IFinanceSummary {
  payments?: IVehiclePayment[];
  vehicleDetails?: IVehicle;
  orderId?: number | string;
  websiteUserId?: number | string;
  handleDataUpdated: () => Promise<void>;
}

interface IFilteredPayments {
  payments: IVehiclePayment[];
  accountingFinance: IVehiclePayment[];
}

const FinanceSummary = ({
  payments,
  vehicleDetails,
  orderId,
  websiteUserId,
  handleDataUpdated,
}: IFinanceSummary) => {
  const [totalToPay, setTotalToPay] = useState<number>(0);
  const { openModal } = useModal();
  const filteredPayments: IFilteredPayments = (payments || []).reduce(
    (acc: IFilteredPayments, payment) => {
      if (
        [EVehicleAccountingVatName.Payment, EVehicleAccountingVatName.ForcedPayment].includes(
          payment.vehicleAccountingVatName,
        )
      ) {
        return { ...acc, payments: [...acc.payments, payment] };
      }
      return { ...acc, accountingFinance: [...acc.accountingFinance, payment] };
    },
    { payments: [], accountingFinance: [] },
  );

  const totalPrice = filteredPayments?.payments.reduce(
    (acc: number, payment) => acc + payment.amount,
    0,
  );

  return (
    <FinanceSummaryWrapper padding="0 25px 30px">
      <Row jc={JustifyContentTypes.spaceBetween}>
        {!!vehicleDetails && (
          <TotalToPayTable
            accountingFinance={filteredPayments.accountingFinance}
            setTotalToPay={setTotalToPay}
          />
        )}
        <TotalDueTable>
          {payments && (
            <Table
              columns={paymentsColumns(orderId as number, handleDataUpdated)}
              dataSource={mapPaymentsToTable(filteredPayments.payments)}
            />
          )}
          <Row jc={JustifyContentTypes.flexEnd} margin="8px 0 16px 0">
            <Title
              tagName={TitleTags.h6}
              fontFamily={EFontFamilies.bree}
              fontSize={FontSizeTypes.xxm}
              mright="20px"
            >
              Total Due
            </Title>
            <Description
              fontFamily={EFontFamilies.bree}
              fontSize={FontSizeTypes.xxm}
              color={colors.turquoise}
            >
              {formatPrice(totalToPay - totalPrice || 0)}
            </Description>
          </Row>
        </TotalDueTable>
      </Row>
      <Row jc={JustifyContentTypes.flexEnd} mtop="2px">
        <Button
          mright="30px"
          componentSize={ComponentSizesTypes.m}
          onClick={() =>
            openModal(EModalTypes.AddPaymentModal, {
              withCloseButton: true,
              type: EPaymentModalTypes.add,
              orderId,
              handleDataUpdated,
            })
          }
        >
          Add payment
        </Button>
        <Button
          componentSize={ComponentSizesTypes.m}
          onClick={() =>
            openModal(EModalTypes.RequestPaymentModal, {
              withCloseButton: true,
              orderId,
              websiteUserId,
            })
          }
        >
          Request payment
        </Button>
      </Row>
    </FinanceSummaryWrapper>
  );
};

export { FinanceSummary };
