import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { isResponseError } from 'models/guards';
import { IOrder } from 'models/orders';
import { ITask } from 'models/task';
import { IWebsiteUserDetails } from 'models/webiste-user';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from 'requests/orders';
import { getTask } from 'requests/task';

export const useTaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [taskData, setTaskData] = useState<ITask>();
  const [orderInfo, setOrderInfo] = useState<IOrder>();
  const [customerInfo, setCustomerInfo] = useState<IWebsiteUserDetails>();

  useEffect(() => {
    (async function getTaskInfo() {
      setIsLoading(true);
      const token = Cookies.get(ECookiesTypes.accessToken);

      if (!token) {
        return;
      }

      try {
        const taskInfo = await getTask(token, id);

        if (!isResponseError(taskInfo)) {
          setTaskData(taskInfo);
          setCustomerInfo(taskInfo.websiteUser as IWebsiteUserDetails);

          if (taskInfo?.orderId) {
            const orderResponse = await getOrderById(
              token,
              (taskInfo as ITask).orderId as number,
            );
            if (!isResponseError(orderResponse)) {
              setOrderInfo(orderResponse.data);
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    })();
  }, [id]);

  return {
    isLoading,
    taskData,
    orderInfo,
    customerInfo,
    setCustomerInfo,
  };
};
