import { EButtonsVariants } from 'models/button';
import { EFontFamilies } from 'models/layout';
import { EModalTypes } from 'models/modal';
import { OrderStatuses } from 'models/orders';
import React from 'react';
import { Button } from 'ui/Button';
import { Title, TitleTags } from 'ui/Title';
import { useModal } from 'widgets/Modal/context';
import { useOrdersTab } from 'widgets/OrdersDetails/context';
import { AddTaskButton } from 'widgets/AddTaskButton';
import { ButtonControls, StatusRowWrapper } from './styles';

interface IStatusRow {
  orderStatus: OrderStatuses;
  id: number;
  vrm: string;
  status: string;
  clientId: number;
}

const StatusRow = ({ orderStatus, id, vrm, status, clientId }: IStatusRow) => {
  const { openModal, closeModal } = useModal();
  const {
    controller: { cancelOrder },
  } = useOrdersTab();

  return (
    <StatusRowWrapper>
      <ButtonControls>
        <AddTaskButton clientId={String(clientId)} order={String(id)} vrm={vrm} />
        {orderStatus !== OrderStatuses.CANCELLED && (
          <Button
            onClick={() => {
              openModal(EModalTypes.ConfirmationWindow, {
                text: 'Are you sure you want to cancel this order?',
                confirmButtonAction: async () => {
                  await cancelOrder(id);
                  closeModal();
                },
              });
            }}
            variant={EButtonsVariants.info}
          >
            Cancel order
          </Button>
        )}
      </ButtonControls>
      <Title tagName={TitleTags.h3} fontFamily={EFontFamilies.bree}>
        Order status: <span>{status}</span>
      </Title>
    </StatusRowWrapper>
  );
};

export { StatusRow };
