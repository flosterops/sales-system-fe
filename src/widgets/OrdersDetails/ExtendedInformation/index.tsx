import { IOrder } from 'models/orders';
import React from 'react';
import VehicleDetails from 'pages/TaskPage/shared/VehicleDetails/indes';
import { DetailsRow } from 'pages/TaskPage/shared/DetailsRow';
import { MultiColumnTable } from 'pages/TaskPage/shared/MultiColumnTable';
import { getExecutionAsTable, getOrderStatusAsTable } from 'helpers/order';
import { FinanceSummary } from 'widgets/OrdersDetails/FinanceSummary';
import { AddOnsSection } from 'pages/TaskPage/OrdersDetails/AddOnsSection';
import { ComponentSizesTypes } from 'models/layout';
import { Button } from 'ui/Button';
import { useModal } from 'widgets/Modal/context';
import { EModalTypes } from 'models/modal';
import { TasksList } from './TasksList';
import { ExtendedInformationWrapper } from './styles';
import { StatusRow } from './StatusRow';
import { PartExchange } from '../PartExchange';
import { useOrdersTab } from '../context';

interface IExtendedInformation {
  order: IOrder;
}

const ExtendedInformation = ({ order }: IExtendedInformation) => {
  const {
    orderTabDetails,
    activeOrder,
    controller: { updateFinanceSummary },
  } = useOrdersTab();
  const { openModal } = useModal();
  const tabControls = useOrdersTab();

  return (
    <ExtendedInformationWrapper>
      <StatusRow
        id={order.id}
        orderStatus={order.orderStatus.name}
        vrm={orderTabDetails?.vehicleDetails?.registration as string}
        status={order.orderStatus.name}
        clientId={order.websiteUserId}
      />
      <VehicleDetails
        vehicleDetails={orderTabDetails?.vehicleDetails}
        vehicleImages={orderTabDetails?.vehicleImages}
      />
      {orderTabDetails?.partExchange && (
        <DetailsRow
          sectionHeaders={['Part Exchange']}
          components={[
            {
              key: 'Part exchange',
              component: <PartExchange partExchangeDetails={orderTabDetails?.partExchange} />,
            },
          ]}
        />
      )}
      <DetailsRow
        sectionHeaders={['Add ons']}
        components={[
          {
            key: 'Add ons',
            component: (
              <AddOnsSection
                vehicleDetails={orderTabDetails?.vehicleDetails}
                orderId={order.id}
              />
            ),
          },
        ]}
      />
      <DetailsRow
        sectionHeaders={['Execution']}
        components={[
          {
            key: 'Execution',
            component: activeOrder ? (
              <MultiColumnTable
                columns={getExecutionAsTable(activeOrder)}
                footer={
                  <Button
                    onClick={() => {
                      openModal(EModalTypes.ChangeDeliveryModal, {
                        ...tabControls,
                        withCloseButton: true,
                      });
                    }}
                    mleft="auto"
                    mright="13px"
                    componentSize={ComponentSizesTypes.m}
                  >
                    Change delivery
                  </Button>
                }
              />
            ) : null,
          },
        ]}
      />
      <DetailsRow
        sectionHeaders={['Order status']}
        components={[
          {
            key: 'orderStatus',
            component: activeOrder ? (
              <MultiColumnTable columns={getOrderStatusAsTable(activeOrder)} />
            ) : null,
          },
        ]}
      />
      <DetailsRow
        sectionHeaders={['Finance Summary']}
        components={[
          {
            key: 'Summary',
            component: (
              <FinanceSummary
                payments={orderTabDetails?.financeSummary}
                vehicleDetails={orderTabDetails?.vehicleDetails}
                orderId={order.id}
                websiteUserId={order.websiteUserId}
                handleDataUpdated={updateFinanceSummary}
              />
            ),
          },
        ]}
      />
      <DetailsRow
        sectionHeaders={[]}
        components={[
          {
            key: 'Tasks list',
            component: orderTabDetails?.orderTasks ? (
              <TasksList tasks={orderTabDetails.orderTasks} />
            ) : null,
          },
        ]}
      />
    </ExtendedInformationWrapper>
  );
};

export { ExtendedInformation };
