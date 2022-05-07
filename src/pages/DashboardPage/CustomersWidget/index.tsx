import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Gadget } from 'ui/Gadget';
import { Row, Column } from 'ui/Layout';
import Cookies from 'js-cookie';
import { TStore } from 'store';
import { ECookiesTypes } from 'models/cookies';
import { loadCustomerDashboardDispatch } from 'requests/customer';
import { IDashboardCustomer } from 'models/customer';
import { OverflowTypes } from 'models/layout';
import binImage from 'assets/images/bin.png';
import binGreenImage from 'assets/images/bin-green.png';
import { EModalTypes } from 'models/modal';
import { useModal } from 'widgets/Modal/context';
import { customerWidgetColumns } from './helpers';
import { StyledDescription, StyledRow, StyledImageDelete, StyledTable } from './styles';
import { useRemoveGadget } from '../hooks';

const customersDashboardRequestData = {
  criteria: {},
  page: {
    pageNumber: 1,
    pageSize: 10,
  },
};

const mapCustomersDashboardDataToTable = (data: IDashboardCustomer[]) =>
  data.map((el) => ({
    id: String(el.id),
    fullName: el.firstname && el.lastname ? `${el.firstname} ${el.lastname}` : '',
    address: el.address1 || '',
    phoneNumber: el.phone || '',
    email: el.email || '',
    lastOrderID: el.lastOrderId || '',
  }));

interface ICustomerWidget {
  id?: string;
}

const CustomersWidget = ({ id }: ICustomerWidget): ReactElement => {
  const { customers } = useSelector((store: TStore) => ({
    customers: store.dashboardCustomers.customers,
  }));
  const dispatch = useDispatch();
  const { openModal } = useModal();

  useEffect(() => {
    const token = Cookies.get(ECookiesTypes.accessToken);

    if (token) {
      loadCustomerDashboardDispatch(token, customersDashboardRequestData, dispatch);
    }
  }, [dispatch]);

  const dataSource = customers !== null ? mapCustomersDashboardDataToTable(customers) : null;
  const useRemoveHandler = useRemoveGadget(id as string);

  return (
    <Gadget flex="3 3 100%" componentWidth="100%" componentHeight="300px" padding="20px">
      <StyledImageDelete
        src={binImage}
        onMouseOver={(e) => {
          e.currentTarget.src = binGreenImage;
        }}
        onMouseOut={(e) => {
          e.currentTarget.src = binImage;
        }}
        onClick={() =>
          openModal(EModalTypes.ConfirmationWindow, {
            text: 'Are you sure you want to delete this widget?',
            confirmButtonAction: useRemoveHandler,
          })
        }
      />
      <Row>
        <Column>
          <StyledDescription>Customers</StyledDescription>
        </Column>
      </Row>
      <StyledRow padding="10px 10px 10px 0" overflow={OverflowTypes.scroll}>
        <StyledTable columns={customerWidgetColumns} dataSource={dataSource} isSortable />
      </StyledRow>
    </Gadget>
  );
};

export { CustomersWidget };
