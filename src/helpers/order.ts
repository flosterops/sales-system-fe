import { format } from 'date-fns';
import { IOrder } from 'models/orders';
import { DataColumn } from 'pages/TaskPage/shared/MultiColumnTable';
import { OrderType } from 'pages/AddOrderPage/hooks';

export const getExecutionAsTable = (order: IOrder): DataColumn[] => {
  let deliveryAddress = order.deliveryAddress1 || '-';
  if (order.deliveryAddress2) {
    deliveryAddress += `, ${order.deliveryAddress2}`;
  }
  return [
    {
      rowData: [
        {
          label: 'Type',
          value: order.type,
        },
        {
          label: 'Slot',
          value: order.deliveryTime ? format(new Date(order.deliveryTime), 'a') : '',
        },
        {
          label: 'Address Note',
          value: order.deliveryAddressNote || '-',
        },
      ],
    },
    {
      rowData: [
        {
          label: 'Execution Date',
          value: order.deliveryTime
            ? format(new Date(order.deliveryTime), 'dd/MM/yyyy').toLocaleUpperCase()
            : '',
        },
        {
          label: 'Delivery Address',
          value: order.type === OrderType.Delivery ? deliveryAddress : '-',
        },
        {
          label: '',
          value: '',
        },
      ],
    },
  ];
};

export const getOrderStatusAsTable = (order: IOrder): DataColumn[] => [
  {
    rowData: [
      {
        label: 'Order number',
        value: order.uuid,
      },
      {
        label: 'Order date',
        value: format(new Date(order.createdDate), 'dd.MM.yyyy hh:mm a'),
      },
      {
        label: 'Order status',
        value: order.orderStatus.name,
      },
    ],
  },
  {
    rowData: [
      {
        label: 'Payment type',
        value: order?.paymentType?.name || '-',
      },
      {
        label: 'Payment status',
        value: order.paymentStatus?.name || '-',
      },
    ],
  },
];
