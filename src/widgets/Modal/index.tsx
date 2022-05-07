import React, { ReactElement, useMemo, useRef } from 'react';
import { AlignItemsTypes, JustifyContentTypes } from 'models/layout';
import useOnClickOutside from 'helpers/use-on-click-outside';
import { EModalTypes } from 'models/modal';
import { BreakWindow } from 'widgets/BreakWindow';
import { ConfirmationWindow } from 'widgets/ConfirmationWindow';
import { GadgetsModal } from 'pages/DashboardPage/GadgetsModal';
import { NewTaskComponent } from 'widgets/NewTask';
import { AssignCustomer } from 'pages/VehicleDetailsPage/AssignCustomer';
import { AssignTaskModal } from 'pages/TasksQueuePage/AssignTaskModal';
import { AddTaskModal } from 'widgets/AddTaskModal';
import { AddPaymentModal } from 'widgets/AddPaymentModal';
import { RequestPaymentModal } from 'widgets/RequestPaymentModal';
import { LogOutModal } from 'widgets/LogOutModal';
import { AddEditWebsiteUserModal } from 'widgets/CustomerModal';
import { InterestedVehicleModal } from 'widgets/InterestedVehicleModal';
import { ChangeDeliveryModal } from 'widgets/ChangeDeliveryModal';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { CloseModalButton, ModalContainer, ModalWrapper } from './styles';
import { useModal } from './context';

const modals = {
  [EModalTypes.BreakWindow]: BreakWindow,
  [EModalTypes.GadgetsModal]: GadgetsModal,
  [EModalTypes.ConfirmationWindow]: ConfirmationWindow,
  [EModalTypes.VehicleAssignCustomer]: AssignCustomer,
  [EModalTypes.NewTaskComponent]: NewTaskComponent,
  [EModalTypes.AddTaskModal]: AddTaskModal,
  [EModalTypes.AddEditWebsiteUserModal]: AddEditWebsiteUserModal,
  [EModalTypes.AssignTaskModal]: AssignTaskModal,
  [EModalTypes.AddPaymentModal]: AddPaymentModal,
  [EModalTypes.RequestPaymentModal]: RequestPaymentModal,
  [EModalTypes.LogOutModal]: LogOutModal,
  [EModalTypes.InterestedVehicle]: InterestedVehicleModal,
  [EModalTypes.ChangeDeliveryModal]: ChangeDeliveryModal,
};

const Modal = (): ReactElement => {
  const { id, options, closeModal } = useModal();
  const { withCloseButton = false } = options;
  const modalRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(modalRef, () => {
    if (!withCloseButton) {
      closeModal();
    }
  });

  const Component = useMemo(() => {
    if (id && id in modals) {
      return modals[id];
    }

    return null;
  }, [id]);

  return (
    <ModalWrapper
      componentWidth="100%"
      componentHeight="100vh"
      ai={AlignItemsTypes.center}
      jc={JustifyContentTypes.center}
      visible={!!id}
    >
      <ModalContainer componentWidth="auto" layoutRef={modalRef}>
        {withCloseButton && (
          <CloseModalButton
            type={EIconTypes.times}
            fontSize="40px"
            color={colors.white}
            onClick={closeModal}
          />
        )}
        {Component ? <Component {...options} /> : null}
      </ModalContainer>
    </ModalWrapper>
  );
};

export { Modal };
