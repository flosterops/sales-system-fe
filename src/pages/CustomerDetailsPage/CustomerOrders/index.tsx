import React from 'react';
import { EOrderTabType } from 'models/orders';
import { OrdersTabProvider } from 'widgets/OrdersDetails/provider';
import { OrderDetails } from 'widgets/OrdersDetails';

const CustomerOrders = () => (
  <OrdersTabProvider type={EOrderTabType.customer}>
    <OrderDetails />
  </OrdersTabProvider>
);

export { CustomerOrders };
