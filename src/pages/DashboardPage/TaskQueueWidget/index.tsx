import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { TStore } from 'store';
import { Gadget } from 'ui/Gadget';
import { Row, Column } from 'ui/Layout';
import { loadDashboardTaskDispatch } from 'requests/task';
import { ITaskListRequest } from 'models/task';
import { OverflowTypes } from 'models/layout';
import { useModal } from 'widgets/Modal/context';
import { EModalTypes } from 'models/modal';
import binImage from 'assets/images/bin.png';
import binGreenImage from 'assets/images/bin-green.png';
import { StyledDescription, StyledImageDelete, StyledRow, StyledTable } from './styles';
import { getTaskQueueWidgetColumns, mapDashboardTaskToTable } from './helpers';
import { useRemoveGadget } from '../hooks';

const DashboardTaskRequest: ITaskListRequest = {
  criteria: {},
  page: {
    pageNumber: 0,
    pageSize: 10,
  },
};

interface ITaskQueueWidget {
  id?: string;
}

const TaskQueueWidget = ({ id }: ITaskQueueWidget): ReactElement => {
  const { tasks } = useSelector((state: TStore) => ({ tasks: state.dashboardTasks.tasks }));
  const dispatch = useDispatch();
  const { openModal } = useModal();

  useEffect(() => {
    const token = Cookies.get(ECookiesTypes.accessToken);

    if (token) {
      loadDashboardTaskDispatch(token, DashboardTaskRequest, dispatch);
    }
  }, [dispatch]);

  const dataSource = tasks !== null ? mapDashboardTaskToTable(tasks) : null;
  const useRemoveHandler = useRemoveGadget(id as string);

  const taskQueueColumns = getTaskQueueWidgetColumns(() =>
    loadDashboardTaskDispatch(
      Cookies.get(ECookiesTypes.accessToken) || '',
      DashboardTaskRequest,
      dispatch,
    ),
  );

  return (
    <Gadget flex="2 3 66%" componentHeight="300px" padding="20px">
      <StyledImageDelete
        src={binImage}
        onMouseOver={(e) => {
          e.currentTarget.src = binGreenImage;
        }}
        onMouseOut={(e) => {
          e.currentTarget.src = binImage;
        }}
        onClick={() =>
          openModal(EModalTypes.ConfirmationWindow, {
            text: 'Are you sure you want to delete this widget?',
            confirmButtonAction: useRemoveHandler,
          })
        }
      />
      <Row>
        <Column>
          <StyledDescription>Task in queue</StyledDescription>
        </Column>
      </Row>
      <StyledRow padding="10px 10px 10px 0" overflow={OverflowTypes.scroll}>
        <StyledTable columns={taskQueueColumns} dataSource={dataSource} isSortable />
      </StyledRow>
    </Gadget>
  );
};

export { TaskQueueWidget };
