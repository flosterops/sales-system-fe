import React, { FC } from 'react';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { useModal } from 'widgets/Modal/context';
import { EModalTypes } from 'models/modal';
import { EPaymentModalTypes } from 'widgets/AddPaymentModal/helpers';
import { IVehiclePayment } from 'models/vehicles';
import { EditPaymentIcon } from './styles';

interface IEditPaymentButton {
  orderId: number;
  handleDataUpdated: (id: number) => Promise<void>;
  paymentData: IVehiclePayment;
}

const EditPaymentButton: FC<IEditPaymentButton> = ({
  orderId,
  handleDataUpdated,
  paymentData,
}) => {
  const { openModal } = useModal();
  return (
    <EditPaymentIcon
      type={EIconTypes.pencilAlt}
      fontSize="18px"
      color={colors.turquoise}
      onClick={() =>
        openModal(EModalTypes.AddPaymentModal, {
          withCloseButton: true,
          type: EPaymentModalTypes.edit,
          orderId,
          handleDataUpdated,
          data: paymentData,
        })
      }
    />
  );
};

export { EditPaymentButton };
