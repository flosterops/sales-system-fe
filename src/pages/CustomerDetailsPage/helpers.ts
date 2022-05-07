import { Notes } from 'pages/TaskPage/Notes';
import { Messages } from 'pages/TaskPage/Messages';
import { CustomerOrders } from './CustomerOrders';
import { CustomerDetails } from './CustomerDetails';

export const CUSTOMER_TABS = [
  {
    name: 'Details',
    url: 'customer-info',
    permissions: [],
    component: CustomerDetails,
  },
  {
    name: 'Orders',
    url: 'orders',
    permissions: [],
    component: CustomerOrders,
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
];
