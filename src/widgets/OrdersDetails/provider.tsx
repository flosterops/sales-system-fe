import React, { PropsWithChildren, ReactElement, useState } from 'react';
import {
  EOrderTabType,
  IOrder,
  IOrdersResponse,
  IOrdersTabContext,
  ITabDetails,
  OrderStatuses,
} from 'models/orders';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { cancelOrder, getOrdersForUser } from 'requests/orders';
import { getVehicle, getVehicleImages, loadFinanceSummary } from 'requests/vehicles';
import { getPartExchange } from 'requests/part-exchange';
import { setImagesPaths } from 'helpers/images';
import {
  IVehicle,
  IVehicleFinanceResponse,
  IVehicleImages,
  IVehicleImagesResponse,
  IVehiclePayment,
  IVehicleResponse,
} from 'models/vehicles';
import { IPartExchange } from 'models/partExchange';
import { getTask, getTasksForOrder } from 'requests/task';
import { isResponseError } from 'models/guards';
import { useParams } from 'react-router-dom';
import { OrdersTabContext } from './context';

interface IFetchData<T, E> {
  request: (token: string) => Promise<T>;
  mapResponse: (response: T) => E;
  token?: string;
}

async function fetchData<T, E = T>({ request, mapResponse, token }: IFetchData<T, E>) {
  let responseData;
  if (token) {
    try {
      const response = await request(token);
      responseData = mapResponse(response);
    } catch (e) {
      console.error(e);
    }
  }

  return responseData;
}

export interface IOrdersTabProvider {
  type: EOrderTabType;
}

const OrdersTabProvider = ({
  children,
  type,
}: PropsWithChildren<IOrdersTabProvider>): ReactElement => {
  const [ordersList, setOrdersList] = useState<IOrder[] | null>(null);
  const [activeOrder, setActiveOrder] = useState<IOrder>();
  const [tabDetails, setTabDetails] = useState<ITabDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id: paramId } = useParams<{ id: string }>();
  const token = Cookies.get(ECookiesTypes.accessToken);

  const fetchOrderList = async () => {
    if (token) {
      if (type === EOrderTabType.task) {
        try {
          const task = await getTask(token, paramId);
          const websiteUserId = !isResponseError(task) && task.websiteUser?.id;
          const response = await getOrdersForUser(token, websiteUserId as number);
          setOrdersList((response as IOrdersResponse).data);
        } catch (e) {
          console.error(e);
        }
      }
      if (type === EOrderTabType.customer) {
        try {
          const response = await getOrdersForUser(token, Number(paramId));
          setOrdersList((response as IOrdersResponse).data);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const fetchVehicleDetails = async (vehicleId: number) =>
    fetchData<IVehicleResponse, IVehicle>({
      request: (requestToken) => getVehicle(requestToken, vehicleId),
      mapResponse: (response) => response.data,
      token,
    });

  const fetchVehicleImages = async (vehicleId: number) =>
    fetchData<IVehicleImagesResponse, IVehicleImages>({
      request: (requestToken) => getVehicleImages(requestToken, vehicleId),
      mapResponse: (response) => {
        setImagesPaths(response.data);
        return response.data;
      },
      token,
    });

  const fetchPartExchange = async (partExchangeId?: number) => {
    let responseData;
    if (partExchangeId) {
      responseData = await fetchData<IPartExchange>({
        request: (requestToken) => getPartExchange(requestToken, partExchangeId as number),
        mapResponse: (response) => response,
        token,
      });
    }

    return responseData;
  };

  const fetchFinanceSummary = async (vehicleId: number, orderId: number) =>
    fetchData<IVehicleFinanceResponse, IVehiclePayment[]>({
      request: (requestToken) => loadFinanceSummary(requestToken, vehicleId, orderId),
      token,
      mapResponse: (res) => res.data,
    });

  const fetchTasksForOrder = async (orderId: number) =>
    fetchData<any>({
      request: (requestToken) => getTasksForOrder(requestToken, orderId),
      token,
      mapResponse: (res) => res.data.content,
    });

  const fetchOrderTabDetails = async (orderId: number) => {
    const orderToExtend = ordersList && ordersList.find((o) => o.id === orderId);
    setIsLoading(true);
    // Will add more requests as they will appear in next sections implementations
    // Use results tab to prevent state overriding
    if (orderToExtend) {
      setActiveOrder(orderToExtend);
      const [vehicleDetails, vehicleImages, partExchange, orderTasks, financeSummary] =
        await Promise.all([
          await fetchVehicleDetails(orderToExtend.vehicleId),
          await fetchVehicleImages(orderToExtend.vehicleId),
          await fetchPartExchange(orderToExtend.partExchange?.id),
          await fetchTasksForOrder(orderId),
          await fetchFinanceSummary(orderToExtend.vehicleId, orderId),
        ]);
      setTabDetails({
        vehicleDetails,
        vehicleImages,
        partExchange,
        orderTasks,
        financeSummary,
      });
    }
    setIsLoading(false);
  };

  const handleOrderCancellationAsync = async (id: number) => {
    if (token) {
      try {
        await cancelOrder(token, id);
        if (ordersList) {
          setOrdersList(
            ordersList.map((order) => {
              if (order.id === id) {
                return {
                  ...order,
                  orderStatus: {
                    ...order.orderStatus,
                    name: OrderStatuses.CANCELLED,
                  },
                };
              }
              return order;
            }),
          );
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateFinanceSummary = async () => {
    if (!activeOrder) {
      return;
    }
    const financeSummary = await fetchFinanceSummary(activeOrder.vehicleId, activeOrder.id);
    setTabDetails((details) => ({
      ...details,
      financeSummary,
    }));
  };

  const ordersTabState: IOrdersTabContext = {
    isLoading,
    orders: ordersList,
    activeOrder,
    orderTabDetails: tabDetails,
    controller: {
      fetchOrders: () => fetchOrderList(),
      updateFinanceSummary: () => updateFinanceSummary(),
      cancelOrder: (id) => handleOrderCancellationAsync(id),
      fetchTabDetails: (id) => fetchOrderTabDetails(id),
    },
  };

  return (
    <OrdersTabContext.Provider value={ordersTabState}>{children}</OrdersTabContext.Provider>
  );
};

export { OrdersTabProvider };
