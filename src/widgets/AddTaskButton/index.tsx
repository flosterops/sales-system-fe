import React, { FC } from 'react';
import { Button } from 'ui/Button';
import { EButtonTypes } from 'models/button';
import { useModal } from 'widgets/Modal/context';
import { EModalTypes } from 'models/modal';

interface IAddTaskButton {
  clientId?: string;
  order?: string;
  vrm?: string;
}

const AddTaskButton: FC<IAddTaskButton> = ({ clientId, order, vrm }) => {
  // ToDo: add permissions
  const permissions: string[] = [];
  const { openModal } = useModal();
  const openAddTaskModal = () => {
    openModal(EModalTypes.AddTaskModal, {
      withCloseButton: true,
      clientId,
      order,
      vrm,
    });
  };

  return (
    <Button type={EButtonTypes.button} onClick={openAddTaskModal} permissions={permissions}>
      Add task
    </Button>
  );
};

export { AddTaskButton };
