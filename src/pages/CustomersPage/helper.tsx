import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { ICustomerFilters, ICustomerSearch } from 'models/customer';
import { ITableColumns, ITableDataSource } from 'models/table';
import { FilterInput } from 'widgets/Table/FilterFields/FilterInput';
import { colors } from 'styles/colors';
import { EInputTypes } from 'models/forms';
import { NavLink } from 'ui/NavLink';
import { ERouteLinks } from 'models/route';

export const mapCustomersTable = (customers: ICustomerSearch[]): ITableDataSource[] =>
  customers.map((el) => ({
    id: el.id.toString(),
    fullName: `${el.firstname} ${el.lastname}`,
    address: el.combinedAddress,
    phone: el.phone || el.mobilePhone,
    email: el.email,
    lastOrderId: el.lastOrderId,
  }));

export const getCustomersColumns = (
  setFilters: Dispatch<SetStateAction<ICustomerFilters>>,
): ITableColumns[] => [
  {
    id: '8baa1f53-f12b-4bf4-9d66-924f1fd0fb79',
    key: 'id',
    title: 'ID',
    width: '70px',
  },
  {
    id: '1e48082d-59f3-4484-9ca4-03b4cd569f53',
    key: 'fullName',
    title: 'Full name',
    render: (fulName, props): ReactNode => (
      <NavLink
        color={colors.primary}
        to={ERouteLinks.customerDetails.replace(':id', props.id) as ERouteLinks}
      >
        {fulName}
      </NavLink>
    ),
    filterRender: () => (
      <FilterInput
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({ ...prev, fullName: value }));
        }}
        name="fullName"
        type={EInputTypes.search}
      />
    ),
    width: '130px',
  },
  {
    id: 'a04755d9-d623-49ee-ba68-b2a55040ac3a',
    key: 'address',
    title: 'Address',
    filterRender: () => (
      <FilterInput
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({ ...prev, address: value }));
        }}
        name="address"
        type={EInputTypes.search}
      />
    ),
    width: '264px',
  },
  {
    id: 'f10ce3d6-52b8-4bda-8f97-ed34b93b6438',
    key: 'phone',
    title: 'Phone number',
    filterRender: () => (
      <FilterInput
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({ ...prev, phone: value }));
        }}
        name="phone"
        type={EInputTypes.search}
      />
    ),
    width: '115px',
  },
  {
    id: '80009c14-eab4-44df-997c-92fab228b448',
    key: 'email',
    title: 'Email',
    filterRender: () => (
      <FilterInput
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({ ...prev, email: value }));
        }}
        name="email"
        type={EInputTypes.search}
      />
    ),
    width: '180px',
  },
  {
    id: '8836f063-4b35-40cd-888c-15845836af11',
    key: 'lastOrderId',
    title: 'Last order ID',
    width: '100px',
  },
];
