import React, { ReactNode } from 'react';
import { ITableColumns } from 'models/table';
import { ETaskTypes, ITask } from 'models/task';
import { FilterInput } from 'widgets/Table/FilterFields/FilterInput';
import { colors } from 'styles/colors';
import { EInputTypes } from 'models/forms';
import { ERouteLinks } from 'models/route';
import { AssignTaskPointer } from 'pages/TasksQueuePage/AssignTaskPointer';
import { NavLink } from 'ui/NavLink';
import { format } from 'date-fns';
import { RangeDateInput } from 'widgets/Table/FilterFields/RangeDateInput';
import { Description } from 'ui/Description';
import { FontSizeTypes, WeightTypes } from 'models/layout';

const automaticTaskTypes = [
  ETaskTypes.IDENTIFICATION_DOCUMENT_CHECK_AUTOMATIC,
  ETaskTypes.FINANCE_CHECK_AUTOMATIC,
  ETaskTypes.PAYMENT_CHECK_AUTOMATIC,
  ETaskTypes.PRE_SALES_CALL_MESSAGE_AUTOMATIC,
  ETaskTypes.PRE_DELIVERY_CALL_AUTOMATIC,
  ETaskTypes.YARD_WORKS_AUTOMATIC,
];

const TASK_QUEUE = 'task-queue';

export const getTaskQueueWidgetColumns = (fetchTasks: () => void): ITableColumns[] => [
  {
    id: 'fe7a7688-1583-4233-8319-dd5c8973cc41',
    key: 'id',
    title: 'ID',
    render: (value, props, index: number) => index + 1,
  },
  {
    id: '8f4f230c-b9ca-41d6-850b-bd86ff253bf9',
    key: 'taskDisplayName',
    title: 'Task name',
    render: (taskDisplayName, { id, taskType }): ReactNode => {
      const taskId = id.replace(`${TASK_QUEUE}-`, '');
      const isAutomatic = automaticTaskTypes.includes(taskType);
      if (isAutomatic) {
        return (
          <Description weight={WeightTypes.w400} fontSize={FontSizeTypes.m}>
            {taskDisplayName}
          </Description>
        );
      }
      return (
        <NavLink
          color={colors.primary}
          to={ERouteLinks.task.replace(':id', taskId) as ERouteLinks}
        >
          {taskDisplayName}
        </NavLink>
      );
    },
  },
  {
    id: '1493a48d-0006-496a-a963-a2693a9d69d0',
    key: 'assignedTo',
    title: 'Assigned to',
    render: (text, props) => {
      if (!text && automaticTaskTypes.includes(props.taskType)) {
        return (
          <Description weight={WeightTypes.w400} fontSize={FontSizeTypes.m}>
            Console Job
          </Description>
        );
      }
      return (
        <AssignTaskPointer
          taskId={props.id}
          text={text as string}
          taskName={props.taskDisplayName}
          taskType={props.taskType}
          callback={fetchTasks}
        />
      );
    },
  },
  {
    id: 'db74e75b-7fed-4fe4-8b84-9e6da3c3f9ab',
    key: 'createdOn',
    title: 'Date created',
    render: (date) => (date ? format(new Date(date as string), 'dd/MM/yyyy hh:mm aa') : '-'),
  },
];

export const getFilterableTaskQueueColumns = (
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string | Date | null>>>,
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>,
  filters: Record<string, string | Date | null>,
  pageNumber: number,
): ITableColumns[] => [
  {
    id: 'fe7a7688-1583-4233-8319-dd5c8973cc41',
    key: 'id',
    title: 'ID',
    render: (value, props, index: number) => pageNumber * 10 + index + 1,
  },
  {
    id: '8f4f230c-b9ca-41d6-850b-bd86ff253bf9',
    key: 'taskDisplayName',
    title: 'Task name',
    render: (taskDisplayName, { id, taskType }): ReactNode => {
      const taskId = id.replace(`${TASK_QUEUE}-`, '');
      const isAutomatic = automaticTaskTypes.includes(taskType);
      if (isAutomatic) {
        return (
          <Description weight={WeightTypes.w400} fontSize={FontSizeTypes.m}>
            {taskDisplayName}
          </Description>
        );
      }
      return (
        <NavLink
          color={colors.primary}
          to={ERouteLinks.task.replace(':id', taskId) as ERouteLinks}
        >
          {taskDisplayName}
        </NavLink>
      );
    },
    filterRender: () => (
      <FilterInput
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            taskDisplayName: value,
          }));
        }}
        name="orderId"
        type={EInputTypes.search}
      />
    ),
  },
  {
    id: '1493a23d-0006-496a-a963-a2693a9d69d0',
    key: 'websiteUser',
    title: 'Customer',
    render: (user) => {
      const [userData, userId] = (user as string).split('_');
      return (
        <NavLink
          color={colors.primary}
          to={ERouteLinks.customerDetails.replace(':id', userId) as ERouteLinks}
        >
          {userData}
        </NavLink>
      );
    },
    filterRender: () => (
      <FilterInput
        width="150px"
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            websiteUser: value,
          }));
        }}
        name="websiteUser"
        type={EInputTypes.search}
      />
    ),
  },
  {
    id: 'e19a08d6-2fb5-4696-a9f8-3858cdff05ec',
    key: 'vrm',
    title: 'VRM',
    render: (vrm) => vrm,
    filterRender: () => (
      <FilterInput
        width="150px"
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            vrm: value,
          }));
        }}
        name="vrm"
        type={EInputTypes.search}
      />
    ),
  },
  {
    id: '1493a48d-0006-496a-a963-a2693a9d69d0',
    key: 'assignedTo',
    title: 'Assigned to',
    render: (text, props) => {
      if (!text && automaticTaskTypes.includes(props.taskType)) {
        return (
          <Description weight={WeightTypes.w400} fontSize={FontSizeTypes.m}>
            Console Job
          </Description>
        );
      }
      return (
        <AssignTaskPointer
          taskId={props.id}
          text={text as string}
          taskName={props.taskDisplayName}
          taskType={props.taskType}
          callback={() => setTrigger((prev) => !prev)}
        />
      );
    },
    filterRender: () => (
      <FilterInput
        width="150px"
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            assignedTo: value,
          }));
        }}
        name="assignedTo"
        type={EInputTypes.search}
      />
    ),
  },
  {
    id: 'db74e75b-7fed-4fe4-8b84-9e6da3c3f9ab',
    key: 'createdOn',
    title: 'Date created',
    render: (date) => (date ? format(new Date(date as string), 'dd/MM/yyyy hh:mm aa') : '-'),
    filterRender: () => (
      <RangeDateInput
        componentWidth="200px"
        minValue={filters.createdOnGte ? new Date(filters.createdOnGte) : null}
        maxValue={filters.createdOnLt ? new Date(filters.createdOnLt) : null}
        minSetValue={(value: string) =>
          setFilters((prev) => ({ ...prev, createdOnGte: value }))
        }
        maxSetValue={(value: string) =>
          setFilters((prev) => ({ ...prev, createdOnLt: value }))
        }
      />
    ),
  },
];

export const mapDashboardTaskToTable = (data: ITask[]) =>
  data.map((task) => {
    let assignedTo = '';
    if (task.assignedTo && task.assignedTo.firstName && task.assignedTo.lastName) {
      assignedTo = `${task.assignedTo.firstName} ${task.assignedTo.lastName}`;
    }

    let websiteUser = '';
    if (task.websiteUser) {
      websiteUser = `${task.websiteUser.firstname} ${task.websiteUser.lastname}_${task.websiteUser.id}`;
    }

    return {
      id: `${TASK_QUEUE}-${task.id}`,
      taskId: task.id,
      orderId: task.orderId,
      taskDisplayName: task.taskDisplayName,
      taskType: task.typeKey,
      assignedTo,
      createdOn: task.createdOn || '',
      websiteUser,
      vrm: task.vrm || '',
    };
  });
