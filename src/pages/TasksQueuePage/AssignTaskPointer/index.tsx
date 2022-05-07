import React, { ReactElement } from 'react';
import { useModal } from 'widgets/Modal/context';
import { NavLink } from 'ui/NavLink';
import { EModalTypes } from 'models/modal';
import { ERouteLinks } from 'models/route';
import { colors } from 'styles/colors';
import { ETaskTypes } from 'models/task';
import { Icon } from '../../../ui/Icon';
import { EIconTypes } from '../../../models/icons';

interface IAssignTaskPointer {
  text: string;
  taskName: string;
  taskId: string;
  callback?: () => void;
  taskType: ETaskTypes;
}

const AssignTaskPointer = ({
  text,
  taskName,
  taskId,
  callback,
  taskType,
}: IAssignTaskPointer): ReactElement => {
  const { openModal } = useModal();

  const handleOpenModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openModal(EModalTypes.AssignTaskModal, { taskName, taskType, taskId, callback });
  };

  if (!text) {
    return (
      <NavLink color={colors.primary} onClick={handleOpenModal} to={'#' as ERouteLinks}>
        Assign task to
      </NavLink>
    );
  }

  return (
    <NavLink color={colors.black} to={'#' as ERouteLinks}>
      {text}
      <Icon
        type={EIconTypes.pencilAlt}
        color={colors.turquoise}
        mleft="8px"
        margin="auto"
        fontSize="18px"
        onClick={handleOpenModal}
      />
    </NavLink>
  );
};

export { AssignTaskPointer };
