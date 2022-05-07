import React, { FC } from 'react';
import { ETaskTypes } from 'models/task';
import { Row } from 'ui/Layout';
import { JustifyContentTypes } from 'models/layout';
import { OrderEntry } from 'pages/TaskPage/shared/OrderEntry';
import { Link, useLocation } from 'react-router-dom';
import { IWebsiteUserDetails } from 'models/webiste-user';
import { IOrder } from 'models/orders';
import { AddOrderButton } from 'widgets/AddOrderButton';
import { AddTaskButton } from 'widgets/AddTaskButton';
import VehicleInfo from './VehicleInfo';
import { CustomerInfo } from '../../CustomerInfo';
import { TaskDetailsTop } from './styles';

interface ITaskDetailsContent {
  taskType?: string;
  customerInfo?: IWebsiteUserDetails;
  setCustomerInfo: (customerData: IWebsiteUserDetails) => void;
  orderInfo?: IOrder;
}

const TaskDetailsContent: FC<ITaskDetailsContent> = ({
  taskType,
  customerInfo,
  setCustomerInfo,
  orderInfo,
}) => {
  const location = useLocation();

  switch (taskType) {
    case ETaskTypes.READ_INCOMING_EMAIL_MANUAL:
    case ETaskTypes.INCOMING_CALL_MANUAL:
    case ETaskTypes.FINANCE_CHECK_MANUAL:
    case ETaskTypes.PAYMENT_CHECK_MANUAL:
    case ETaskTypes.SALES_CALL_MANUAL:
    case ETaskTypes.AFTER_SALES_PAYMENT_CHECK_MANUAL:
    case ETaskTypes.PRE_DELIVERY_CALL_MANUAL:
    case ETaskTypes.IDENTIFICATION_DOCUMENT_CHECK_MANUAL: {
      return (
        <>
          <TaskDetailsTop>
            <Row jc={JustifyContentTypes.spaceBetween} mbottom="25px">
              <CustomerInfo customerData={customerInfo} handleDataUpdated={setCustomerInfo} />
              <div>
                <Row mtop="20px" componentWidth="390px" jc={JustifyContentTypes.spaceBetween}>
                  {customerInfo && <AddOrderButton userId={customerInfo.id} />}
                  <AddTaskButton clientId={customerInfo?.id ? String(customerInfo?.id) : ''} />
                </Row>
              </div>
            </Row>
          </TaskDetailsTop>
          <OrderEntry
            order={orderInfo}
            renderOrderNumber={(orderNumber) => (
              <Link to={location.pathname.replace('task-details', 'orders')}>
                <span>{orderNumber}</span>
              </Link>
            )}
          />
        </>
      );
    }
    case ETaskTypes.PDI_CHECK_MANUAL:
    case ETaskTypes.GARDX_APPLICATION_MANUAL:
    case ETaskTypes.VALETING_MANUAL:
      return <VehicleInfo orderId={orderInfo?.id} />;
    default: {
      return null;
    }
  }
};

export default TaskDetailsContent;
