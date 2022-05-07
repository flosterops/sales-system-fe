import { IOrder } from 'models/orders';
import React, { useState } from 'react';
import { OrderEntry } from 'pages/TaskPage/shared/OrderEntry';
import { useOrdersTab } from 'widgets/OrdersDetails/context';

interface IOrdersList {
  orders: IOrder[];
}

export const OrdersList = ({ orders }: IOrdersList) => {
  const [activeOrder, setActiveOrder] = useState<number | null>(null);
  const {
    controller: { fetchTabDetails },
  } = useOrdersTab();

  const handleOrderSelection = async (id: number) => {
    if (id === activeOrder) {
      setActiveOrder(null);
    } else {
      await fetchTabDetails(id);
      setActiveOrder(id);
    }
  };

  return (
    <>
      {orders.map((o) => (
        <OrderEntry
          handleIconClick={() => handleOrderSelection(o.id)}
          key={o.id}
          order={o}
          isActive={activeOrder === o.id}
        />
      ))}
    </>
  );
};
