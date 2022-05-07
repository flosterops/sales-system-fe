import { createContext, useContext } from 'react';
import { IOrdersTabContext } from 'models/orders';

const OrdersTabContext = createContext<IOrdersTabContext>({} as IOrdersTabContext);

const useOrdersTab = (): IOrdersTabContext => useContext(OrdersTabContext);

export { OrdersTabContext, useOrdersTab };
