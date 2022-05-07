import React, { ReactElement } from 'react';
import { AlignItemsTypes, DirectionTypes, JustifyContentTypes } from 'models/layout';
import { EButtonsVariants } from 'models/button';
import { Row } from 'ui/Layout';
import { useModal } from 'widgets/Modal/context';
import { EModalTypes } from 'models/modal';
import { EBreakWindowTypes } from 'models/break-window';
import { ERouteLinks } from 'models/route';
import { isEmptyObject } from 'helpers/is-empty-object';
import { NavBarButton } from './NavBarButton';
import { useTaskCounter } from './hooks';

const NavBar = (): ReactElement | null => {
  const { openModal } = useModal();
  const taskCounters = useTaskCounter();

  const onBreakStart = () =>
    openModal(EModalTypes.BreakWindow, { type: EBreakWindowTypes.default });

  const hasCounters = !isEmptyObject(taskCounters);

  if (!hasCounters) {
    return null;
  }

  return (
    <Row
      direction={DirectionTypes.row}
      jc={JustifyContentTypes.center}
      ai={AlignItemsTypes.center}
      margin="30px 0 5px"
    >
      <NavBarButton variant={EButtonsVariants.danger} to={ERouteLinks.tasks}>
        Tasks in queue: <span>{taskCounters.tasksInQueue}</span>
      </NavBarButton>
      <NavBarButton variant={EButtonsVariants.primary} to={ERouteLinks.enquiries}>
        New enquiries: <span>{(taskCounters as any).newEnquiries}</span>
      </NavBarButton>
      <NavBarButton variant={EButtonsVariants.info} to={ERouteLinks.finishedTasks}>
        Finished tasks: <span>{taskCounters.finishedTasks}</span>
      </NavBarButton>
      <NavBarButton variant={EButtonsVariants.light} onClick={() => onBreakStart()}>
        Break
      </NavBarButton>
    </Row>
  );
};

export { NavBar };
