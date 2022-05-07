import React, { ReactElement } from 'react';
import { useModal } from 'widgets/Modal/context';
import { EGadgetSize, EGadgetTypes, gadgetManagerType } from 'models/gadget';
import { GadgetsManagerWidget } from 'pages/DashboardPage/GadgetsManagerWidget';
import { EModalTypes } from 'models/modal';
import { CustomersWidget } from 'pages/DashboardPage/CustomersWidget';
import { VehiclesWidget } from 'pages/DashboardPage/VehiclesWidget';
import { BreakListWidget } from 'pages/DashboardPage/BreakListWidget';
import { PieChartWidget } from 'pages/DashboardPage/PieChartWidget';
import { TaskQueueWidget } from 'pages/DashboardPage/TaskQueueWidget';
import { IGadgetGrid } from 'pages/DashboardPage/GadgetsContainer';

const getGadgetByType = (type: EGadgetTypes, id: string): ReactElement | null => {
  switch (type) {
    case EGadgetTypes.customers:
      return <CustomersWidget id={id} />;
    case EGadgetTypes.vehicles:
      return <VehiclesWidget id={id} />;
    case EGadgetTypes.breakList:
      return <BreakListWidget id={id} />;
    case EGadgetTypes.workerStatistics:
      return <PieChartWidget id={id} isDelete />;
    case EGadgetTypes.taskQueue:
      return <TaskQueueWidget id={id} />;
    default:
      return null;
  }
};

const GadgetComponent = ({ type, size, order, id }: IGadgetGrid): ReactElement => {
  const { openModal } = useModal();
  return (
    <>
      {type === gadgetManagerType ? (
        <GadgetsManagerWidget
          size={size || EGadgetSize.large}
          onClick={(componentSize: EGadgetSize) =>
            openModal(EModalTypes.GadgetsModal, { size: componentSize, order })
          }
        />
      ) : (
        getGadgetByType(type as EGadgetTypes, id as string)
      )}
    </>
  );
};

export { GadgetComponent };
