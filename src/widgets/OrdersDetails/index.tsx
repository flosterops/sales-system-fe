import React, { useEffect } from 'react';
import { EOrderTabType } from 'models/orders';
import { Loader } from 'ui/Loader';
import { OrdersList } from './OrdersList';
import { OrdersTabProvider } from './provider';
import { useOrdersTab } from './context';
import { NoData } from '../NoData';

export const OrderDetails = () => {
  const {
    orders,
    controller: { fetchOrders },
  } = useOrdersTab();

  useEffect(() => {
    fetchOrders();
    // It would take more time to optimize this with Callback. Leaving it for now
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (orders === null) {
    return <Loader />;
  }

  return (
    <>{orders && orders.length > 0 ? <OrdersList orders={orders || []} /> : <NoData />}</>
  );
};

const OrderDetailsTab = () => (
  <OrdersTabProvider type={EOrderTabType.task}>
    <OrderDetails />
  </OrdersTabProvider>
);

export { OrderDetailsTab };
