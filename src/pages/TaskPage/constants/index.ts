import { OrderDetailsTab } from 'widgets/OrdersDetails';
import { TaskDetails } from 'widgets/TaskDetails';
import { Messages } from '../Messages';
import { TaskSummary } from '../TaskSummary';
import { Notes } from '../Notes';

export const TASK_DETAILS_TABS = [
  {
    name: 'Task Details',
    url: 'task-details',
    permissions: [],
    component: TaskDetails,
  },
  {
    name: 'Orders',
    url: 'orders',
    permissions: [],
    component: OrderDetailsTab,
  },
  {
    name: 'Notes',
    url: 'notes',
    permissions: [],
    component: Notes,
  },
  {
    name: 'Messages',
    url: 'messages',
    permissions: [],
    component: Messages,
  },
  {
    name: 'Task Summary',
    url: 'task-summary',
    permissions: [],
    component: TaskSummary,
  },
];
