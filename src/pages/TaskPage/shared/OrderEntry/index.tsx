import { IOrder } from 'models/orders';
import React, { ReactElement, ReactNode } from 'react';
import caretIcon from 'assets/images/caret_icon.png';
import { format } from 'date-fns';
import { isFunction } from 'models/guards';
import { ExtendedInformation } from 'widgets/OrdersDetails/ExtendedInformation';
import { formatPrice } from 'helpers/string-formatter';
import {
  BasicInformation,
  BasicInformationHeader,
  OrderEntryWrapper,
  OrderToggleIcon,
} from './styles';

interface IOrderEntry {
  order?: IOrder;
  isActive?: boolean;
  handleIconClick?: () => void;
  renderOrderNumber?: (orderNumber: string | number) => ReactElement;
}

interface IConditionalBasicInformation {
  wrapper: (arg0: ReactNode) => ReactElement;
  children: ReactElement;
}

const ConditionalBasicInformation = ({
  wrapper,
  children,
}: IConditionalBasicInformation): ReactElement => wrapper(children);

const formatDate = (date: string) =>
  format(new Date(date), "dd.MM.yyyy hh:mm aaaaa'm'").toLocaleUpperCase();

const OrderEntry = ({ order, isActive, handleIconClick, renderOrderNumber }: IOrderEntry) => {
  const isClickable = isFunction(handleIconClick);
  if (!order) {
    return null;
  }

  return (
    <OrderEntryWrapper>
      <ConditionalBasicInformation
        wrapper={(element) =>
          isClickable ? (
            <BasicInformation onClick={handleIconClick} isClickable>
              {element}
            </BasicInformation>
          ) : (
            <BasicInformation>{element}</BasicInformation>
          )
        }
      >
        <>
          <BasicInformationHeader>
            Order number:{' '}
            {isFunction(renderOrderNumber) ? (
              renderOrderNumber(order.uuid)
            ) : (
              <span>{order.uuid}</span>
            )}
          </BasicInformationHeader>
          <BasicInformationHeader>
            Order date: <span>{formatDate(order.createdDate)}</span>
          </BasicInformationHeader>
          <BasicInformationHeader>
            Total price: <span>{formatPrice(order.totalPrice)}</span>
            {handleIconClick && (
              <OrderToggleIcon isActive={isActive} type="button">
                <img alt="Toggle order" src={caretIcon} />
              </OrderToggleIcon>
            )}
          </BasicInformationHeader>
        </>
      </ConditionalBasicInformation>
      {isActive && <ExtendedInformation order={order} />}
    </OrderEntryWrapper>
  );
};

export { OrderEntry };
